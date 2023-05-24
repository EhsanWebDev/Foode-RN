import React, {useEffect} from 'react';
import {StyleSheet, TouchableOpacity, Image, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import Box from '../../../../components/View/CustomView';
import Card from '../../../../components/Card/Card';
import {scale, verticalScale} from 'react-native-size-matters';
import Text from '../../../../components/Text/CustomText';
import {dimensions} from '../../../../utils/constants';
import Icon from 'react-native-vector-icons/Ionicons';
import {globalUnits} from '../../../../theme/globalStyles';
import {useAppTheme} from '../../../../utils/hooks';
import SectionHeader from '../../../../components/AppComponents/SectionHeader/SectionHeader';

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

  const {colors} = useAppTheme();
  const {primary} = colors || {};

  return (
    <ScrollView>
      <Box mt="xl" mx="m">
        <Box>
          <SectionHeader label="Food Categories" />
          {/* <Box
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center">
            <Text variant="body_bold">Food Categories</Text>
            <TouchableOpacity onPress={() => {}}>
              <Box
                p="xs"
                borderRadius={globalUnits.borderRadius_xs}
                backgroundColor="primaryLight">
                <Icon
                  name={'ios-arrow-forward'}
                  color={primary}
                  size={globalUnits.icon_LG}
                />
              </Box>
            </TouchableOpacity>
          </Box> */}
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
