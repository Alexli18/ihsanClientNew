import React from 'react';
import styled from 'styled-components/native';
import { View,  ScrollView, StyleSheet, Image, Text, TouchableHighlight  } from 'react-native';

import moment from 'moment';

// import {  }

const DateList = styled.ScrollView`
  height: 70px;
`;
const DateItem = styled.TouchableOpacity`
  width: 55px;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  padding-top: 5px;
  padding-bottom: 5px;
  margin: 8px 0;
  opacity: ${(props) => (props.available ? 1 : '0.3')};
   
  background-color:  ${(props) => (props.selected ? 'gold' : '#fff')};
`;

const DateItemWeekDay = styled.Text`
  font-size: 17px;
  font-weight: bold;
  color: ${(props) => (props.selected ? 'white' : '#555')};
`;

const DateItemNumber = styled.Text`
`;

const months = [
    'ינו',
    'פבר',
    'מרץ',
    'אפר',
    'מאי',
    'יוני',
    'יולי',
    'אוג',
    'ספט',
    'אוק',
    'נוב',
    'דצמ',
  ];
  
  const days = [
    'יום א',
   'יום ב', 
   'יום ג',
    'יום ד',
     'יום ה',
      'יום ו',
       'שבת'];

export default class DatePickerStyled extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            selectedDays: this.props.availability,
            selectedDay: ''
            
        }
    }
    updateParentState(data){
        this.props.func(data.format());
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


    setSelectedDay(day){
        this.setState({selectedDay:day})
    }

    generateWeekComponent = (week) => {
        let selectedDay = this.state.selectedDay;
        return <DateList 
                    horizontal={true} 
                    showsHorizontalScrollIndicator={false}
                    >
                        
            {
                week.map((day, idx)=> {
                    let DAY_NUM = new Date(moment(day).format()).getDay();
                    let DATE = new Date(moment(day).format()).getDate();
                    let NUM_DATE = moment(day).format().split('T')[0];
                    let selectedDays = this.state.selectedDays;
                    let freeDay = DAY_NUM == 1 ? true : false
                    let STATUS =  freeDay  ?  true : false //selectedDays.filter((item) => { return item.date == NUM_DATE} ).length>0 ||
         
                    let dayStatus = this.props.orderedDates.filter(item=>item.date.split('T')[0] == NUM_DATE) 
                    
                    dayStatus = dayStatus.filter(item => item.barberId == this.props.barberId).length>0 ? true : false;
                    let alredySelected = () => {
                        if(this.props.selectedDay){
                            return this.props.selectedDay.split('T')[0] == NUM_DATE ? true : false
                        }else{
                            return false
                        }
                    }
                    return(
                        <DateItem 
                            key={idx}
                            available={!STATUS}
                            selected={dayStatus || alredySelected()}
                            onPress={() =>
                                STATUS ? this.setSelectedDay(DATE) : null
                            } 
                        >
                        <TouchableHighlight key={idx} onPress = {()=>{
                            this.updateParentState(day)
                        }}>
                            <View>
                                <DateItemWeekDay>
                                    {days[DAY_NUM]}
                                </DateItemWeekDay>
                                <DateItemNumber>
                                    {DATE}
                                </DateItemNumber>
                            </View>
                        </TouchableHighlight>
                        </DateItem>
                    )
                })
            }
            </DateList>
    }



    render(){
        let week = this.generateWeek(new Date());
        console.log(this.props)
        return(
            <View>
                {
                    this.generateWeekComponent(week)
                }
            </View>
        )
        
    }


}