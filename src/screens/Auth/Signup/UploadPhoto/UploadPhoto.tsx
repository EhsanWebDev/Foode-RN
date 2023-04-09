import React from 'react';
import Header from '../../../../components/AppComponents/Header/Header';
import {UploadPhotoScreenNavigationProp} from '../../../../navigation/types';
import ScreenContainer from '../../../../components/AppComponents/Container/ScreenContainer';
import Text from '../../../../components/Text/CustomText';
import Card from '../../../../components/Card/Card';
import IconButton from '../../../../components/Button/IconButton/IconButton';
import ImagePicker from 'react-native-image-crop-picker';

const UploadPhoto = ({navigation}: UploadPhotoScreenNavigationProp) => {
  return (
    <ScreenContainer>
      <Header label="Upload your photo" onBackPress={navigation.goBack} />
      <Text marginVertical="l" variant="SM">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda
        accusantium fugit esse autem, provident sed.
      </Text>

      <Card
        variant="primary"
        justifyContent="center"
        alignItems="center"
        paddingVertical="m">
        <IconButton
          icon="camera"
          size="big"
          roundness="full"
          onPress={() => {
            ImagePicker.openCamera({
              width: 300,
              height: 400,
              cropping: true,
            }).then(image => {
              console.log(image);
            });
          }}
        />
        <Text fontWeight="bold" variant="SM" mt="s">
          Take photo
        </Text>
      </Card>
      <Card
        variant="primary"
        justifyContent="center"
        alignItems="center"
        paddingVertical="m"
        mt="m">
        <IconButton
          icon="folder"
          size="big"
          roundness="full"
          onPress={() => {
            ImagePicker.openPicker({
              width: 300,
              height: 400,
              cropping: true,
            }).then(image => {
              console.log(image);
            });
          }}
        />
        <Text fontWeight="bold" variant="SM" mt="s">
          From gallery
        </Text>
      </Card>
    </ScreenContainer>
  );
};

export default UploadPhoto;
