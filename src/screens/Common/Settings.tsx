import React from 'react';

import ScreenContainer from '../../components/AppComponents/Container/ScreenContainer';
import Header from '../../components/AppComponents/Header/Header';
import Box from '../../components/View/CustomView';

const Settings = ({navigation}) => {
  return (
    <ScreenContainer>
      <Header label="Settings" onBackPress={navigation.goBack} />
      <Box></Box>
    </ScreenContainer>
  );
};

export default Settings;
