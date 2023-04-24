import React, {useCallback, useMemo, useRef} from 'react';
import {
  SafeAreaView,
  Image,
  StatusBar,
  Platform,
  ScrollView,
  View,
} from 'react-native';
import Box from '../../../components/View/CustomView';
import {dimensions} from '../../../utils/constants';
import {verticalScale} from 'react-native-size-matters';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';

import Text from '../../../components/Text/CustomText';
import CustomButton from '../../../components/Button/CustomButton';
import IconButton from '../../../components/Button/IconButton/IconButton';
import Card from '../../../components/Card/Card';
import Icon from 'react-native-vector-icons/Ionicons';
import {useAppTheme} from '../../../utils/hooks';
import {StretchyScrollView} from 'react-native-stretchy';

const Profile = ({navigation}) => {
  const {colors} = useAppTheme();
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => [dimensions.height / 1.4], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const Item = () => (
    <Card variant="primary" paddingVertical="s" px="s" mb="l">
      <Box flexDirection="row" justifyContent="space-between">
        <Box flexDirection="row" alignItems="center">
          <Image
            source={require('./../../../assets/images//burgers/1.jpg')}
            style={{width: 60, height: 60, borderRadius: 8}}
          />
          <Box ml="m">
            <Text variant="title_bold">Cheesy</Text>
            <Text variant="body_xs" color="textMuted">
              Double cheese
            </Text>
            <Text variant="body_sm_bold" color="primary">
              $12
            </Text>
          </Box>
        </Box>
        <Box justifyContent="center" pr="s">
          <Icon name="heart" size={24} color={colors.primary} />
        </Box>
      </Box>
    </Card>
  );

  const Exp = () => (
    <>
      <StatusBar barStyle="light-content" />
      <StretchyScrollView
        backgroundColor="white"
        image={require('./../../../assets/images/u1.jpg')}
        imageHeight={300}
        foreground={
          <Box flex={1}>
            <Box position="absolute" top={50} left={16}>
              <IconButton icon="arrow-back" onPress={navigation.goBack} />
            </Box>
          </Box>
        }
        onScroll={(position, reachedToTheBottomOfHeader) =>
          console.log(position, reachedToTheBottomOfHeader)
        }>
        <Box
          flex={1}
          backgroundColor="mainBackground"
          borderTopRightRadius={40}
          borderTopLeftRadius={40}
          style={{marginTop: -40}}>
          <Box flex={1}>
            <Box flex={1} mx="m" mt="l">
              <Box
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center">
                <Box>
                  <Text variant="header">Daniel Sebastian</Text>
                  <Text variant="body_sm_bold">
                    daniel.sebastian@domain.com
                  </Text>
                </Box>
                <IconButton icon="pencil" iconFamily="MaterialCommunityIcons" />
              </Box>
              <Box
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
                mt="l">
                <Text variant="body_bold">Favorite</Text>
                <CustomButton
                  label="See all"
                  buttonType="textOnly"
                  buttonSize="small"
                  color="primary"
                  onPress={() => {}}
                />
              </Box>

              <Box mt="m">
                <Item />
                <Item />
                <Item />
              </Box>
            </Box>
          </Box>
          <Box flex={1} mx="m">
            <CustomButton label="Sign out" onPress={() => {}} />
          </Box>
        </Box>
      </StretchyScrollView>
    </>
  );
  const Exp2 = () => (
    <>
      <StatusBar barStyle="light-content" />
      <Box>
        <Image
          source={require('./../../../assets/images/u1.jpg')}
          style={{
            width: dimensions.width,
            height: verticalScale(dimensions.height / 3),
          }}
        />
        <Box
          position="absolute"
          top={Platform.OS === 'android' ? 16 : 54}
          left={16}>
          <IconButton icon="close" onPress={navigation.goBack} />
        </Box>
      </Box>

      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}>
        <ScrollView style={{flex: 1}}>
          <Box flex={1} mx="m" mt="l">
            <Box
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center">
              <Box>
                <Text variant="header">Daniel Sebastian</Text>
                <Text variant="body_sm_bold">daniel.sebastian@domain.com</Text>
              </Box>
              <IconButton icon="pencil" iconFamily="MaterialCommunityIcons" />
            </Box>
            <Box
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              mt="l">
              <Text variant="body_bold">Favorites</Text>
              <CustomButton
                label="See all"
                buttonType="textOnly"
                buttonSize="small"
                color="primary"
                onPress={() => {}}
              />
            </Box>
            <Box mt="m">
              <Item />
              <Item />
            </Box>
          </Box>
        </ScrollView>

        <Box mx="l" mb="l">
          <CustomButton label="Sign out" onPress={() => {}} />
        </Box>
      </BottomSheet>
    </>
  );

  return (
    <Box flex={1}>
      <StatusBar barStyle="light-content" />
      <Box>
        <Image
          source={require('./../../../assets/images/u1.jpg')}
          style={{
            width: dimensions.width,
            height: verticalScale(dimensions.height / 3.5),
          }}
        />
        <Box
          position="absolute"
          top={Platform.OS === 'android' ? 16 : 54}
          left={16}>
          <IconButton icon="close" onPress={navigation.goBack} />
        </Box>
      </Box>

      <SafeAreaView style={{flex: 1}}>
        <Box
          backgroundColor="mainBackground"
          flex={1}
          borderTopLeftRadius={20}
          borderTopRightRadius={20}
          style={{marginTop: -40}}>
          <Box flex={1} mx="m" mt="l">
            <Box
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center">
              <Box>
                <Text variant="header">Daniel Sebastian</Text>
                <Text variant="body_sm_bold">daniel.sebastian@domain.com</Text>
              </Box>
              <IconButton icon="pencil" iconFamily="MaterialCommunityIcons" />
            </Box>
            <Box
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              mt="l">
              <Text variant="body_bold">Favorites</Text>
              <CustomButton
                label="See all"
                buttonType="textOnly"
                buttonSize="small"
                color="primary"
                onPress={() => {}}
              />
            </Box>
            <ScrollView>
              <Box mt="m">
                <Item />
                <Item />
              </Box>
            </ScrollView>
          </Box>
        </Box>

        <Box mx="l" mb="l">
          <CustomButton label="Sign out" onPress={() => {}} />
        </Box>
      </SafeAreaView>
    </Box>
  );
};

export default Profile;
