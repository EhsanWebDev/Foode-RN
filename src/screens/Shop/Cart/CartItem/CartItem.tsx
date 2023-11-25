import React, {FC, useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {CartProduct} from '../types';
import {useReduxDispatch} from '../../../../store';
import {Swipeable} from 'react-native-gesture-handler';
import Card from '../../../../components/Card/Card';
import Box from '../../../../components/View/CustomView';
import Image from '../../../../components/Image/Image';
import Text from '../../../../components/Text/CustomText';
import {
  addToCart,
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from '../cartSlice';
import IconButton from '../../../../components/Button/IconButton/IconButton';
import CartItemActions from '../../../../components/AppComponents/CartItemActions/CartItemActions';
import RadioButton from '../../../../components/RadioButton/RadioButton';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  areAllItemsSatisfied,
  calculateTotals,
  decreaseQuantity,
  increaseQuantity,
  toggleExtraItem,
} from '../../Product/ProductDetails/helpers';
import CustomButton from '../../../../components/Button/CustomButton';

const renderRightActions = (onPress, productId) => {
  return (
    <Box
      backgroundColor="primaryLight"
      width={55}
      height={75}
      alignItems="center"
      justifyContent="center"
      borderTopRightRadius={20}
      borderBottomEndRadius={20}>
      <Card>
        <IconButton icon="trash" onPress={() => onPress(productId)} />
      </Card>
    </Box>
  );
};

type CartItem = {
  item: CartProduct;
  onPress: () => void;
};

const CartItem: FC<CartItem> = ({item, onPress}) => {
  const dispatch = useReduxDispatch();
  const [isExpended, setIsExpended] = useState<boolean>(false);

  const {
    id,
    product_name,
    quantity,
    product_image,
    product_description,
    details,
    extraData: extra_data,
  } = item || {};

  const {price} = details[0] || {};
  const [extraData, setExtraData] = useState(extra_data || []);

  const totalAddOns = calculateTotals(extraData);
  let totalValueForAddOns = (totalAddOns || []).reduce(
    (sum, item) => parseFloat(sum) + parseFloat(item?.total),
    '0.0',
  );
  totalValueForAddOns = parseFloat(totalValueForAddOns);

  const allItemsSatisfied = areAllItemsSatisfied(extraData);

  const result = parseFloat(price) * quantity + totalValueForAddOns;
  const total = result?.toFixed(2);

  return (
    <Box
      flex={1}
      p="s"
      mb="m"
      borderBottomColor="headerBorder"
      borderBottomWidth={1}>
      <Box flexDirection="row" justifyContent="space-between">
        <Box flex={1} flexDirection="row" alignItems="center">
          <Box flex={0.9}>
            <Box>
              <Text
                variant="title"
                textTransform="capitalize"
                numberOfLines={1}>
                {product_name}
              </Text>
              <Text
                variant="body_sm"
                color="textMuted"
                textTransform="capitalize"
                marginVertical="xs"
                numberOfLines={1}>
                {product_description}
              </Text>
            </Box>

            <Text variant="body_sm" color="primary">
              CHF {price}
            </Text>
          </Box>
        </Box>
        <CartItemActions
          onDecrement={() => dispatch(decrementQuantity(id))}
          onIncrement={() => dispatch(incrementQuantity(id))}
          quantity={quantity}
          itemId={id}
        />
      </Box>
      {(extraData || []).length > 0 ? (
        <Box mt="m" flex={1}>
          <TouchableOpacity onPress={() => setIsExpended(ex => !ex)}>
            <Box
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between">
              <Text variant="title_bold">
                Add-ons{' '}
                <Text variant="body_xs">
                  (+{totalValueForAddOns?.toFixed(2)})
                </Text>
              </Text>
              <Icon
                name={isExpended ? 'chevron-up' : 'chevron-down'}
                size={16}
              />
            </Box>
          </TouchableOpacity>

          {isExpended ? (
            <Box>
              {(extraData || [])?.map(item => {
                const {extra_name, inner_id, max, min, sub_extras, outer_id} =
                  item || {};
                return (
                  <Box key={inner_id}>
                    <Text variant="body_sm_bold" mt="s_m" numberOfLines={1}>
                      {extra_name}
                      {'  '}
                      <Text variant="body_xs_2" color="primary">
                        (Minimum {min ?? '0'} Maximum {max ?? '0'})
                      </Text>
                    </Text>
                    {(sub_extras || [])?.map(subItem => {
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
              <Box mt="s">
                <CustomButton
                  disabled={!allItemsSatisfied}
                  buttonSize="small"
                  label="Update"
                  onPress={() => {
                    dispatch(removeFromCart(id));
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
                        ...item,
                        quantity,
                        extra_id:
                          extraIds?.length === 0 ? '0' : extraIds?.join(''),
                        extra_name: extraNames?.join(''),
                        extraData,
                      }),
                    );
                  }}
                />
              </Box>
            </Box>
          ) : null}
        </Box>
      ) : null}
    </Box>
  );
};

export default CartItem;
