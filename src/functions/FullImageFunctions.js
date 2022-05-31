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

export {shareImageDetails};
