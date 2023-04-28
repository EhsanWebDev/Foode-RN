import React, {useEffect} from 'react';
import {StyleSheet, TouchableOpacity, Image, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import Box from '../../../../components/View/CustomView';
import Card from '../../../../components/Card/Card';
import {scale, verticalScale} from 'react-native-size-matters';
import Text from '../../../../components/Text/CustomText';
import {dimensions} from '../../../../utils/constants';

const newsCardsData = [
  {
    id: 1,
    title:
      ' Lorem ipsum dolor sit amet, consectetur adipisicing elit.Voluptatibus, iste.',
    date: 'Oct 20, 2022',
  },
  {
    id: 2,
    title:
      ' Lorem ipsum dolor sit amet, consectetur adipisicing elit.Voluptatibus, iste.',
    date: 'Aug 12, 2022',
  },
];

const HomeTab = () => {
  const nav = useNavigation();

  return (
    <ScrollView>
      <Box mt="xs" mx="m">
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => nav.navigate('ProductDetails')}>
          <Card
            height={verticalScale(140)}
            variant="primary"
            px="m"
            pt="s"
            marginVertical="l">
            <Text variant="body_bold">Nearby Restaurants</Text>
            <Text variant="body_sm">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minima,
              officiis!...
            </Text>
            <Box position="absolute" right={10} bottom={-25}>
              <Image
                source={require('../../../../assets/images/nearby.png')}
                style={{
                  width: scale(135),
                  height: verticalScale(135),
                  resizeMode: 'contain',
                }}
              />
            </Box>
          </Card>
        </TouchableOpacity>

        {/* News */}
        <Box>
          <Box
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center">
            <Text variant="title_bold">News</Text>
            <Text variant="body_sm_bold" color="textMuted">
              See all
            </Text>
          </Box>
          <ScrollView showsHorizontalScrollIndicator={false} horizontal>
            {newsCardsData.map((item, index) => (
              <Card
                key={item.id}
                height={verticalScale(100)}
                width={scale(dimensions.width / 1.5)}
                variant="primary"
                mt="s_m"
                overflow="hidden"
                mr="s">
                <Box
                  height={'100%'}
                  backgroundColor={`newsCard_${index + 1}`}
                  px="m"
                  justifyContent="center">
                  <Text variant="title" color={`newsCard_${index + 1}_text`}>
                    Oct 20, 2022
                  </Text>
                  <Box>
                    <Text variant="body_sm_bold" color="text" mt="s_m">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    </Text>
                  </Box>
                </Box>
              </Card>
            ))}
          </ScrollView>
        </Box>
      </Box>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {},
});
export default HomeTab;
