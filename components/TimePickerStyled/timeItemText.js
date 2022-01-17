import React from 'react';
import styled from 'styled-components/native';
import { StyleSheet, View, Text } from 'react-native';



const TimeItemText = (props) => {

  let style = StyleSheet.create({
      timeItemText: {
        width: '100%',
        fontSize: 14,
        fontWeight: 'bold',
        padding: 10,
        margin: 10,
        textAlign:'center'
        // color: ${(props) => (props.selected ? '#fff' : '#555')}
      },
      // selected: {
      //   color: '#555'
      // }
  })
  

  let { selected } = props;
  

  return(
    <Text style = {style.timeItemText}    >
        {
            props.data
              
        }
    </Text>
  )
}


export default (TimeItemText);
