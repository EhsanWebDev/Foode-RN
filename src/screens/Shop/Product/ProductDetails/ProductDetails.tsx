import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {SafeAreaView, StatusBar, Platform, View} from 'react-native';
import Box from '../../../../components/View/CustomView';
import Text from '../../../../components/Text/CustomText';
import IconButton from '../../../../components/Button/IconButton/IconButton';
import {dimensions} from '../../../../utils/constants';
import {verticalScale} from 'react-native-size-matters';
import CustomButton from '../../../../components/Button/CustomButton';
import {ActivityIndicator} from 'react-native-paper';
import {useReduxDispatch, useReduxSelector} from '../../../../store';
import {getProductDetails} from '../../../Home/Store/redux/actions';
import ScreenContainer from '../../../../components/AppComponents/Container/ScreenContainer';
import Header from '../../../../components/AppComponents/Header/Header';
import Image from '../../../../components/Image/Image';
import showToast from '../../../../utils/toast';
import {addToCart} from '../../Cart/cartSlice';
import CartItemActions from '../../../../components/AppComponents/CartItemActions/CartItemActions';
import BottomSheet from '@gorhom/bottom-sheet';
import {useTranslation} from 'react-i18next';

const ProductDetails = ({navigation, route}) => {
  const {params} = route || {};
  const {productId} = params || {};

  const dispatch = useReduxDispatch();
  const {t: lang} = useTranslation();
  const {data, status} = useReduxSelector(store => store.store.product);
  const {cartItems} = useReduxSelector(store => store.cart);

  const existingProduct = (cartItems || []).find(
    product => product.id === productId,
  );
  const {quantity: existingQuantity} = existingProduct || {};

  const [quantity, setQuantity] = useState(
    existingQuantity ? existingQuantity : 1,
  );
  const [isDec, setIsDec] = useState(false);

  const fetchAPI = () => {
    dispatch(getProductDetails({productId}));
  };
  useEffect(() => {
    fetchAPI();
  }, [productId]);

  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ['70%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

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

  console.log({data});

  return (
    <Box flex={1}>
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
        <Box
          position="absolute"
          top={Platform.OS === 'android' ? 20 : 46}
          left={12}>
          <IconButton icon="close" onPress={navigation.goBack} />
        </Box>
      </Box>

      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}>
        <Box
          backgroundColor="mainBackground"
          flex={1}
          borderTopLeftRadius={32}
          borderTopRightRadius={32}>
          <Box flex={1} mx="m" mb="l+">
            <Text variant="header">{product_name}</Text>
            <Text variant="title_bold" color="primary">
              CHF {price}
            </Text>
            <Text variant="body_sm" mt="s">
              {product_description}
            </Text>
            <Box flex={1} justifyContent="flex-end" mb="xxs">
              <Box flexDirection="row" alignItems="center">
                <CartItemActions
                  onDecrement={() => {
                    setQuantity(q => (q > 1 ? q - 1 : 1));
                    setIsDec(true);
                  }}
                  onIncrement={() => {
                    setQuantity(q => q + 1);
                    setIsDec(false);
                  }}
                  quantity={quantity}
                />
                <Box flex={1}>
                  <CustomButton
                    label={lang('addToCart')}
                    ml="s"
                    onPress={() => {
                      showToast({
                        message: `${product_name} ${
                          isDec ? 'removed from' : 'added to'
                        }  the cart`,
                        visibilityTime: 1200,
                      });
                      dispatch(addToCart({...items, quantity}));
                      navigation.goBack();
                    }}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Box>
  );
};

export default ProductDetails;
