import React from 'react';
import {View, FlatList, SafeAreaView, StyleSheet} from 'react-native';
import ContentLoader, {Rect, Circle} from 'react-content-loader/native';

const ASPECT_RATIO = 300 / 300;

const MyLoader = () => (
  <ContentLoader
    height="100%"
    width="100%"
    viewBox="0 0 300 300"
    speed={2}
    foregroundColor="#c2c2c2">
    <Rect x="42" y="59" rx="0" ry="0" width="6" height="0" />
    <Circle cx="17" cy="22" r="18" />
    <Rect x="45" y="10" rx="0" ry="0" width="107" height="6" />
    <Rect x="46" y="24" rx="0" ry="0" width="88" height="5" />
    <Rect x="6" y="61" rx="0" ry="0" width="213" height="16" />
    <Rect x="6" y="84" rx="0" ry="0" width="181" height="15" />
    <Rect x="4" y="118" rx="0" ry="0" width="280" height="121" />
    <Rect x="10" y="264" rx="0" ry="0" width="143" height="12" />
    <Rect x="253" y="264" rx="0" ry="0" width="29" height="23" />
    <Rect x="11" y="281" rx="0" ry="0" width="62" height="11" />
  </ContentLoader>
);
const MainLoader = () => (
  <SafeAreaView style={styles.container}>
    {/* <View style={styles.full}>
      <MyLoader />
    </View> */}
    <View style={styles.full}>
      <MyLoader />
    </View>
  </SafeAreaView>
);

const HomeLoading = ({}) => {
  return <FlatList data={['']} renderItem={MainLoader} scrollEnabled={false} />;
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    // marginTop: 20,
  },

  full: {
    aspectRatio: ASPECT_RATIO,
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
});
export default HomeLoading;
