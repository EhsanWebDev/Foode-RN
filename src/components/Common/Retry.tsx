import React from 'react';
import {StyleSheet} from 'react-native';
// import CustomText from '../CustomText/CustomText';
// import CustomButton from '../CustomButton/CustomButton';
// import {appCommonSizes, dropShadow} from '../../../helper/globalStyles';
// import {Card} from 'react-native-paper';
import CustomButton from '../Button/CustomButton';
import Text from '../Text/CustomText';
import Card from '../Card/Card';

const Retry = ({title = 'Something went wrong.', onPress, isLoading}) => {
  return (
    <Card variant="primary" style={[styles.container]}>
      <Text variant="body_sm" mb="s">
        {title}
      </Text>
      <CustomButton
        label="Try again"
        onPress={onPress}
        loading={isLoading}
        buttonType="outlined"
        buttonSize="small"
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    borderRadius: 6,
    marginVertical: 12,
  },
});
export default Retry;
