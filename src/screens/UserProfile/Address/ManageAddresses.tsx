import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import ScreenContainer from '../../../components/AppComponents/Container/ScreenContainer';
import Box from '../../../components/View/CustomView';
import Text from '../../../components/Text/CustomText';
import Header from '../../../components/AppComponents/Header/Header';

const ManageAddresses = ({navigation}) => {
  return (
    <ScreenContainer>
      <Header label="Add address" onBackPress={navigation.goBack} />
      <Box>
        <Text>Address</Text>
      </Box>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {},
});
export default ManageAddresses;
