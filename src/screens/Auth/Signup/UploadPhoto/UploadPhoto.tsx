import React, {useState} from 'react';
import Header from '../../../../components/AppComponents/Header/Header';
import {UploadPhotoScreenNavigationProp} from '../../../../navigation/types';
import ScreenContainer from '../../../../components/AppComponents/Container/ScreenContainer';
import Text from '../../../../components/Text/CustomText';
import Card from '../../../../components/Card/Card';
import IconButton from '../../../../components/Button/IconButton/IconButton';
import ImagePicker from 'react-native-image-crop-picker';
import CustomButton from '../../../../components/Button/CustomButton';
import Box from '../../../../components/View/CustomView';
import {Image, Platform} from 'react-native';

const UploadPhoto = ({navigation}: UploadPhotoScreenNavigationProp) => {
  const isAndroid = Platform.OS === 'android';
  const [userPhoto, setUserPhoto] = useState(null);
  const handleCameraImage = async () => {
    try {
      const image = await ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
      });
      const {sourceURL, path} = image || {};
      setUserPhoto(isAndroid ? path : sourceURL);
    } catch (error) {
      console.log({error});
    }
  };
  const handleGalleryImage = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      });
      const {sourceURL, path} = image || {};
      console.log(image);
      setUserPhoto(isAndroid ? path : sourceURL);
    } catch (error) {
      console.log({error});
    }
  };

  return (
    <ScreenContainer>
      <Header label="Upload your photo" onBackPress={navigation.goBack} />
      <Text marginVertical="l" variant="SM">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda
        accusantium fugit esse autem, provident sed.
      </Text>
      {userPhoto ? (
        <Box alignItems="center" mt="l" justifyContent="center">
          <Box>
            <Image
              source={{uri: userPhoto}}
              style={{width: 128, height: 128, borderRadius: 64}}
            />

            <Box position="absolute" right={-10} bottom={-10}>
              <IconButton
                icon="pencil"
                iconFamily="MaterialCommunityIcons"
                onPress={() => setUserPhoto(null)}
              />
            </Box>
          </Box>
        </Box>
      ) : (
        <>
          <Card
            variant="primary"
            justifyContent="center"
            alignItems="center"
            paddingVertical="m">
            <IconButton
              icon="camera"
              size="big"
              roundness="full"
              onPress={handleCameraImage}
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
              onPress={handleGalleryImage}
            />
            <Text fontWeight="bold" variant="SM" mt="s">
              From gallery
            </Text>
          </Card>
        </>
      )}

      <Box flex={1} justifyContent="flex-end" mb="m">
        <CustomButton disabled={!userPhoto} label="Next" onPress={() => {}} />
      </Box>
    </ScreenContainer>
  );
};

export default UploadPhoto;
