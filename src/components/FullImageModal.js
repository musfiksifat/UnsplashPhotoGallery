import React, {useState} from 'react';
import {IconButton, FAB} from 'react-native-paper';
import {StyleSheet, View, TouchableOpacity, Modal} from 'react-native';
import FastImage from 'react-native-fast-image';
import {
  checkPermission,
  shareImageDetails,
} from '../functions/FullImageFunctions.js';

const FullImageModal = props => {
  const [isWaiting, setWaiting] = useState(false);
  return (
    <Modal
      transparent={true}
      animationType={'fade'}
      visible={props.modalVisibleStatus}
      onRequestClose={() => {
        props.showModalFunction(!props.modalVisibleStatus, '');
      }}>
      <View style={styles.modelStyle}>
        <View style={styles.topIconBlock}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              props.showModalFunction(!props.modalVisibleStatus, '');
            }}>
            <IconButton icon="close-octagon" size={31} color="grey" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={async () => {
              await checkPermission(props.fileURL);
            }}>
            <IconButton icon="download" size={33} color="gray" />
          </TouchableOpacity>
        </View>

        <FastImage
          style={styles.fullImageStyle}
          source={{uri: props.imageuri}}
          resizeMode={FastImage.resizeMode.contain}
        />

        <FAB
          style={styles.shareButtonStyle}
          disabled={isWaiting}
          loading={isWaiting}
          icon="share-outline"
          onPress={async () => {
            setWaiting(true);
            await shareImageDetails(props.fileURL);
            setWaiting(false);
          }}
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
