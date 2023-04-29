import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, Modal, ScrollView} from 'react-native';
import Box from '../../../../components/View/CustomView';
import {scale, verticalScale} from 'react-native-size-matters';
import {dimensions} from '../../../../utils/constants';
import {useReduxDispatch, useReduxSelector} from '../../../../store';
import {getStoreGallery} from '../redux/actions';
import {ActivityIndicator} from 'react-native-paper';
import Image from '../../../../components/Image/Image';
import {RefreshControl} from 'react-native';

const GalleryImage = ({image = ''}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

  return (
    <>
      <TouchableOpacity onPress={showModal}>
        <Box mb="s_m">
          <Image
            uri={image}
            imageStyles={{
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

  const fetchAPI = () => {
    dispatch(getStoreGallery());
  };
  useEffect(() => {
    if (status === 'idle') {
      fetchAPI();
    }
  }, []);

  return (
    <Box flex={1}>
      {status === 'loading' ? (
        <Box flex={1} justifyContent="center" alignItems="center">
          <ActivityIndicator />
        </Box>
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={status === 'loading'}
              onRefresh={fetchAPI}
            />
          }>
          <Box
            flex={1}
            mx="xs"
            mt="l"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-evenly"
            flexWrap="wrap">
            {data?.data?.map((item, index) => (
              <GalleryImage key={index} image={item} />
            ))}
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
