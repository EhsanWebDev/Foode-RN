import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Pressable,
  ScrollView,
  Image,
} from 'react-native';
import ScreenContainer from '../../../../components/AppComponents/Container/ScreenContainer';
import Header from '../../../../components/AppComponents/Header/Header';
import Box from '../../../../components/View/CustomView';
import {useAppTheme} from '../../../../utils/hooks';
import Text from '../../../../components/Text/CustomText';
import {Divider} from 'react-native-paper';
import {useReduxSelector} from '../../../../store';
import {useTranslation} from 'react-i18next';

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
  const {t: lang} = useTranslation();
  const {status: storeStatus, data: storeData} = useReduxSelector(
    store => store.store.menu,
  );

  const {
    business_name,
    business_logo,
    business_address,
    pickup_estimate,
    meta_description,
    currency,
    delivery_estimate,
  } = storeData || {};

  console.log({storeData});

  return (
    <ScreenContainer>
      <Header label={business_name} onBackPress={navigation.goBack} />
      <ScrollView>
        <Box mt="m" mx="l">
          <Box flexDirection="row" alignItems="center">
            <Box
              width={70}
              overflow="hidden"
              height={70}
              bg={'primary'}
              borderRadius={35}>
              <Image
                source={{uri: business_logo}}
                style={{
                  width: '100%',
                  height: '100%',
                  resizeMode: 'contain',
                }}
              />
            </Box>
            <Box ml="size8">
              <Text variant="body_bold">{business_name}</Text>
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
              {meta_description}
            </Text>
          </Box>
        </Box>
        <Box mt="m" mb="s">
          <Divider style={{height: 8, backgroundColor: '#EBEBEB'}} />
        </Box>

        <Box mx="l">
          <Text variant="body_bold">{lang('location')}</Text>

          <Box
            mt="m"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between">
            <Box flex={1}>
              <Text
                variant="body_sm"
                color="textMuted"
                mr={'m'}
                numberOfLines={2}>
                {`${business_address}`}
              </Text>
            </Box>

            <Pressable disabled>
              <Text variant="body_sm" color="inactive2">
                Map
              </Text>
            </Pressable>
          </Box>
        </Box>
        <Box mt="l" mb="s">
          <Divider style={{height: 8, backgroundColor: '#EBEBEB'}} />
        </Box>
        <Box mx="l">
          <Text variant="body_bold">{lang('openHours')}</Text>

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
          <Text variant="body_bold">
            {lang('delivery')} {lang('information')}
          </Text>

          <Box mt="l">
            <DeliveryInfoRow
              title={`${lang('time')}:`}
              value="Monday-Sunday 10:00-02:00"
            />
            <DeliveryInfoRow
              title={`${lang('delivery')} ${lang('cost')}:`}
              value={`CHF ${delivery_estimate}`}
            />

            <DeliveryInfoRow
              title={`${lang('estDelivery')} ${lang('delivery')}:`}
              value={`${delivery_estimate} min`}
            />
            <DeliveryInfoRow
              title={`${lang('pickupEST')}:`}
              value={`${pickup_estimate} min`}
            />
          </Box>
        </Box>
      </ScrollView>
    </ScreenContainer>
  );
};

export default StoreDetails;
