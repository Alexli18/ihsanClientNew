import React from 'react';
import { Text, Card, Button, Icon } from 'react-native-elements';
import { getBarberServicesByBarberId, getUserOrdersData } from '../../Api/api';
import { View,  ScrollView, StyleSheet, Image, SafeAreaView, TouchableOpacity  } from 'react-native';
import { BASE_URL } from '../../config/config';


import BottomBar from '../../components/BottomTabBar/BottomBar';

import ServiceItem from '../ServiceItem/ServiceItem';

import ServiceSwiper from '../ServiceSwiper/ServiceSwiper';

import ModalDateTimePicker from '../ModalDateTimePicker/ModalDateTimePicker';


export default class BarberService extends React.Component{
    constructor(props, {navigation}){
        super(props);
        this.state = {
            name: this.props.route.params.barber.name,
            avatar: this.props.route.params.barber.avatar,
            id: this.props.route.params.barber._id,
            services: [],
            showModal: false,
            selectedService: '',
            userOrders: []
        }
    }

    async componentDidMount(){
        let barberId = this.state.id;
        let services = await getBarberServicesByBarberId(barberId);
        console.log(services)
        let userOrders = await getUserOrdersData();
        await this.setState({userOrders})
        await this.setState({services});
    }


    toggleModal(){
        let showModal = this.state.showModal;
        showModal = !showModal;
        this.setState({showModal})
    }
    

    async navigateToOrder(service){
        let userOrdersCount = this.state.userOrders.length;
        if(userOrdersCount>2){
            // alert('delete order')
            this.props.navigation.navigate('MyOrders');
        }else{
            this.setState({selectedService: service})
            this.toggleModal();
        }
        

    }
   
    renderServices(services){
        return services.map((service, idx)=>{
            return (
                    <TouchableOpacity 
                        key={idx}
                        onPress = {()=>this.navigateToOrder(service)}
                        style={{marginTop: 50}}
                    >
                        <ServiceItem service={service}/>
                    </TouchableOpacity>
                    )
        })
    }

    render(){
        let services = this.state.services;
        let avatar = this.state.avatar;
        let show = this.state.showModal;
        let service = this.state.selectedService;
        let barberId = this.state.id;
        console.log(this.state)
        return(
            <SafeAreaView style={{backgroundColor: "#dce8e1", flex: 1, height: '100%'}}>
                <ScrollView > 
                <ServiceSwiper/>
                <View style={{
                    backgroundColor: '#fff', 
                    borderTopLeftRadius: 50, 
                    marginTop: -50, 
                    width: '100%',
                    position: 'fixed',
                    height: '75%',
                    bottom: 0
                    
                    }}>
                    <View style={{
                        flexDirection: 'row',
                        marginTop: -35
                    }}>
                        <Image source={{uri: BASE_URL+avatar}}
                            style={{
                                width: 150, 
                                height: 150, 
                                borderTopLeftRadius: 50, 
                                marginLeft: 20, 
                                marginRight: 20,
                                borderWidth: 4,
                                borderColor: 'green'
                            }}
                        />
                    </View>
                {
                    this.renderServices(services)
                }
                </View>
                <ModalDateTimePicker 
                    show = {show}
                    func = {this.toggleModal.bind(this)}
                    service = { service }
                    avatar = { avatar }
                    barberId = { barberId }    
                    navigation = { this.props.navigation }
                />
                </ScrollView>
                <BottomBar navigation = {this.props.navigation}/>
            </SafeAreaView>
        )
    }
} 