import React, {FC, memo} from 'react';
import {TouchableOpacity} from 'react-native';
import Box from '../../../../../components/View/CustomView';
import Text from '../../../../../components/Text/CustomText';
import IconButton from '../../../../../components/Button/IconButton/IconButton';
import {Divider} from 'react-native-paper';
import Image from '../../../../../components/Image/Image';
import {ProductType} from './types';
import {moderateVerticalScale} from 'react-native-size-matters';

type MenuProps = {
  item: ProductType;
  onPress: () => void;
  onPressAdd: () => void;
};

const MenuItem: FC<MenuProps> = ({item, onPress, onPressAdd}) => {
  const {product_image, details, product_description} = item || {};
  const {price, name} = details[0] || {};

  return (
    <Box
    // height={125}
    >
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          mx="s"
          py="s">
          <Box flex={0.9}>
            <Text variant="title_bold" color="title">
              {name ?? ''}
            </Text>
            <Text numberOfLines={2} variant="body_sm" color="textMuted" mt="s">
              {product_description ?? ''}
            </Text>
            <Text variant="body_sm_bold" mt="s" color="primary">
              CHF {price ?? ''}
            </Text>
          </Box>
          <Box>
            <Image uri={product_image} />

            <Box position="absolute" right={-4} bottom={-4}>
              <IconButton
                icon="add"
                size="small"
                inverse
                iconColor="white"
                onPress={onPressAdd}
              />
            </Box>
          </Box>
        </Box>
      </TouchableOpacity>

      <Divider />
    </Box>
  );
};
export default memo(MenuItem);
