import React from 'react';
import { Dimensions, View, StyleSheet, TouchableHighlight } from 'react-native';
import {  ScrollView,  Image, Text, Button  } from 'react-native';

// const style = new StyleSheet()

export default class TimePicker extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            alredyOrdered: [],
            userOrder: {},
            date: this.props.date,
            barberId: this.props.barberId
        }
    }
    updateParentState(data){
        this.props.func(data);
    }

    generateWorkHours(){
        let workHours = [];
        for(let i = 11; i<=19; i++){
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
    
    renderWorkHours(barberId, date){
        console.log(date)
        let workHours = this.generateWorkHours()
        return workHours.map((item,idx)=>{
            return <TouchableHighlight 
                    key={idx}
                    title={item}
                    style={{ height:30, backgroundColor:'skyblue', fontSize:25, width: 60, padding: 5, margin:5, borderRadius: 5 }}
                    onPress= { ()=> this.updateParentState(item) }
                    >
                        <Text key={idx} style={{color: 'white'}}>
                            {item}
                        </Text>
                            
                </TouchableHighlight>
            })
    }

    render(){
        let { barberId, date } = this.props;
        return(
            <View style={{flexDirection: "row",  flexWrap: "wrap", width: '100%', justifyContent: 'center'}}>
                {
                   this.renderWorkHours(barberId, date)
                }
            </View>
        )
    }
}



// background-color: #fff;
//   border-radius: 10px;
//   margin-top: 15px;
//   padding: 10px;