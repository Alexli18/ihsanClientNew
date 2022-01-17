import React from 'react';
import { View,  ScrollView, StyleSheet, Image, SafeAreaView  } from 'react-native';
import { getBarbers } from '../../Api/api';
import Barber from '../../components/Barber/Barber';
import CarouselComponent from '../../shared/Carousel/Carousel';
import { Text, Card, Button, Icon } from 'react-native-elements';
import BottomBar from '../../components/BottomTabBar/BottomBar';

export default class HomeComponent extends React.Component{
    constructor(props, {navigation}){
        super(props);
        this.state = {
            barbers: []
        }
    }

    shouldComponentUpdate(nextProps, nextState){
        if(nextState !== this.state){
            return true
        }
        return false
    }

    async componentDidMount(){
        
        let barbers = await getBarbers();
        this.setState({
            barbers: barbers.barbers
        })
        console.log(this.state.barbers);
        console.log("BARBERS");

    }

    navigateToBarberService(barber){
        const { navigate } = this.props.navigation;
        navigate('BarberService', {barber});
    }

    renderBarbers(barbers){
        return barbers.map((barber, idx)=>{
            return(
                    <View 
                        key={idx} 
                        style={{margin: 10}}
                        >
                        <Barber 
                            barber={barber}
                            func={()=>this.navigateToBarberService(barber)}
                            />
                    </View>
                )
        })
    }

    render(){

        if(this.state.barbers && this.state.barbers.length>0){
            let barberArr = this.state.barbers;
            return(
                <SafeAreaView style={{backgroundColor: "#dce8e1", flex: 1}}>
                <ScrollView>
                    <View style={{borderRadius: 30, flexDirection: 'row', alignItems: 'center', width: 'auto', height: 250, marginTop: 20, justifyContent: 'center'}}>
                      <Image
                        style={{
                          resizeMode: "contain",
                          height: 400,
                          width: 350,
                          justifyContent: 'center',
                          alignItems: 'center',
                        
                       }}
                        source={require('../../assets/newlogo.png')}/>
                    </View>
                    {
                        this.renderBarbers(barberArr)
                    }
                </ScrollView>
                <BottomBar navigation = {this.props.navigation}/>
                </SafeAreaView>
            )
        }else{

            
            
            return(
                <Text>
                    HOME PAGE
                </Text>
            )
        }
    }
        
}