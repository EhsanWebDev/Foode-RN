import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Image,
  StatusBar,
  Platform,
} from 'react-native';
import ScreenContainer from '../../../../components/AppComponents/Container/ScreenContainer';
import Box from '../../../../components/View/CustomView';
import Text from '../../../../components/Text/CustomText';
import Icon from 'react-native-vector-icons/Ionicons';
import IconButton from '../../../../components/Button/IconButton/IconButton';
import {dimensions} from '../../../../utils/constants';
import {verticalScale} from 'react-native-size-matters';
import CustomButton from '../../../../components/Button/CustomButton';

const ProductDetails = ({navigation}) => {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <Box>
        <Image
          source={require('../../../../assets/images/burgers/3.jpg')}
          style={{
            width: dimensions.width,
            height: verticalScale(dimensions.height / 3.5),
          }}
        />
        <Box
          position="absolute"
          top={Platform.OS === 'android' ? 16 : 54}
          left={12}>
          <IconButton icon="close" onPress={navigation.goBack} />
        </Box>
      </Box>

      <Box
        backgroundColor="mainBackground"
        flex={1}
        borderTopLeftRadius={20}
        borderTopRightRadius={20}
        style={{marginTop: -40}}>
        <Box flex={1} mx="m" mt="l">
          <Text variant="header">Best Burger Deal</Text>
          <Text variant="title_bold" color="primary">
            $15
          </Text>
          <Text variant="body_sm" mt="s">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet
            laborum tenetur ad nobis quas voluptas placeat est pariatur
            accusamus. Voluptatem corporis earum rerum nam omnis dolor odio
            iusto assumenda fugiat.
          </Text>
          <Text variant="body_sm" mt="xl">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet
            laborum tenetur ad nobis quas voluptas placeat est pariatur
            accusamus. Voluptatem corporis earum rerum nam omnis dolor odio
            iusto assumenda fugiat.
          </Text>
          <Box flex={1} justifyContent="flex-end" mb="s">
            <CustomButton label="Add to cart" onPress={() => {}} />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ProductDetails;
