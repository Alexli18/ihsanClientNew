import React from 'react';
import { View,  ScrollView, StyleSheet, Image  } from 'react-native';
import { Card } from 'react-native-elements';
import styled from 'styled-components/native';


const ChooseServiceButton = styled.View`
  background-color: #B8E2D6;
  border-top-left-radius: 20px;
  width: 100%;
  padding: 10px 15px;
   justify-content: center;
  align-items: center;
`;

const ChooseServiceButtonText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #1D5D2E;
   justify-content: center;
  align-items: center;
`;

const ServiceItem1 = styled.View`
  flex-direction: row;
  margin: 0 24px 20px 24px;
  border: 1px solid gold;
  padding: 12px;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
`;

export default class ServiceItem extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            serviceName: this.props.service.serviceName,
            barberId: this.props.service.barberId,
            serviceId: this.props.service._id
        }
    }

    render(){
        let service = this.state
        return(
            <ServiceItem1>
            <ChooseServiceButton>
                <ChooseServiceButtonText>{service.serviceName}</ChooseServiceButtonText>  
            </ChooseServiceButton>
            </ServiceItem1>
        )
    }
}