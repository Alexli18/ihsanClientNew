import React from 'react';
import styled from 'styled-components/native';

import ExpandIcon from '../../assets/ExpandIcon';

import DatePicker from '../DateTimePicker/DatePicker1';
import DatePickerStyled from '../DatePickerStyled/DatePickerStyled';

import TimePickerStyled from '../TimePickerStyled/TimePickerStyled';

import { getOrdersAvailablity, getUserOrdersData } from '../../Api/api';
import moment from 'moment';

const CloseButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
`;
const ModalItem = styled.View`
  background-color: #fff;
  border-radius: 10px;
  margin-top: 15px;
  padding: 10px;
`;
const Modal = styled.Modal``;

const ModalArea = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: flex-end;
`;

const ModalBody = styled.View`
  background-color: #B8E2D6;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  min-height: 300px;
  padding: 10px 20px 40px 20px;
`;


export default class ModalDateTimePicker extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            selectedDay: false,
            selectedHour: '',
            show: this.props.show,
            timeModal: false,
            orderedDates: [],
            service: this.props.service,
            availability: []
        }
    }


    shouldComponentUpdate(nextProps, nextState){
        if(nextState !== this.state || nextProps !== this.props){
            return true
        }
        if( nextState.selectedDay !== this.state.selectedDay ){
            return true;
        }
        return false
    }


    async componentDidMount(){
        console.log(this.props)
        let availability = await getOrdersAvailablity(this.props.barberId);
        console.log(availability)
        let orderedDates = await getUserOrdersData();
        orderedDates = orderedDates.data;
        await this.setState({orderedDates});
        await this.setState({availability});
    }


    async handleCloseModal(){
        this.props.func()
        let show  = this.state.show;
        show = !show;
        await this.setState({ show });
        await this.setState({ selectedDay: false });
    }

    async setSelectedDay(day){
        
        if(new Date(moment(day).format()).getDay() == 1){
            await this.setState({ selectedDay: false });
            return
        }else{
            await this.setState({ selectedDay: false });
            await this.setState({selectedDay:day})
            console.log(day);
        }
    }

    render(){
        console.log(this.props)
        let selectedDay = this.state.selectedDay;
        let availability = this.state.availability;
        let service = this.props.service;
        let orderedDates = this.state.orderedDates;
        return(
            <Modal transparent visible={this.props.show} animationType="slide">
                <ModalArea>
                    <ModalBody>
                        <CloseButton onPress={()=>this.handleCloseModal()}>
                            <ExpandIcon/>
                        </CloseButton>


                        <ModalItem>
                            <DatePickerStyled
                                func={this.setSelectedDay.bind(this)}
                                availability = { availability } 
                                orderedDates = { orderedDates }
                                barberId = { this.props.barberId }
                                selectedDay = { selectedDay }
                            />
                        </ModalItem>
                        {
                            // if selectedDay show modal
                            selectedDay && (<ModalItem >
                                <TimePickerStyled
                                    selectedDay = { selectedDay }
                                    service = { service }
                                    navigation = { this.props.navigation }
                                    barberId = { this.props.barberId }
                                    isBarber = { this.props.isBarber }
                                    token = { this.props.token }
                                />
                            </ModalItem>)
                        }
                        {
                            // add Button 
                        }
                    </ModalBody>
                </ModalArea>
            </Modal>
        )
    }
}