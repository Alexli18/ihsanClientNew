import React from 'react';
import styled from 'styled-components/native';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import TimeItem from './TimeItem';
import { getOrderedHoursByDate, getBarberWorkHoursById, setOrder, setOrderWithToken } from '../../Api/api'


export default class TimePickerStyled extends React.Component{
    constructor(props ,{ navigation }){
        super(props);
        this.state = {
            selectedDay: this.props.selectedDay,
            service: this.props.service,
            orderedHours: [],
            workHours: {},
            userSelect: ''
        }
    }

    shouldComponentUpdate(nextProps, nextState){
        if(nextState !== this.state || nextProps !== this.props){
            return true
        }
        if( nextState.selectedDay !== this.state.selectedDay ){
            return true;
        }
        if( nextProps.selectedDay !== this.props.selectedDay ){
            return true;
        }
        return false
    }

    async componentDidMount(){
        let orderedHours = await getOrderedHoursByDate(this.props.selectedDay, this.props.service.barberId);
        console.log(orderedHours)
        await this.setState({orderedHours});
        let workHours = await getBarberWorkHoursById(this.props.service.barberId);
        let hours = this.generateWorkHours(workHours);
        await this.setState({workHours: hours});
        // console.log(hours)
    }



    generateWorkHours(obj){
        let {start, end} = obj;
        start = parseInt( start.split(":")[0] ); 
        end = parseInt( end.split(":")[0] );
        let workHours = [];
        for(let i = start; i<end; i++){
            for(let j = 0; j<60; j = j+15){
                if(j==0){
                    let hourStr = i+":"+j+"0";
                    workHours.push(hourStr);
                }else{
                    let hourStr = i+":"+j;
                    workHours.push(hourStr);
                }
            }
        }
        return workHours
    }

    async selecthours(item, selected){
        console.log(item);
        console.log(selected)
        if(!selected){
            if(this.props.isBarber){
                await setOrderWithToken(this.props.barberId, this.props.selectedDay, item, this.props.service._id, this.props.service.serviceName, this.props.token);
                this.props.navigation.navigate('Home');
            }else{
                await setOrder(this.props.barberId, this.props.selectedDay, item, this.props.service._id, this.props.service.serviceName);
                this.props.navigation.navigate('Home');
            }
        }
    }

    generateWorkHoursComponent(){
        let { workHours, orderedHours } = this.state;
        if(workHours && workHours.length>0){

            return workHours.map((item, index)=>{
                let selected = orderedHours.filter( orderedHour => orderedHour.hours[0] == item ).length>0 ? true : false
                return(
                    <TimeItem
                    key={index}

                    onPress = {()=>this.selecthours(item, selected)}

                    selected={selected}
                    
                    data = { item }

                    >
                   
                  </TimeItem>
                )
            })
        
        
        
        }else{
            return(
                <Text>
                    {/* problem with work hours, ckeck in db */}
                </Text>
            )
        }
    }


    render(){
        
        console.log(this.props.selectedDay)

        return(
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{height: 'auto'}}>
                {
                    this.generateWorkHoursComponent()
                }
            </ScrollView>
        )
    }
} 