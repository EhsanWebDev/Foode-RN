import React, {useState} from 'react';
import {Image} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {dimensions} from '../../utils/constants';
import Box from '../../components/View/CustomView';
import {useAppTheme} from '../../utils/hooks';
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';
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

  const [currentIndex, setCurrentIndex] = useState(1);

  return (
    <>
      <Carousel
        snapEnabled
        onProgressChange={(_, absoluteProgress) =>
          (progressValue.value = absoluteProgress)
        }
        width={dimensions.width}
        height={moderateVerticalScale(180)}
        data={imagesData}
        scrollAnimationDuration={100}
        onSnapToItem={index => setCurrentIndex(index + 1)}
        renderItem={({item}) => (
          <Box
            style={{
              flex: 1,
              marginHorizontal: spacing.l,
            }}>
            <Image
              key={item.id}
              source={{
                uri: item.image,
              }}
              style={{
                height: moderateVerticalScale(180),
                borderRadius: 6,
              }}
            />
          </Box>
        )}
      />
      {!!progressValue && (
        <Box
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            width: moderateScale(imagesData.length * 36),
            alignItems: 'center',
            alignSelf: 'center',
            marginTop: moderateVerticalScale(-8),
            backgroundColor: 'white',
            borderTopRightRadius: 12,
            borderTopLeftRadius: 12,
            paddingTop: 6,
          }}>
          {imagesData.map((item, index) => {
            return (
              <PaginationItem
                backgroundColor={colors.secondary}
                inActiveColor={colors.inactive}
                animValue={progressValue}
                index={index}
                key={item.id}
                length={imagesData.length}
                currentIndex={currentIndex}
              />
            );
          })}
        </Box>
      )}
    </>
  );
};
export default ImageCarousel;
