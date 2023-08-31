import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {scale, verticalScale} from 'react-native-size-matters';

const Image = ({uri, imageStyles}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleError = () => {
    setIsLoading(false);
    setError(true);
  };

  return (
    <View>
      {!isLoading && !error && (
        <FastImage
          style={imageStyles ? imageStyles : styles.image}
          source={
            uri
              ? {
                  uri,
                }
              : require('./../../assets/images/noImage.png')
          }
          onError={handleError}
        />
      )}
      {error && (
        <FastImage
          style={imageStyles ? imageStyles : styles.image}
          source={require('./../../assets/images/noImage.png')}
          resizeMode="contain"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: scale(64),
    height: verticalScale(60),
    borderRadius: 8,
  },
});

export default Image;
