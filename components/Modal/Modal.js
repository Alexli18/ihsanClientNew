import React, { useState } from "react";
import { Button, Text, View } from "react-native";
import Modal from "react-native-modal";

import TimePicker from '../DateTimePicker/TimePickerModal';

import { getOrderedHoursByDate, setOrder } from '../../Api/api';

export default class ModalTester extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      alredyOrderedHours: [],
      selectedDay: this.props.selectedDate,
      barberId: this.props.barberId
    }
  }

  async componentDidMount(){
    let { selectedDay, barberId } = this.state;
    

    try{
      if(barberId && Object.entries(selectedDay).length !== 0){
        let alredyOrderedHours = await getOrderedHoursByDate(selectedDay, barberId);
        await this.setState({alredyOrderedHours});
        console.log("***********************");
        console.log(this.state);
        console.log("***********************");
      }
    }catch(err){
      console.log(err)
    }
  }

  shouldComponentUpdate(nextProps, nextState){
    if(nextState !== this.state || nextProps !== this.props){
        return true
    }
    return false
}

userClickedOnDay(data){
  let { barberId } = this.state;
  let hours = [];
  hours.push(data);
  let date = this.props.selectedDate;
  setOrder(barberId, date, hours)
}
  
  render(){
    let { isModalVisible } = this.props;
    console.log(this.props);
    console.log(this.state);
    return(
      <View style={{ flex: 1 }}>
        <Modal isVisible={isModalVisible}>
          <View style={{ flex: 1 }}>
            <TimePicker
              date = {this.props.selectedDate}
              barberId = {this.props.barberId}
              func={this.userClickedOnDay.bind(this)}
            />
            <Button title="Hide modal" onPress={()=>this.props.toggleModal(!isModalVisible)} />
          </View>
        </Modal>
      </View>
    )
  }     
      

}
