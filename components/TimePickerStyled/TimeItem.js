import React from 'react';
import styled from 'styled-components/native';
import { StyleSheet, View, Text } from 'react-native';
import TimeItemText from './timeItemText';


const TimeItem = (props) => {
  // alert(props.selected)
  let selHours = false;
  props.selected ? selHours = true : selHours = false;
  // let selHours = props.selected;
  let style = StyleSheet.create({ 
    wrapper: {
    width: 'auto',
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: '#fff',
    borderColor: 'gold',
    borderWidth: 1,
    
    },
    selected: {
      backgroundColor: 'green',
    }
    // background-color: ${(props) => (props.selected[0] || props.selected[1] ? 'gold' : '#fff')};
  })
  
  
  function  selectStyle() {
   if(selHours){
       return selectedColor()
   }else{
       return regularColors()
   }
  }


  const selectedColor = function() {
         return{
    width: 'auto',
    height: 40,
    
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: 'gold' //backcolor for timeitems selected
         }
  }

  const regularColors = function(){
      return{
       width: 'auto',
       height: 40,
       justifyContent: "center",
       alignItems: "center",
       borderRadius: 10,
       backgroundColor: '#fff'
      }
  }

  return(
    
    <Text 
    onPress = {props.onPress}
    style = {selectStyle()}
     >
      <TimeItemText
        data = {props.data}
      >

      </TimeItemText>
      
    </Text>
  )

}


export default (TimeItem);