import React from 'react';
import {Calendar, WeekCalendar} from 'react-native-calendars';
import { View,  ScrollView, StyleSheet, Image, Text, TouchableHighlight  } from 'react-native';

import moment from 'moment';

const style = StyleSheet.create({
    container: {
        backgroundColor: '#B8E2D6'
    },
    weekItem: {
        height: 60,
        width: 120, 
        backgroundColor: 'gold', 
        borderRadius: '5px', 
        margin: '5px',
        justifyContent: 'center',
        alignItems: 'center'
    },
    weekItemText: {
        color: "white",
        fontWeight: 'bold'
    },
    array: {
        width: 15, 
        backgroundColor: 'gold', 
        alignContent: 'center', 
        justifyContent: 'center'
    }
})



export default class DatePicker extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            selectedDate: '',
            fullDays: [],
            daysWithFreePlaces: [],
            currDate: new Date()
        }
    }
    updateParentState(data){
        this.props.func(data.format());
    }


    async daySelect(day){
        try{
            this.setState({selectedDate:day});
        }catch(err){
            console.log(err);
        }
    }

    generateWeek = (date) => {
        let startOfWeek = moment(date)//.startOf('isoWeek');
        let days = [];
        let day = startOfWeek;

        days.push(day)
        for(let i = 1 ; i < 7; i++ ){
            let newDate = day.clone().add(i, 'd');
            days.push(newDate);
        }
        return days
    }


    nextWeek(){
        let {currDate} = this.state;
        let nextWeek = moment(currDate).add(1, 'week').format();
        this.setState({currDate:nextWeek});
    }

    prevWeek(){
        let {currDate} = this.state;
        let prevWeek = moment(currDate).subtract(1, 'week').format();
        this.setState({currDate:prevWeek});
    }

    generateWeekComponent = (week) => {
        return <ScrollView 
                    horizontal={true} 
                    style={style.container}
                    onScroll = {(e)=>{console.log(e)}}
                    showsHorizontalScrollIndicator={false}
                    >
                        {/* {
                            <TouchableHighlight 
                                style={style.array}
                                onPress = {()=>{
                                    this.prevWeek()
                                }}
                                >
                                <Text style={{color: 'white', fontWeight: 'bold'}}>
                                    {"<"}
                                </Text>
                            </TouchableHighlight>
                        } */}
            {
                week.map((day, idx)=> {
                    const textDate = moment(day).format('L');
                    const dayName = moment(day).format('dddd');
                    // moment().format('dddd'); 
                    return(
                        <View 
                            key={idx} 
                            style={style.weekItem}
                        >
                        <TouchableHighlight key={idx} onPress = {()=>{
                            this.updateParentState(day)
                        }}>
                        <View>

                           
                            <Text style={style.weekItemText}>
                                {dayName}
                            </Text>
                            <Text style={style.weekItemText}>
                                {
                                    textDate
                                }
                            </Text>
                            </View>
                        </TouchableHighlight>
                        </View>
                    )
                })
            }

                        {/* {
                            <TouchableHighlight 
                                style={style.array}
                                onPress = { ()=>{
                                    this.nextWeek()
                                } }
                            >
                                <Text style={{color: 'white', fontWeight: 'bold'}}>
                                    {">"}
                                </Text>
                            </TouchableHighlight>
                        } */}

            </ScrollView>
    }
 


    render(){
        let { currDate } = this.state
        let week = this.generateWeek(currDate);

        return(
            <View>
                {
                    this.generateWeekComponent(week)
                    // console.log(week)
                }
            </View>
        )
    }
}







