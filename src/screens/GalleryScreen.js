import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ToastAndroid,
} from 'react-native';
//import FastImage
import FastImage from 'react-native-fast-image';

import {fetchNewPhotos} from './../requests/fetchNewPhotos';

const GalleryScreen = () => {
  const [dataSource, setDataSource] = useState([]);
  const [pageNo, setPageNo] = useState(1);

  useEffect(() => {
    fetchNewPhotos(1).then(data => {
      setPageNo(2);
      const _length = data.length;
      let items = [];
      let iter = 0;
      for (var i = iter; i < _length + iter; i++) {
        let obj = {
          id: i,
          src: data[i].urls.small,
          download: data[i].links.download,
          likes: data[i].likes,
        };
        items.push(obj);
      }
      console.log('first');
      console.log(items);
      setDataSource(items);
    });
  }, []);

  const fetchMore = async => {
    fetchNewPhotos(pageNo).then(data => {
      setPageNo(pageNo + 1);
      console.log('page increment');
      console.log(data);
      const _length = data.length;
      console.log(_length);

      let items = [];

      for (var i = 0; i < _length; i++) {
        let obj = {
          id: i,
          src: data[i].urls.small,
          download: data[i].links.download,
          likes: data[i].likes,
        };
        items.push(obj);
      }
      console.log('repeat');
      console.log(items);
      setDataSource([...dataSource, ...items]);
      //   setDataSource(items);
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.titleStyle}>Unsplash Photo Gallery</Text>
        <FlatList
          data={dataSource}
          onEndReached={fetchMore}
          renderItem={({item}) => (
            <View style={styles.imageContainerStyle}>
              <TouchableOpacity
                key={item.id}
                style={{flex: 1}}
                onPress={() => {}}>
                <FastImage
                  style={styles.imageStyle}
                  source={{
                    uri: item.src,
                  }}
                />
              </TouchableOpacity>
            </View>
          )}
          numColumns={3}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </SafeAreaView>
  );
};
export default GalleryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  titleStyle: {
    padding: 16,
    fontSize: 20,
    color: 'white',
    backgroundColor: 'teal',
  },
  imageContainerStyle: {
    flex: 1,
    flexDirection: 'column',
    margin: 1,
  },
  imageStyle: {
    height: 120,
    width: '100%',
  },
});
