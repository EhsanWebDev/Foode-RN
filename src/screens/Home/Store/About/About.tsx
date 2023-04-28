import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import Box from '../../../../components/View/CustomView';
import {verticalScale} from 'react-native-size-matters';
import {Image} from 'react-native';
import Text from '../../../../components/Text/CustomText';
import Card from '../../../../components/Card/Card';

const About = () => {
  return (
    <Box mx="m">
      <Card height={verticalScale(100)} variant="primary" marginVertical="l">
        <Box p="s_m">
          <Box flexDirection="row" alignItems="center">
            <Image
              source={require('../../../../assets/images/logo.png')}
              style={{
                width: 32,
                height: 32,
              }}
            />
            <Box ml="s">
              <Text variant="body_sm_bold">Lorem, ipsum</Text>
              <Text variant="body_xs">2 Months ago</Text>
            </Box>
          </Box>
          <Text variant="body_sm_bold" mt="s_m">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Culpa
            reiciendis corrupti commodi?
          </Text>
        </Box>
      </Card>
      <Card height={verticalScale(100)} variant="primary">
        <Box p="s_m">
          <Box flexDirection="row" alignItems="center">
            <Image
              source={require('../../../../assets/images/logo.png')}
              style={{
                width: 32,
                height: 32,
              }}
            />
            <Box ml="s">
              <Text variant="body_sm_bold">Lorem, ipsum</Text>
              <Text variant="body_xs">3 Months ago</Text>
            </Box>
          </Box>
          <Text variant="body_sm_bold" mt="s_m">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Culpa
            reiciendis corrupti commodi?
          </Text>
        </Box>
      </Card>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {},
});
export default About;
