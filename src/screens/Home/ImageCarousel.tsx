import React from 'react';
import {Image} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {dimensions} from '../../utils/constants';
import Box from '../../components/View/CustomView';
import {useAppTheme} from '../../utils/hooks';
import {verticalScale} from 'react-native-size-matters';
import {useSharedValue} from 'react-native-reanimated';
import PaginationItem from '../../components/AppComponents/PaginationItem/PaginationItem';

type imageItem = {
  id: string | number;
  image: string;
};

type Props = {
  imagesData: imageItem[];
};

const ImageCarousel = ({imagesData = []}: Props) => {
  const {spacing, colors} = useAppTheme();

  const progressValue = useSharedValue<number>(0);
  return (
    <>
      <Carousel
        snapEnabled
        onProgressChange={(_, absoluteProgress) =>
          (progressValue.value = absoluteProgress)
        }
        width={dimensions.width}
        height={verticalScale(dimensions.width / 2.5)}
        data={imagesData}
        scrollAnimationDuration={1000}
        onSnapToItem={index => console.log('current index:', index)}
        renderItem={({item}) => (
          <Box
            style={{
              flex: 1,
              marginHorizontal: spacing.m,
            }}>
            <Image
              key={item.id}
              source={{
                uri: item.image,
              }}
              style={{
                height: verticalScale(dimensions.width / 2.5),
                borderRadius: 8,
              }}
            />
          </Box>
        )}
      />
      {!!progressValue && (
        <Box
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: 35,
            alignSelf: 'center',
            marginTop: 10,
          }}>
          {imagesData.map((item, index) => {
            return (
              <PaginationItem
                backgroundColor={colors.primary}
                inActiveColor={colors.gray}
                animValue={progressValue}
                index={index}
                key={item.id}
                length={imagesData.length}
              />
            );
          })}
        </Box>
      )}
    </>
  );
};
export default ImageCarousel;
