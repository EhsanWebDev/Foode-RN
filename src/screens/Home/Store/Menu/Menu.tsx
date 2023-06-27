import {useNavigation} from '@react-navigation/native';
import React, {useRef} from 'react';
import {SectionList, StatusBar} from 'react-native';

import Box from '../../../../components/View/CustomView';
import Text from '../../../../components/Text/CustomText';

import MenuItem from './MenuItem/MenuItem';
import ScreenContainer from '../../../../components/AppComponents/Container/ScreenContainer';
import Header from '../../../../components/AppComponents/Header/Header';

const RenderNoContent = ({section}) => {
  if (section.data.length == 0) {
    return (
      <Text ml="s_m" variant={'body_xs'}>
        No items
      </Text>
    );
  }
  return null;
};
const Menu = ({route}) => {
  const nav = useNavigation();
  const listRef = useRef<SectionList>();

  const {params} = route || {};
  const {data, sectionIndex = 0} = params || {};
  // const dispatch = useReduxDispatch();

  return (
    <ScreenContainer>
      <StatusBar barStyle="default" />
      <Header label="Menu" onBackPress={nav.goBack} />

      <Box flex={1} mx="s">
        <Box flex={1}>
          <SectionList
            ref={listRef}
            onContentSizeChange={() => {
              listRef?.current?.scrollToLocation({
                sectionIndex,
                itemIndex: 0,
              });
            }}
            onScrollToIndexFailed={() => {}}
            stickySectionHeadersEnabled={false}
            showsVerticalScrollIndicator={false}
            renderSectionFooter={RenderNoContent}
            // refreshControl={
            //   <RefreshControl
            //     refreshing={status === 'loading'}
            //     onRefresh={fetchAPI}
            //   />
            // }
            sections={data ?? []}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({item}) => {
              return (
                <MenuItem
                  item={item}
                  onPress={() =>
                    nav.navigate('ProductDetails', {productId: item?.id})
                  }
                  onPressAdd={() => {
                    nav.navigate('ProductDetails', {productId: item?.id});
                  }}
                />
              );
            }}
            renderSectionHeader={({section: {title}}) => {
              return (
                <Box alignSelf="flex-start">
                  <Text
                    variant="body_bold"
                    marginTop="l"
                    mb="s"
                    textTransform="uppercase"
                    letterSpacing={2}>
                    {title}
                  </Text>
                </Box>
              );
            }}
            ListEmptyComponent={
              <Box flex={1} justifyContent="center" alignItems="center" mt="xl">
                <Text variant="body_sm" ml="s">
                  No Menu Data
                </Text>
              </Box>
            }
          />
        </Box>
      </Box>
    </ScreenContainer>
  );
};

export default Menu;
