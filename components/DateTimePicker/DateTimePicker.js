import React from 'react';
import {Calendar} from 'react-native-calendars';
import { View,  ScrollView, StyleSheet, Image, Text  } from 'react-native';
import { getOrdersByBarberId, getOrderedHoursByDate } from '../../Api/api';

import DatePicker from './DatePicker1';



import Modal from '../Modal/Modal';


const style = StyleSheet.create({
    modal: {
        backgroundColor: '#fff',
        borderRadius: 10,
        marginTop: 15,
        padding: 10
    }
})

export default class DateTimePicker extends React.Component{
    constructor(props, {navigation}){
        super(props);
        this.state = {
            barberId: this.props.barber.barberId,
            orders: [],
            selectedDate: [],
            selectedHour: [],
            markedDates: {},
            isModalVisible: false
        }
    }


    shouldComponentUpdate(nextProps, nextState){
        if(nextState !== this.state || nextProps !== this.props){
            return true
        }
        if(nextState.orders !== this.state.orders || nextState.markedDates !== this.state.markedDates){
            return true
        }
        if( nextState.selectedDate !== this.state.selectedDate ){
            return true;
        }
        return false
    }

    

    toggleModal(isModalVisible){
        this.setState({isModalVisible})
    }
   
    async getDateFromUser(data){
        let isModalVisible = this.state.isModalVisible;
        isModalVisible = !isModalVisible;
        this.setState({isModalVisible});
        let selectedDate = data
        await this.setState({selectedDate:[selectedDate]});
        console.log(this.state);
        console.log("THIS IS STATE FROM DATETIME PICKER");
        console.log(selectedDate)
        let ordersByHours = await getOrderedHoursByDate(data.split('T')[0], this.state.barberId); 
        console.log(ordersByHours)
    }
    
    

    render(){
        let { barberId, orders, markedDates } = this.state;
        let { isModalVisible, selectedDate } = this.state;
        return(
            <View>
                <Modal 
                    isModalVisible={isModalVisible}
                    toggleModal={this.toggleModal.bind(this)}
                    selectedDate={selectedDate}
                    barberId={barberId}
                    />
        
                <DatePicker
                    style={style.modal} 
                    barberId={barberId}
                    func={this.getDateFromUser.bind(this)}
                    orders={orders}
                    markedDates={markedDates}
                />
            </View>
        )
    }


    async getOrderData(){
        try{
            let { barberId } = this.state;
            let orders = await getOrdersByBarberId(barberId);
            orders.map((item)=>{
                return{
                    barberId: item.barberId,
                    date: item.date.split('T')[0],
                    hours: item.hours,
                    userId: item.userId,
                }
            })
            this.setState({orders});

        }catch(err){
            console.log(err);
        }
    }

    async setOrderedDays(){
        try{

            let { orders } = this.state;
            let dateArr = orders.map((item)=>{
                
                return item.date.split('T')[0]
            });
            let markedDay = {};
            dateArr.map((item) => {
                markedDay[item] = {
                    selected: false,
                    marked: true,
                    selectedColor: "orange",
                };
            });
            console.log(markedDay)
            await this.setState({markedDates: markedDay})
        }catch(err){
            console.log(err);
        }

    }

    async componentDidMount(){
        try{
            await this.getOrderData();
            await this.setOrderedDays()

        }catch(err){
            console.log(err)
        }
    }
}