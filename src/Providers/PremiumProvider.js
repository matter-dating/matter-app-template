import React, {useContext, useEffect, useState, useRef} from 'react';
import Purchases from 'react-native-purchases';

const PremiumContext = React.createContext(null);

const PremiumProvider = ({children}) => {
  const [isPremium, setIsPremium] = useState(false);
  const expirationDate = useRef(null);
  const originalPurchaseDate = useRef(null);
  const [productIdentifier, setProductIdentifier] = useState(null);

  const [premiumError, setPremiumError] = useState(undefined);
  const [offerings, setOfferings] = useState([]);

  const processPurchases = async () => {
    try {
      const purchaserInfo = await Purchases.getPurchaserInfo();
      // console.log(JSON.stringify(purchaserInfo));
      if (
        typeof purchaserInfo.entitlements.active
          .matter_premium_identifier_prod !== 'undefined'
      ) {
        expirationDate.current = new Date(
          purchaserInfo.entitlements.active.matter_premium_identifier_prod.expirationDate,
        );
        originalPurchaseDate.current = new Date(
          purchaserInfo.entitlements.active.matter_premium_identifier_prod.originalPurchaseDate,
        );
        setProductIdentifier(
          purchaserInfo.entitlements.active.matter_premium_identifier_prod
            .productIdentifier,
        );
        setIsPremium(true);
      } else {
        expirationDate.current = null;
        setIsPremium(false);
      }
      const offers = await Purchases.getOfferings();
      setOfferings(offers);
    } catch (e) {
      // Error fetching purchaser info
    }
  };

  useEffect(() => {
    processPurchases();
  }, []);

  const purchasePremium = async (chosenPackage) => {
    try {
      const purchaseMade = await Purchases.purchasePackage(chosenPackage);
      if (
        typeof purchaseMade.purchaserInfo.entitlements.active
          .matter_premium_identifier_prod !== 'undefined'
      ) {
        expirationDate.current = new Date(
          purchaseMade.purchaserInfo.entitlements.active.matter_premium_identifier_prod.expirationDate,
        );
        originalPurchaseDate.current = new Date(
          purchaseMade.purchaserInfo.entitlements.active.matter_premium_identifier_prod.originalPurchaseDate,
        );
        setProductIdentifier(
          purchaseMade.purchaserInfo.entitlements.active
            .matter_premium_identifier_prod.productIdentifier,
        );
        setIsPremium(true);
      }
    } catch (e) {
      // console.log(e);
      setPremiumError(e);
    }
  };

  const restorePurchases = async () => {
    try {
      const restore = await Purchases.restoreTransactions();
      if (
        typeof restore.entitlements.active.matter_premium_identifier_prod !==
        'undefined'
      ) {
        expirationDate.current = new Date(
          restore.entitlements.active.matter_premium_identifier_prod.expirationDate,
        );
        originalPurchaseDate.current = new Date(
          restore.entitlements.active.matter_premium_identifier_prod.originalPurchaseDate,
        );
        setProductIdentifier(
          restore.entitlements.active.matter_premium_identifier_prod
            .productIdentifier,
        );
        setIsPremium(true);
      } else {
        expirationDate.current = null;
        setIsPremium(false);
      }
    } catch (e) {}
  };

  return (
    <PremiumContext.Provider
      value={{
        isPremium,
        expirationDate,
        originalPurchaseDate,
        productIdentifier,
        premiumError,
        setPremiumError,
        purchasePremium,
        restorePurchases,
        processPurchases,
        offerings,
      }}>
      {children}
    </PremiumContext.Provider>
  );
};

const usePremium = () => {
  const premium = useContext(PremiumContext);
  if (premium == null) {
    throw new Error('usePremium() called outside of a PremiumProvider?');
  }
  return premium;
};

export {PremiumProvider, usePremium};
