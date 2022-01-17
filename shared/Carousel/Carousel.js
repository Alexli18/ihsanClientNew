import React, { Component } from 'react';
// import NidalShop from '../../assets/nidalshop.jpg';
// import NidalShop1 from '../../assets/nidalshop1.jpg';

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ImageBackground
} from 'react-native';
import Carousel from 'react-native-anchor-carousel';

const { width } = Dimensions.get('window');

const data = [
//   { NidalShop },
//   { NidalShop1: '../../assets/nidalshop1.jpg' },
// //   { uri: '../../assets/nidalshop2.jpg' },
// //   { uri: '../../assets/nidalshop3.jpg' }
];

export default class CarouselComponent extends React.Component{
    renderItem = ({ item, index }) => {
        // const { uri } = item;
        // const ImageBackground = uri
        return (
          <TouchableOpacity
            // style={[styles.item]}
            onPress={() => {
              this.numberCarousel.scrollToIndex(index);
            }}
            >
            <ImageBackground source={item}>

            </ImageBackground>
          </TouchableOpacity>
        );
      };
    
      render() {
        return (
          <Carousel
            style={styles.carousel}
            data={data}
            renderItem={this.renderItem}
            itemWidth={200}
            containerWidth={width - 10}
            ref={(c) => {
              this.numberCarousel = c;
            }}
          />
        );
      }
    }
    
    const styles = StyleSheet.create({ 
      carousel: {
        flex: 1,
        backgroundColor: '#dce8e1'
      },
      item: {
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        height: 200,
        borderColor: 'red'
      },
      text: {
        fontSize: 100,
        fontWeight: 'bold'
      }
    });
    