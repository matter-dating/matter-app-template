import {ObjectId} from 'bson';

const cardPriorites = {
  'preferences': {'priority': 0, 'abs_placement': ['top']},
  'highlighted_image': {'priority': 1, 'abs_placement': ['mid', 'bottom']},
  'prompt': {'priority': 2,
             'next': ['instagram', 'music', 'movie', 'tv-show', 'image_prompt', 'prompt', 'hobby']},
  'image_prompt': {'priority': 3,
                   'next': ['hobby', 'prompt', 'music', 'instagram', 'movie', 'tv-show', 'music',
                            'image_prompt']},
  'instagram': {'priority': 4,
                'next': ['hobby', 'prompt', 'music', 'movie', 'tv-show', 'image_prompt',
                         'instagram']},
  'music': {'priority': 5,
            'next': ['hobby', 'prompt', 'image_prompt', 'instagram', 'movie', 'tv-show', 'music']},
  'hobby': {'priority': 6,
            'next': ['instagram', 'music', 'movie', 'tv-show', 'image_prompt', 'prompt', 'hobby']},
  'movie': {'priority': 7,
            'next': ['hobby', 'prompt', 'image_prompt', 'music', 'instagram', 'tv-show', 'movie']},
  'tv-show': {'priority': 8,
              'next': ['hobby', 'prompt', 'image_prompt', 'music', 'instagram', 'movie', 'tv-show']},
  'voice-intro': {'priority': 9,
              'next': ['hobby', 'prompt', 'image_prompt', 'music', 'instagram', 'movie', 'tv-show']},
  'voice_prompt': {'priority': 10,
              'next': ['hobby', 'voice_prompt', 'prompt', 'music', 'instagram', 'movie', 'tv-show', 'music',
              'image_prompt']},

};

const defaultPriority = 10;

const getGroupedCards = (userCards) => {
  let cards = [];
  let groups = new Map();

  userCards.forEach((c) => {
    if (c.groupable || c.type === 'voice_prompt' || c.type === 'prompt') {
      if (groups.has(c.type)) {
        const values = groups.get(c.type);
        values.push(c);
      } else {
        groups.set(c.type, [c]);
      }
    } else {
      cards.push(c);
    }
  });

  groups.forEach((value, key) => {
    cards.push({content: value, type: key});
  });

  return cards;
};

const getCardsOrderedByPriority = (cards) => {
  return getGroupedCards(cards).sort((a, b) => {
    const priorityA = cardPriorites[a.type].priority
      ? cardPriorites[a.type].priority
      : defaultPriority;
    const priorityB = cardPriorites[b.type].priority
      ? cardPriorites[b.type].priority
      : defaultPriority;
    return priorityA - priorityB;
  });
};

const getNextCard = (currentCard, orderedCards) => {
  if (currentCard) {
    const nextCardRank = cardPriorites[currentCard.type]
      ? cardPriorites[currentCard.type].next
      : [];
    const nextCards = [...orderedCards];
    return nextCards.sort((a, b) => {
      return nextCardRank.indexOf(a.type) - nextCardRank.indexOf(b.type);
    })[0];
  } else {
    return orderedCards[0];
  }
};

export const getFormattedCards = (cards, userData) => {
  let orderedCards = getCardsOrderedByPriority(cards);
  let placedCards = [];

  while (orderedCards.length > 0) {
    const currentCard =
      placedCards.length > 0 ? placedCards[placedCards.length - 1] : null;
    const nextCard = getNextCard(currentCard, orderedCards);
    orderedCards.indexOf(nextCard) !== -1 &&
      orderedCards.splice(orderedCards.indexOf(nextCard), 1);
    placedCards.push(nextCard);
  }
  // if(userData.profile_hd_images.length > 2) {
  //   const thirdImageCard = getImageCard(userData.profile_hd_images[2], userData.first_name);
  //   const secondImageCard = getImageCard(userData.profile_hd_images[1], userData.first_name);
  //   const index = Math.round(placedCards.length / 2)
  //   placedCards.splice(index, 0 ,thirdImageCard)
  //   placedCards.push(secondImageCard);
  // }
  // else if(userData.profile_hd_images.length === 2) {
  //   const secondImageCard = getImageCard(userData.profile_hd_images[1], userData.first_name);
  //   const index = Math.round(placedCards.length / 2)
  //   placedCards.splice(index, 0 ,secondImageCard)
  // }
  return placedCards;
};
