import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, SafeAreaView, FlatList} from 'react-native';
import Box from '../../../../components/View/CustomView';
import TabBar from '../../TabBar';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useAppTheme} from '../../../../utils/hooks';
import Text from '../../../../components/Text/CustomText';
import {useReduxSelector} from '../../../../store';
import MenuItem from './MenuItem/MenuItem';
import MenuLoading from './Loader/MenuLoading';
const Tab = createMaterialTopTabNavigator();

function filterDataBySectionTitle(data, sectionTitle) {
  return (data || [])?.filter(section => section?.title === sectionTitle);
}

const SomeV = ({navigation, sectionTitle}) => {
  const {data: storeData} = useReduxSelector(store => store.store.menu);
  const {transformedData} = storeData || {};

  const [loading, setLoading] = useState(true);

  const filteredSections = filterDataBySectionTitle(
    transformedData,
    sectionTitle,
  );

  const {data: dataToRender} = filteredSections?.[0] || {};

  const onItemPress = (productId: string) => {
    navigation.navigate('ProductDetails', {productId});
  };

  const renderItem = useCallback(({item}) => {
    return (
      <MenuItem
        item={item}
        onPress={() => onItemPress(item?.id ?? '')}
        onPressAdd={() => onItemPress(item?.id ?? '')}
      />
    );
  }, []);

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 700);
    }
  }, [loading]);

  if (loading) {
    return <MenuLoading />;
  }
  return (
    <Box borderTopColor={'border'} borderTopWidth={1} mt="size8">
      <Box mt="m" mx="s">
        <Text ml="s" mb="s" variant="body_bold">{`${sectionTitle} (${
          (dataToRender || [])?.length
        })`}</Text>
        <FlatList
          data={dataToRender}
          renderItem={renderItem}
          keyExtractor={(item, _) => item?.id?.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 80}}
        />
      </Box>
    </Box>
  );
};
const TestV = ({initialRouteName = 'Order', data = []}) => {
  const {colors} = useAppTheme();
  return (
    <Box flex={1}>
      <Tab.Navigator
        initialRouteName={initialRouteName}
        tabBar={props => <TabBar {...props} />}
        sceneContainerStyle={{
          backgroundColor: colors.mainBackground,
        }}>
        {data.map(item => {
          return (
            <Tab.Screen name={item.title} key={item?.title}>
              {props => <SomeV sectionTitle={item?.title} {...props} />}
            </Tab.Screen>
          );
        })}
      </Tab.Navigator>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {},
});
export default TestV;
