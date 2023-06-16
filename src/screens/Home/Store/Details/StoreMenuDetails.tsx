import React from 'react';
import {Pressable, ScrollView, Image} from 'react-native';
import ScreenContainer from '../../../../components/AppComponents/Container/ScreenContainer';
import Header from '../../../../components/AppComponents/Header/Header';
import Box from '../../../../components/View/CustomView';
import {useAppTheme} from '../../../../utils/hooks';
import Text from '../../../../components/Text/CustomText';
import {Divider} from 'react-native-paper';
import {useReduxSelector} from '../../../../store';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {CategoryItem, InfoRowProps} from './types';

const InfoRow = ({title, image, onPress}: InfoRowProps) => {
  const {colors} = useAppTheme();
  return (
    <Pressable onPress={onPress}>
      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between">
        <Box flexDirection="row" alignItems="center">
          <Box
            width={50}
            height={50}
            borderRadius={12}
            overflow="hidden"
            bg="inactive2">
            <Image
              source={{uri: image}}
              style={{
                width: '100%',
                height: '100%',
                resizeMode: 'contain',
              }}
            />
          </Box>
          <Text ml="size8" variant="body_bold">
            {title}
          </Text>
        </Box>
        <IonIcon name="chevron-forward" size={20} color={colors.inactive2} />
      </Box>
    </Pressable>
  );
};

const StoreMenuDetails = ({navigation}) => {
  const {colors} = useAppTheme();
  const {data} = useReduxSelector(store => store.store.menu);

  const {
    business_logo,
    business_name,
    delivery_estimate,
    category,
    transformedData,
  } = data || {};

  return (
    <ScreenContainer>
      <Header
        label={business_name}
        onBackPress={navigation.goBack}
        rightIcon="information-circle-outline"
        onRightIconPress={() => navigation.navigate('StoreDetails')}
      />
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

              <Text variant="body_sm" color="primary">
                {`Delivery in ${
                  delivery_estimate - 5
                }-${delivery_estimate} min`}
              </Text>
            </Box>
          </Box>
        </Box>
        <Box mt="l+" mb="s">
          <Divider style={{height: 8, backgroundColor: colors.inactive2}} />
        </Box>

        <Box mx="l">
          <Box
            px="m"
            py="size8"
            borderBottomColor="border"
            borderBottomWidth={1}>
            <Text variant="title_bold" color="muted" textTransform="uppercase">
              Food menu
            </Text>
          </Box>
          {(category || []).map(item => {
            const {id, category_name, category_image} = item || {};
            return (
              <Box mt="s" p="size8" key={id}>
                <InfoRow
                  title={category_name}
                  image={category_image}
                  onPress={() =>
                    navigation.navigate('MenuItem', {
                      item_name: category_name,
                      data: transformedData.filter(
                        (cat_item: CategoryItem) =>
                          cat_item.title === category_name,
                      ) ?? {title: '', data: []},
                    })
                  }
                />
              </Box>
            );
          })}
        </Box>
        <Box mt="m" mb="s">
          <Divider style={{height: 8, backgroundColor: colors.inactive2}} />
        </Box>
        <Box mx="l">
          <Box
            px="m"
            py="size8"
            borderBottomColor="border"
            borderBottomWidth={1}>
            <Text variant="title_bold" color="muted" textTransform="uppercase">
              Vouchers
            </Text>
          </Box>

          <Box mt="s" p="size8">
            <InfoRow
              title={'Gift Voucher'}
              image={undefined}
              onPress={() => {}}
            />
          </Box>
        </Box>
      </ScrollView>
    </ScreenContainer>
  );
};

export default StoreMenuDetails;
