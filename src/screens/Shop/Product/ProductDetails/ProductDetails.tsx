import React, {useEffect} from 'react';
import {SafeAreaView, StatusBar, Platform, View} from 'react-native';
import Box from '../../../../components/View/CustomView';
import Text from '../../../../components/Text/CustomText';
import IconButton from '../../../../components/Button/IconButton/IconButton';
import {StatusBarHeight, dimensions} from '../../../../utils/constants';
import {verticalScale} from 'react-native-size-matters';
import CustomButton from '../../../../components/Button/CustomButton';
import {ActivityIndicator} from 'react-native-paper';
import {useReduxDispatch, useReduxSelector} from '../../../../store';
import {getProductDetails} from '../../../Home/Store/redux/actions';
import ScreenContainer from '../../../../components/AppComponents/Container/ScreenContainer';
import Header from '../../../../components/AppComponents/Header/Header';
import Image from '../../../../components/Image/Image';
import {useAppTheme} from '../../../../utils/hooks';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import showToast from '../../../../utils/toast';
import {addToCart} from '../../Cart/cartSlice';

const ProductDetails = ({navigation, route}) => {
  const {params} = route || {};
  const {productId} = params || {};
  const {colors} = useAppTheme();
  const insets = useSafeAreaInsets();
  const dispatch = useReduxDispatch();
  const {data, status} = useReduxSelector(store => store.store.product);

  const statusBarHeight = insets.top;

  const fetchAPI = () => {
    dispatch(getProductDetails({productId}));
  };
  useEffect(() => {
    fetchAPI();
  }, [productId]);

  if (status === 'loading') {
    return (
      <ScreenContainer>
        <Header label="Product Details" onBackPress={navigation.goBack} />
        <Box flex={1} justifyContent="center" alignItems="center">
          <ActivityIndicator />
        </Box>
      </ScreenContainer>
    );
  }

  const {items} = data || {};
  const {product_image, product_name, product_description, details} =
    items || {};
  const {price} = details?.[0] || {};

  return (
    <>
      {/* <StatusBar backgroundColor={colors.primary} /> */}
      <Box>
        {/* <View
          style={{
            width: dimensions.width,
            backgroundColor: colors.primary,
            height: statusBarHeight,
          }}
        /> */}
        <Image
          uri={product_image}
          imageStyles={{
            width: dimensions.width,
            height: verticalScale(dimensions.height / 3),
          }}
        />
        <Box position="absolute" top={16} left={12}>
          <IconButton icon="close" onPress={navigation.goBack} />
        </Box>
      </Box>
      <SafeAreaView style={{flex: 1}}>
        <Box
          backgroundColor="mainBackground"
          flex={1}
          borderTopLeftRadius={32}
          borderTopRightRadius={32}
          style={{marginTop: -30}}>
          <Box flex={1} mx="m" mt="l">
            <Text variant="header">{product_name}</Text>
            <Text variant="title_bold" color="primary">
              ${price}
            </Text>
            <Text variant="body_sm" mt="s">
              {product_description}
            </Text>
            <Box flex={1} justifyContent="flex-end" mb="s">
              <CustomButton
                label="Add to cart"
                onPress={() => {
                  showToast({
                    message: `${product_name} added to the cart`,
                    type: 'success',

                    visibilityTime: 1000,
                  });
                  dispatch(addToCart({...items}));
                }}
              />
            </Box>
          </Box>
        </Box>
      </SafeAreaView>
    </>
  );
};

export default ProductDetails;
