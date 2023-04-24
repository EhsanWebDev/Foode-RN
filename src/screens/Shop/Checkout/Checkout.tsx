import React from 'react';
import ScreenContainer from '../../../components/AppComponents/Container/ScreenContainer';
import Box from '../../../components/View/CustomView';
import Text from '../../../components/Text/CustomText';
import Header from '../../../components/AppComponents/Header/Header';
import Card from '../../../components/Card/Card';
import Icon from 'react-native-vector-icons/Ionicons';
import {useAppTheme} from '../../../utils/hooks';
import {globalUnits} from '../../../theme/globalStyles';
import IconButton from '../../../components/Button/IconButton/IconButton';
import {Divider} from 'react-native-paper';
import CustomButton from '../../../components/Button/CustomButton';

const Checkout = ({navigation}) => {
  const {colors} = useAppTheme();
  return (
    <ScreenContainer>
      <Box>
        <Header label="Checkout" onBackPress={navigation.goBack} />
        <Box mt="l">
          <Card variant="primary">
            <Box p="s_m">
              <Box
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between">
                <Box flexDirection="row" alignItems="center">
                  <Icon
                    name="location"
                    color={colors.primary}
                    size={globalUnits.icon_LG}
                  />

                  <Text ml="s" variant="body_bold">
                    Delivery address
                  </Text>
                </Box>
                <IconButton
                  variant="text"
                  icon="pencil"
                  iconFamily="MaterialCommunityIcons"
                  style={{
                    width: globalUnits.icon_LG,
                    height: globalUnits.icon_LG,
                  }}
                />
              </Box>
              <Box mt="s">
                <Text variant="body_sm">
                  Address: Lorem ipsum dolor sit amet consectetur adipisicing
                  elit. Rem, dolore!
                </Text>
              </Box>
            </Box>
            <Divider />
            <Box flexDirection="row" alignItems="center" p="s_m">
              <IconButton
                style={{
                  width: globalUnits.icon_LG,
                  height: globalUnits.icon_LG,
                }}
                icon="add"
                variant="text"
                size="big"
              />
              <Text ml="xs" variant="body_sm_bold" color="primary">
                Add delivery instructions for your rider
              </Text>
            </Box>
          </Card>
          <Card variant="primary" mt="l">
            <Box p="s_m">
              <Box
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between">
                <Box flexDirection="row" alignItems="center">
                  <Icon
                    name="wallet"
                    color={colors.primary}
                    size={globalUnits.icon_LG}
                  />

                  <Text ml="s" variant="body_bold">
                    Payment method
                  </Text>
                </Box>
              </Box>
            </Box>
            <Box flexDirection="row" alignItems="center" p="s_m">
              <IconButton
                style={{
                  width: globalUnits.icon_LG,
                  height: globalUnits.icon_LG,
                }}
                icon="add"
                variant="text"
                size="big"
              />
              <Text ml="xs" variant="body_sm_bold" color="primary">
                Add a payment method
              </Text>
            </Box>
          </Card>
          <Card variant="primary" mt="l">
            <Box p="s_m">
              <Box flexDirection="row" alignItems="center">
                <Icon
                  name="receipt"
                  color={colors.primary}
                  size={globalUnits.icon_LG}
                />

                <Text ml="s" variant="body_bold">
                  Order summary
                </Text>
              </Box>
              <Box
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
                paddingVertical="s_m">
                <Text variant={'body_sm'}>1 x Burger Deal</Text>
                <Text variant={'body_sm'}>12$</Text>
              </Box>
              <Divider />
              <Box
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
                mt="s">
                <Text variant={'body_sm'}>Subtotal</Text>
                <Text variant={'body_sm'}>12$</Text>
              </Box>
              <Box
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
                mt="s">
                <Text variant={'body_sm'}>Delivery fee</Text>
                <Text variant={'body_sm'}>2$</Text>
              </Box>
            </Box>
          </Card>

          <Text variant="body_sm" mt="l">
            By completing this order I accept{' '}
            <Text variant="body_sm_bold" color="primary">
              Terms and Conditions
            </Text>
          </Text>
        </Box>
      </Box>
      <Box flex={1} justifyContent="flex-end" mb="s">
        <Card variant="secondary" py="m" px="m" mb="s">
          <Box
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            mx="s">
            <Text variant="title" color="text">
              Total{' '}
              <Text variant="body_sm" color="text">
                (inc. VAT)
              </Text>
            </Text>
            <Text variant="title_bold" color="text">
              $14
            </Text>
          </Box>

          <CustomButton
            mt="m"
            label="Complete Order"
            backgroundColor="mainBackground"
            buttonType="outlined"
            onPress={() => navigation.navigate('Checkout')}
          />
        </Card>
      </Box>
    </ScreenContainer>
  );
};
export default Checkout;
