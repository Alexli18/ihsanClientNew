import React from 'react';
import LoginComponent from './screens/Login/Login';
import Home from './screens/Home/Home';
import BarberService from './components/BarberService/BarberService';
import Barber from './components/Barber/Barber';
import Order from './screens/Order/Order';
import Profile from './screens/Profile/index';
import MyOrders from './screens/MyOrders/MyOrders';


import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import BottomBar from './components/BottomTabBar/BottomBar';


const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
          headerShown: false
        }}>
        <Stack.Screen name="Login" component={LoginComponent} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Barber" component={Barber} />
        <Stack.Screen name="BarberService" component={BarberService} />
        <Stack.Screen name="Order" component={Order} />
        <Stack.Screen name="MyOrders" component={MyOrders} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="BottomBar" component={BottomBar}/>
      </Stack.Navigator>
    </NavigationContainer>

  );
}

