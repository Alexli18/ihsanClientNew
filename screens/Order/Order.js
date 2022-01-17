import React from 'react';
import { Text, Card, Button, Icon } from 'react-native-elements';
import { View,  ScrollView, StyleSheet, Image, SafeAreaView  } from 'react-native';
import DateTimePicker from '../../components/DateTimePicker/DateTimePicker';
import BottomBar from '../../components/BottomTabBar/BottomBar';



import ModalDateTimePicker from '../../components/ModalDateTimePicker/ModalDateTimePicker';


export default class Order extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            avatar: this.props.route.params.avatar,
            name: this.props.route.params.name,
            barberId: this.props.route.params.service.barberId,
            serviceName: this.props.route.params.service.serviceName,
            selectedDate: '',
            selectedHours: []
        }
    }
    shouldComponentUpdate(nextProps, nextState){
        if(nextState !== this.state){
            return true
        }
        return false
    }

    render(){
        console.log(this.state)
        let barber = this.state;
        return(
            <SafeAreaView style={{backgroundColor: "#dce8e1", flex: 1}}>
            <ScrollView>
                <ModalDateTimePicker/>
                {/* <DateTimePicker barber={barber}/> */}
            </ScrollView>
            <BottomBar navigation = {this.props.navigation}/>
            </SafeAreaView>
        )
    }
}