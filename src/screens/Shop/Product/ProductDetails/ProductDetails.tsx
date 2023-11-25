import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Platform} from 'react-native';
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
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {useTranslation} from 'react-i18next';
import RadioButton from '../../../../components/RadioButton/RadioButton';
import {
  areAllItemsSatisfied,
  calculateTotals,
  decreaseQuantity,
  increaseQuantity,
  toggleExtraItem,
} from './helpers';

const ProductDetails = ({navigation, route}) => {
  const dispatch = useReduxDispatch();
  const {t: lang} = useTranslation();
  const {data, status} = useReduxSelector(store => store.store.product);
  const {cartItems} = useReduxSelector(store => store.cart);

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['70%'], []);
  const handleSheetChanges = useCallback((index: number) => {}, []);

  const {params} = route || {};
  const {productId} = params || {};
  const {items, extras} = data || {};
  const {product_image, product_name, product_description, details} =
    items || {};

  const {price} = details?.[0] || {};

  const existingProduct = (cartItems || []).find(
    product => product.id === productId,
  );
  const {quantity: existingQuantity} = existingProduct || {};

  const [quantity, setQuantity] = useState(existingQuantity || 1);
  const [extraData, setExtraData] = useState(extras);
  const [isDec, setIsDec] = useState(false);

  useEffect(() => {
    dispatch(getProductDetails({productId}));
  }, [productId, dispatch]);

  useEffect(() => {
    if (status !== 'loading' && status !== 'idle') {
      setExtraData(extras);
    }

    return () => {
      setExtraData([]);
    };
  }, [status, productId]);

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

  // const ex = {
  //   9617: {
  //     120: {
  //       extra_name: 'Some Name',
  //       max: '12',
  //       sub_extras: {
  //         646: {name: 'Sauce', price: '2.00'},
  //       },
  //     },
  //   },
  // };
  // const ex2 = {
  //   extra_name: 'Test Addon',
  //   inner_id: '120',
  //   max: 1,
  //   min: 1,
  //   outer_id: '9617',
  //   sub_extras: [
  //     {id: '646', name: 'Sauce', price: '2.00', quantity:2},
  //     {id: '647', name: 'Sauce Plus', price: '3.00'},
  //   ],
  // };

  const totalAddOns = calculateTotals(extraData);
  let totalValueForAddOns = (totalAddOns || []).reduce(
    (sum, item) => parseFloat(sum) + parseFloat(item?.total),
    '0.0',
  );
  totalValueForAddOns = parseFloat(totalValueForAddOns);

  const allItemsSatisfied = areAllItemsSatisfied(extraData);

  const result = parseFloat(price) * quantity + totalValueForAddOns;
  const total = result?.toFixed(2);

  // const increaseQuantity = (extra_id, sub_extra_id) => {
  //   const up = (extraData || []).map(extraItem => {
  //     const {outer_id} = extraItem || {};
  //     if (outer_id === extra_id) {
  //       const {sub_extras} = extraItem || {};

  //       const upSub = (sub_extras || []).map(subItem => {
  //         if (subItem?.id === sub_extra_id) {
  //           return {
  //             ...subItem,
  //             quantity: (subItem.quantity || 0) + 1,
  //             checked: true,
  //           };
  //         }
  //         return subItem;
  //       });

  //       return {
  //         ...extraItem,
  //         sub_extras: upSub,
  //       };
  //     }
  //     return extraItem;
  //   });
  //   setExtraData(up);
  // };
  // const decreaseQuantity = (extra_id, sub_extra_id) => {
  //   const up = (extraData || []).map(extraItem => {
  //     const {outer_id} = extraItem || {};
  //     if (outer_id === extra_id) {
  //       const {sub_extras} = extraItem || {};

  //       const upSub = (sub_extras || []).map(subItem => {
  //         if (subItem?.id === sub_extra_id) {
  //           return {
  //             ...subItem,
  //             quantity: subItem?.quantity > 0 ? (subItem.quantity || 0) - 1 : 0,
  //             checked: subItem?.quantity > 1,
  //           };
  //         }
  //         return subItem;
  //       });

  //       return {
  //         ...extraItem,
  //         sub_extras: upSub,
  //       };
  //     }
  //     return extraItem;
  //   });
  //   setExtraData(up);
  // };
  // const toggleExtraItem = (extra_id: any, sub_extra_id: any) => {
  //   const up = (extraData || []).map(extraItem => {
  //     const {outer_id} = extraItem || {};
  //     if (outer_id === extra_id) {
  //       const {sub_extras} = extraItem || {};

  //       const upSub = (sub_extras || []).map(subItem => {
  //         if (subItem?.id === sub_extra_id) {
  //           return {
  //             ...subItem,
  //             quantity: subItem?.checked ? 0 : (subItem.quantity || 0) + 1,
  //             checked: !subItem?.checked,
  //           };
  //         }
  //         return subItem;
  //       });

  //       return {
  //         ...extraItem,
  //         sub_extras: upSub,
  //       };
  //     }
  //     return extraItem;
  //   });
  //   setExtraData(up);
  // };
  return (
    <Box flex={1}>
      <Box>
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
            {(extraData || []).length > 0 ? (
              <Box mt="m" flex={1}>
                <Text variant="body_bold" pb="s">
                  {lang('addOns')}
                </Text>
                <BottomSheetScrollView>
                  {(extraData || [])?.map((item, outerIndex) => {
                    const {
                      extra_name,
                      inner_id,
                      max,
                      min,
                      sub_extras,
                      outer_id,
                    } = item || {};
                    return (
                      <Box key={inner_id} marginVertical="s">
                        <Text variant="body_sm_bold" numberOfLines={1}>
                          {extra_name}
                          {'  '}
                          <Text variant="body_xs_2" color="primary">
                            (Minimum {min ?? '0'} Maximum {max ?? '0'})
                          </Text>
                        </Text>
                        {(sub_extras || [])?.map((subItem, innerIndex) => {
                          const {
                            id,
                            name,
                            price,
                            quantity: subQuantity,
                            checked: subChecked,
                          } = subItem || {};
                          return (
                            <Box
                              key={id}
                              mt="size6"
                              flexDirection="row"
                              alignItems="center"
                              justifyContent="space-between">
                              <RadioButton
                                title={`${name} (+ ${price} CHF)`}
                                textVariant="body_xs_bold"
                                iconSize={20}
                                onCheck={() => {
                                  toggleExtraItem(
                                    outer_id,
                                    id,
                                    extraData,
                                    setExtraData,
                                  );
                                }}
                                checked={subChecked}
                              />
                              <CartItemActions
                                hideDialog
                                onDecrement={() => {
                                  decreaseQuantity(
                                    outer_id,
                                    id,
                                    extraData,
                                    setExtraData,
                                  );
                                }}
                                onIncrement={() => {
                                  increaseQuantity(
                                    outer_id,
                                    id,
                                    extraData,
                                    setExtraData,
                                  );
                                }}
                                quantity={subQuantity}
                              />
                            </Box>
                          );
                        })}
                      </Box>
                    );
                  })}
                </BottomSheetScrollView>
              </Box>
            ) : (
              <Box flex={1} />
            )}

            <Box justifyContent="flex-end" mb="xxs">
              <Box flexDirection="row" alignItems="center">
                <CartItemActions
                  hideDialog
                  size="lg"
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
                    disabled={!allItemsSatisfied}
                    label={`${lang('addToCart')} (${total})`}
                    ml="s"
                    onPress={() => {
                      showToast({
                        message: `${product_name} ${
                          isDec
                            ? lang('removeFromCartMsg')
                            : lang('addToCartMsg')
                        }`,
                        visibilityTime: 1200,
                      });
                      let extraIds = [];
                      let extraNames = [];
                      (extraData || [])?.forEach(extraItem => {
                        const {sub_extras} = extraItem || {};
                        (sub_extras || [])?.forEach(subExtra => {
                          if (subExtra?.checked) {
                            extraIds?.push(`${subExtra?.id},`);
                            extraNames?.push(
                              `${subExtra?.name} [ CHF ${subExtra?.price} ] (${subExtra?.quantity})<br>`,
                            );
                          }
                        });
                      });

                      dispatch(
                        addToCart({
                          ...items,
                          quantity,
                          extra_id:
                            extraIds?.length === 0 ? '0' : extraIds?.join(''),
                          extra_name: extraNames?.join(''),
                          extraData,
                        }),
                      );
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
