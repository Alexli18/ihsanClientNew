import React from 'react';
import { View,  ScrollView, StyleSheet, Image, Text  } from 'react-native';
import Swiper from 'react-native-swiper';
import styled from 'styled-components/native';

const SwipeItem = styled.View`
  flex: 1;
  background-color: #dce8e1;
`;

const SwipeImage = styled.Image`
  width: 100%;
  height: 240px;
`;

const FakeSwiper = styled.View`
  height: 240px;
  background-color: #dce8e1;
`;
const SwipeDot = styled.View`
  width: 10px;
  height: 10px;
  background-color: ${(props) => (props.active ? '#fff' : '#777')};
  border-radius: 5px;
  margin: 3px;
`;

class ServiceSwiper extends React.Component {
    constructor(props){
        super(props);
    }


    render() { 
        return(
            <Swiper
                style={{height: 240}}
                dot={<SwipeDot />}
                activeDot={<SwipeDot active />}
                paginationStyle={{top: 16, right: 16, bottom: null, left: null}}
                autoplay
                autoplayTimeout={4}
            >
                <SwipeItem>
                    <SwipeImage source={{uri: require('../../assets/nidalshop.jpg')}} resizeMode="cover" />
                </SwipeItem>
                <SwipeItem>
                    <SwipeImage source={{uri: require('../../assets/nidalshop1.jpeg')}} resizeMode="cover" />
                </SwipeItem>
                <SwipeItem>
                    <SwipeImage source={{uri: require('../../assets/nidalshop2.jpeg')}} resizeMode="cover" />
                </SwipeItem>
                <SwipeItem>
                    <SwipeImage source={{uri: require('../../assets/nidalshop3.jpeg')}} resizeMode="cover" />
                </SwipeItem>
                <SwipeItem>
                    <SwipeImage source={{uri: require('../../assets/nidalshop4.jpeg')}} resizeMode="cover" />
                </SwipeItem>
                <SwipeItem>
                    <SwipeImage source={{uri: require('../../assets/nidalshop5.jpeg')}} resizeMode="cover" />
                </SwipeItem>
            </Swiper>
        )
    }
}
 
export default ServiceSwiper;
