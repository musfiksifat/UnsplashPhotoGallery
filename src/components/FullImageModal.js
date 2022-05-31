import React, {useState} from 'react';
import {IconButton, FAB} from 'react-native-paper';
import {StyleSheet, View, TouchableOpacity, Modal} from 'react-native';
import FastImage from 'react-native-fast-image';

const FullImageModal = props => {
  return (
    <Modal
      transparent={true}
      animationType={'fade'}
      visible={props.modalVisibleStatus}
      onRequestClose={() => {
        props.showModalFunction(!props.modalVisibleStatus, '');
      }}>
      <View style={styles.modelStyle}>
        <FastImage
          style={styles.fullImageStyle}
          source={{uri: props.imageuri}}
          resizeMode={FastImage.resizeMode.contain}
        />
      </View>
    </Modal>
  );
};
export default FullImageModal;

const styles = StyleSheet.create({
  fullImageStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '98%',
    resizeMode: 'contain',
  },
  topIconBlock: {
    position: 'absolute',
    top: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '98%',
  },
  modelStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  downloadButtonStyle: {
    width: 25,
    height: 25,
    top: 250,
    right: 20,
    position: 'absolute',
  },
  shareButtonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    bottom: 20,
    right: 20,
    position: 'absolute',
  },
});
