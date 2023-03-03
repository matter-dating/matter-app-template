/* eslint-disable handle-callback-err */
import React, {FunctionComponent, useState, useEffect} from 'react';
import {StyleSheet, View, Animated} from 'react-native';
import RNFS, {DocumentDirectoryPath} from 'react-native-fs';
import LottieView from 'lottie-react-native';

const URL = require('url-parse');

const CacheableImage: FunctionComponent = (props) => {
  const [cachedImagePath, setCachedImagePath] = useState(null);
  const [cacheable, setCacheable] = useState(true);
  const [jobId, setJobId] = useState(false);

  useEffect(() => {
    processSource(props.source);
    return () => {
      if (jobId) {
        RNFS.stopDownload(jobId);
      }
    };
  }, []);

  const processSource = (source) => {
    const url = new URL(source.uri);
    checkImageCache(source.uri, url.host, url.pathname);
  };

  const imageDownloadBegin = async (info) => {
    setJobId(info.jobId);
  };

  const imageDownloadProgress = async (info) => {
    if (info.contentLength / info.bytesWritten === 1) {
      setJobId(null);
    }
  };

  const checkImageCache = async (imageUri, cachePath, cacheKey) => {
    const dirPath =
      DocumentDirectoryPath +
      '/matter-profile-photos.s3-us-west-1.amazonaws.com';
    const filePath = dirPath + cacheKey;

    RNFS.stat(filePath)
      .then((res) => {
        if (res.isFile()) {
          setCacheable(true);
          setCachedImagePath(filePath);
        }
      })
      .catch((err) => {
        if (cacheable && cachedImagePath) {
          let delImagePath = cachedImagePath;
          RNFS.exists(delImagePath).then((res) => {
            if (res) {
              RNFS.unlink(delImagePath).catch((e) => {});
            }
          });
        }
        let downloadOptions = {
          fromUrl: imageUri,
          toFile: filePath,
          background: true,
          begin: imageDownloadBegin,
          progress: imageDownloadProgress,
        };
        RNFS.downloadFile(downloadOptions)
          .promise.then((response) => {
            if (response.statusCode === 200) {
              setCacheable(true);
              setCachedImagePath(filePath);
            } else {
              setCacheable(false);
              setCachedImagePath(null);
            }
          })
          .catch((e) => {
            setCacheable(false);
            setCachedImagePath(null);
          });
      });
  };

  if (cacheable && cachedImagePath) {
    return (
      <Animated.Image
        style={props.style}
        defaultSource={require('../../Assets/Image/blurred.png')}
        source={{uri: 'file://' + cachedImagePath}}
        blurRadius={props.blurRadius}
      />
    );
  } else {
    return (
      <View style={styles.empty}>
        <Animated.Image
          style={props.style}
          source={require('../../Assets/Image/blurred.png')}
        />
        <View style={styles.indicator}>
          <LottieView
            source={require('../../Assets/Animation/image_loader.json')}
            autoPlay
            loop
          />
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  empty: {
    position: 'relative',
  },
  indicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CacheableImage;
