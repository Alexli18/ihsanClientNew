import React from 'react';
// import { Card } from 'react-native-elements';
import styled from 'styled-components/native';

import { BASE_URL } from '../../config/config';

import { View,  ScrollView, StyleSheet, Image, SafeAreaView, TouchableOpacity  } from 'react-native';


const Card = styled.TouchableOpacity`
  background-color: #fff;
  margin-bottom: 40px;
  border-radius: 20px;
  padding: 15px;
  flex-direction: row;
 
`;

const Avatar = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 20px;
  
`;

const Infos = styled.View`
  margin-left: 20px;
  justify-content: space-between;
  align-items: center;
  width: 50%
`;

const UserName = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: #222;
`;

const SeeProfile = styled.View`
  width: 100%;
  height: 45px;
  border-radius: 10px;
  background-color: #B8E2D6;
  justify-content: center;
  align-items: center;
`;

const SeeProfileText = styled.Text`
  font-size: 15px;
  color: #1D592Eed;
  font-weight: bold;
  align-items: center;
`;

const style = StyleSheet.create({
    barberCard: {
        backgroundColor: '#fff',
        marginBottom: 40,
        borderRadius: 20,
        padding: 15,
        flexDirection: 'row'
    }
})




export default class Barber extends React.Component {
    constructor(props, {navigation}){
        super(props);
        this.state = {
            name: props.barber.name,
            avatar: props.barber.avatar,
            id: props.barber._id
        }
    }

    handleClick(){
        this.props.func(this.state);
        // console.log(this.props)
    }
    


    render(){
        let barber = this.state;
        
        return(
            <Card onPress={this.handleClick.bind(this)}>
                <Avatar source={{uri: BASE_URL+barber.avatar}} />
                <Infos>
                    <UserName>{barber.name}</UserName>   
                        <SeeProfile>
                        <SeeProfileText>לזימון תור</SeeProfileText>
                    </SeeProfile>
                </Infos>
            </Card>

        )
    }
}
