import {PermissionsAndroid, Platform} from 'react-native';

import Share from 'react-native-share';
import RNFetchBlob from 'rn-fetch-blob';

const shareImageDetails = async imagesPath => {
  let fs = RNFetchBlob.fs;
  let imagePath = imagesPath;
  await RNFetchBlob.config({
    fileCache: true,
  })
    .fetch('GET', imagePath)
    .then(resp => {
      imagePath = resp.path();
      return resp.readFile('base64');
    })
    .then(base64Data => {
      var imageUrl = 'data:image/png;base64,' + base64Data;
      let shareImage = {
        title: '123', //string
        message: 'Description ' + 'details' + ' http://beparr.com/', //string
        url: imageUrl,
      };
      Share.open(shareImage)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          err && console.log(err);
        });
      // remove the file from storage
      return fs.unlink(imagePath);
    });
};

const checkPermission = async url => {
  if (Platform.OS === 'ios') {
    downloadImage(url);
  } else {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission Required',
          message: 'App needs access to your storage to download Photos',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // Once user grant the permission start downloading
        console.log('Storage Permission Granted.');
        downloadImage(url);
      } else {
        alert('Storage Permission Not Granted');
      }
    } catch (err) {
      console.warn(err);
    }
  }
};

const downloadImage = url => {
  let date = new Date();
  let image_URL = url;
  let ext = '.jpeg';
  const {config, fs} = RNFetchBlob;
  let PictureDir = fs.dirs.PictureDir;
  let options = {
    fileCache: true,
    addAndroidDownloads: {
      // Related to the Android only
      useDownloadManager: true,
      notification: true,
      path:
        PictureDir +
        '/image_' +
        Math.floor(Math.random() * 100) +
        Math.floor(date.getTime() + date.getSeconds() / 2) +
        ext,
      description: 'Image',
    },
  };
  config(options)
    .fetch('GET', image_URL)
    .then(res => {
      // Showing alert after successful downloading
      console.log('res -> ', JSON.stringify(res));
      alert('Image Downloaded Successfully.');
    });
};
// ends download part

export {downloadImage, checkPermission, shareImageDetails};
