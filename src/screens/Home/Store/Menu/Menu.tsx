import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {StyleSheet, ScrollView, TouchableOpacity, Image} from 'react-native';
import Box from '../../../../components/View/CustomView';
import Text from '../../../../components/Text/CustomText';
import {scale, verticalScale} from 'react-native-size-matters';
import IconButton from '../../../../components/Button/IconButton/IconButton';
import {Divider} from 'react-native-paper';

const MenuItem = ({name, onPress}) => {
  return (
    <>
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          mx="s"
          py="s">
          <Box flex={0.9}>
            <Text variant="title_bold" color="title">
              {name}
            </Text>
            <Text numberOfLines={2} variant="body_sm" color="textMuted" mt="xs">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi,
              dolor...
            </Text>
            <Text variant="body_sm" mt="xs" color="primary">
              from $4.00
            </Text>
          </Box>
          <Box>
            <Image
              source={require('../../../../assets/images/burgers/2.jpg')}
              style={{
                width: scale(64),
                height: verticalScale(60),
                borderRadius: 8,
              }}
            />
            <Box position="absolute" right={-4} bottom={-4}>
              <IconButton icon="add" size="small" inverse iconColor="white" />
            </Box>
          </Box>
        </Box>
      </TouchableOpacity>

      <Divider />
    </>
  );
};
const Menu = () => {
  const nav = useNavigation();

  return (
    <Box flex={1} mx="s" mt="l">
      <Box>
        <ScrollView showsVerticalScrollIndicator={false}>
          <MenuItem name="Burger Combo" onPress={() => nav.navigate('Cart')} />
          <MenuItem name="BBQ Burger" onPress={() => nav.navigate('Cart')} />
          <MenuItem
            name="Sriracha Burger"
            onPress={() => nav.navigate('Cart')}
          />
          <MenuItem name="Fish Sandwich" onPress={() => nav.navigate('Cart')} />
          <MenuItem name="Frosty" onPress={() => nav.navigate('Cart')} />
        </ScrollView>
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {},
});
export default Menu;
