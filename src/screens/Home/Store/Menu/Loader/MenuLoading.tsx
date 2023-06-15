import React from 'react';
import {View, FlatList, SafeAreaView, StyleSheet} from 'react-native';
import ContentLoader, {Rect, Circle} from 'react-content-loader/native';

const ASPECT_RATIO = 300 / 70;

const MyLoader = () => (
  <ContentLoader
    height="100%"
    width="100%"
    viewBox="0 0 380 70"
    speed={2}
    foregroundColor="#c2c2c2">
    <Rect x="5" y="12" rx="3" ry="3" width="139" height="10" />
    <Rect x="25" y="32" rx="3" ry="3" width="68" height="10" />
    <Rect x="0" y="88" rx="3" ry="3" width="178" height="6" />
    <Rect x="30" y="54" rx="0" ry="0" width="45" height="10" />
    <Rect x="42" y="59" rx="0" ry="0" width="6" height="0" />
    <Rect x="280" y="26" rx="0" ry="0" width="60" height="60" />
  </ContentLoader>
);

const Header = () => (
  <ContentLoader
    speed={2}
    width={350}
    height={5}
    height="100%"
    width="100%"
    viewBox="0 0 350 5"
    foregroundColor="#c2c2c2">
    <Rect x="3" y="-5" rx="3" ry="3" width="143" height="17" />
    <Rect x="251" y="1" rx="3" ry="3" width="91" height="9" />
    <Rect x="180" y="74" rx="0" ry="0" width="1" height="8" />
  </ContentLoader>
);
const MainLoader = () => (
  <SafeAreaView style={styles.container}>
    <View style={styles.full}>
      <MyLoader />
    </View>
    <View style={styles.full}>
      <MyLoader />
    </View>
  </SafeAreaView>
);

const MenuLoading = ({}) => {
  return (
    <FlatList data={['', '']} renderItem={MainLoader} scrollEnabled={false} />
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    marginTop: 20,
  },

  full: {
    aspectRatio: ASPECT_RATIO,
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 8,
    marginTop: 20,
    paddingHorizontal: 12,
  },
});
export default MenuLoading;
