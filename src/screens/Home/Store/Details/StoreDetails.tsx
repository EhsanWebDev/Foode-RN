import React from 'react';
import {StyleSheet, SafeAreaView, Pressable, ScrollView} from 'react-native';
import ScreenContainer from '../../../../components/AppComponents/Container/ScreenContainer';
import Header from '../../../../components/AppComponents/Header/Header';
import Box from '../../../../components/View/CustomView';
import {useAppTheme} from '../../../../utils/hooks';
import Text from '../../../../components/Text/CustomText';
import {Divider} from 'react-native-paper';

const DeliveryInfoRow = ({title, value}) => (
  <Box
    paddingVertical="s"
    borderBottomColor="inactive2"
    borderBottomWidth={1}
    flexDirection="row"
    alignItems="center"
    justifyContent="space-between">
    <Text variant="title_bold">{title}</Text>
    <Text variant="body_sm" color="textMuted">
      {value}
    </Text>
  </Box>
);

const StoreDetails = ({navigation}) => {
  const {colors} = useAppTheme();
  return (
    <ScreenContainer>
      <Header
        label="Shriganesha"
        onBackPress={navigation.goBack}
        rightIcon="information-circle-outline"
      />
      <ScrollView>
        <Box mt="m" mx="l">
          <Box flexDirection="row" alignItems="center">
            <Box width={70} height={70} borderRadius={35} bg="primary" />
            <Box ml="size8">
              <Text variant="body_bold">Shriganesha</Text>
              <Box flexDirection="row" alignItems="center">
                <Box
                  mr="xs"
                  width={8}
                  height={8}
                  borderRadius={4}
                  bg="success"
                />
                <Text variant="body_sm" color="muted">
                  Tomorrow 10:00-02:00
                </Text>
              </Box>
            </Box>
          </Box>
          <Box mt="m">
            <Text variant="body_sm" textAlign="justify" color="textMuted">
              Pickles, or “pickled vegetables”, are a Korean specialty. They are
              served as a side dish to many dishes. The white cabbage is placed
              in say sauce and spices, giving it its unmistakable taste. Goes
              well vid Fried Chicken Bulgogi.
            </Text>
          </Box>
        </Box>
        <Box mt="m" mb="s">
          <Divider style={{height: 8, backgroundColor: '#EBEBEB'}} />
        </Box>

        <Box mx="l">
          <Text variant="body_bold">Location</Text>

          <Box
            mt="m"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between">
            <Text variant="body_sm" color="textMuted">
              {`Vijay Nagar, Indore
Open at 17:30 . Order in advance`}
            </Text>
            <Pressable>
              <Text variant="body_sm" color="primary">
                Map
              </Text>
            </Pressable>
          </Box>
        </Box>
        <Box mt="l" mb="s">
          <Divider style={{height: 8, backgroundColor: '#EBEBEB'}} />
        </Box>
        <Box mx="l">
          <Text variant="body_bold">Open Hours</Text>

          <Box mt="m">
            <Text variant="body_sm" color="textMuted">
              Monday-Sunday 10:00-02:00
            </Text>
          </Box>
        </Box>
        <Box mt="l" mb="s">
          <Divider style={{height: 8, backgroundColor: '#EBEBEB'}} />
        </Box>
        <Box mx="l">
          <Text variant="body_bold">Delivery Information</Text>

          <Box mt="l">
            <DeliveryInfoRow title="Time:" value="Monday-Sunday 10:00-02:00" />
            <DeliveryInfoRow title="Delivery Cost:" value="CHF 0:00" />
            <DeliveryInfoRow
              title="Small order surcharge limit:"
              value="CHF 15:90"
            />
            <DeliveryInfoRow
              title="Long delivery surcharge limit:"
              value="2 km"
            />
            <DeliveryInfoRow
              title="Estimated time until delivery:"
              value="20-30 min"
            />
          </Box>
        </Box>
      </ScrollView>
    </ScreenContainer>
  );
};

export default StoreDetails;
