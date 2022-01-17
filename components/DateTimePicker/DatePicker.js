import React from 'react';
import {Calendar} from 'react-native-calendars';
import { View,  ScrollView, StyleSheet, Image, Text  } from 'react-native';
import { getOrdersByBarberId, getUserOrdersData } from '../../Api/api';
import { formatDate } from './utils';


export default class DatePicker extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            markedDates: this.props.markedDates,
            barberId: this.props.barberId,
            selectedDate: []
        }
    }

    updateParentState(data){
        this.props.func(data);
        console.log(this.props)
    }

    shouldComponentUpdate(nextProps, nextState){
        if(nextState.markedDates !== this.state.markedDates || nextProps !== this.props){
            return true
        }
        if(Object.keys(nextState.markedDates).length !== Object.keys(this.state.markedDates).length){
            return true
        }
        if(nextState !== this.state){
            return true
        }
        return false
    }

    

    

    


    renderHandler(){
        let {markedDates} = this.state;
        console.log(this.state);
        console.log(this.props);

            return(
                <Calendar
                markingType={'multi-dot'}
                markedDates = {markedDates}
                minDate={new Date().toISOString().split('T')[0]}
                onDayPress={(day)=>{
                    this.updateParentState(day)
                }}
                >
                </Calendar>
            )
    }

    render(){
        console.log(this.state);
        console.log(this.props);
        return(
            <View>
                {
                    this.renderHandler()
                }
            </View>
        )
    }
 




}