import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Modal,
  Image,
  ScrollView,
} from 'react-native';
import Box from '../../../../components/View/CustomView';
import {scale, verticalScale} from 'react-native-size-matters';
import {dimensions} from '../../../../utils/constants';
import {useReduxDispatch, useReduxSelector} from '../../../../store';
import {getStoreGallery} from '../redux/actions';
import {ActivityIndicator} from 'react-native-paper';

const GalleryImage = ({
  image = require(`./../../../../assets/images/burgers/1.jpg`),
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

  return (
    <>
      <TouchableOpacity onPress={showModal}>
        <Box mb="s_m">
          <Image
            source={image}
            style={{
              width: scale(110),
              height: verticalScale(90),
              borderRadius: 8,
            }}
          />
        </Box>
      </TouchableOpacity>

      <Modal
        transparent
        animationType="none"
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <TouchableOpacity style={styles.centeredView} onPress={hideModal}>
          <TouchableOpacity
            style={styles.modalView}
            onPress={hideModal}
            activeOpacity={1}>
            <Image
              source={image}
              style={{
                width: scale(dimensions.width - 40),
                height: verticalScale(dimensions.height / 3),
                resizeMode: 'contain',
              }}
            />
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

const Galleries = () => {
  const dispatch = useReduxDispatch();
  const {data, status} = useReduxSelector(store => store.store.gallery);

  useEffect(() => {
    // if (status === 'idle') {
    dispatch(getStoreGallery());
    // }

    return () => {};
  }, []);

  return (
    <Box flex={1}>
      {status === 'loading' ? (
        <Box flex={1} justifyContent="center" alignItems="center">
          <ActivityIndicator />
        </Box>
      ) : (
        <ScrollView>
          <Box
            flex={1}
            mx="xs"
            mt="l"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-evenly"
            flexWrap="wrap">
            {data?.data?.map((item, index) => (
              <GalleryImage
                key={index}
                image={{
                  uri: item,
                }}
              />
            ))}
            {/* <GalleryImage />
            <GalleryImage
              image={require(`./../../../../assets/images/burgers/2.jpg`)}
            />
            <GalleryImage
              image={require(`./../../../../assets/images/burgers/3.jpg`)}
            />
            <GalleryImage />
            <GalleryImage
              image={require(`./../../../../assets/images/burgers/2.jpg`)}
            />
            <GalleryImage /> */}
          </Box>
        </ScrollView>
      )}
    </Box>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalView: {
    alignItems: 'center',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
export default Galleries;
