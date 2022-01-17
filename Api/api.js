import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../config/config';
import axios from 'axios';



export const getUserToken = async (data) =>{
    try{
        let token = await getToken(data);
        return token;
    }catch(err){
        console.log(err)
    }
}

export const login = async (data) => {
    try{
        let token = await AsyncStorage.getItem('token');
        token = JSON.parse(token);
        if(token !== null){
            return true;
        }else{
            let token = await getToken(data);
            debugger;
            AsyncStorage.setItem('token', JSON.stringify(token));
        }
    }catch(err){
        console.log(err);
        return false;
    }
}

export const getBarbers = async () => {
    try{
        let url = BASE_URL+'/barbers/getBarbers';
        let token = await AsyncStorage.getItem('token');
        token = JSON.parse(token);
        if(token !== null){
            let barbers = await axios.get(url,{params: token});
            console.log(barbers.data);
            return barbers.data
        }
        
    }catch(err){
        console.log(err)
    }
}

export const getBarberServicesByBarberId = async (barberId) => {
    try{
        let url = BASE_URL+'/service/getServicesByBarberId';
        let token = await AsyncStorage.getItem('token');
        
        if(token !== null){
            token = JSON.parse(token);
            let barbers = await axios.get(url,{params: {token, barberId}});
            console.log(barbers.data);
            return barbers.data
        }
        
    }catch(err){
        console.log(err)
    }
}

export const getToken = async (data) => {
    try{
        let url = BASE_URL+"/auth/login"
        let token = await axios.post(url, data);
        debugger
        return token.data;
    }catch(err){
        console.log(err)
    }
}

export const getOrdersByBarberId = async (barberId) => {
    try{
        let token = await AsyncStorage.getItem('token');
        if(token !== null){
            token = JSON.parse(token);
            let orders = await axios.get(BASE_URL+"/order/getOrdersByBarberId", {params:{token, barberId}});
            return orders.data;
        }
    }catch(err){
        console.log(err)
    }
}

export const getOrderedHoursByDate = async (date, barberId) => {
    try{
        let url = BASE_URL+'/order/getOrderedHoursByDate'
        let token = await AsyncStorage.getItem('token');
        token = JSON.parse(token);
        if(token !== null){
            let hours = await axios.post(url,{date, barberId},{params: token});
            return hours.data
        }
    }catch(err){
        console.log(err)
    }
}

export const getUserOrdersData = async () => {
    try{
        let url = BASE_URL+'/order/getOrdersByUserId';
        let token = await AsyncStorage.getItem('token');
        token = JSON.parse(token);
        if(token !== null){
            let orders = await axios.get(url,{params: token});
            return orders.data
        }
    }catch(err){
        console.log(err);
    }
}


export const setOrder = async (barberId, date, hours, serviceId, serviceName) => {
    try{
        let url = BASE_URL+'/order/setOrder';
        let token = await AsyncStorage.getItem('token');
        token = JSON.parse(token);
        if(token !== null){
            await axios.post(url,{barberId, date, hours, serviceId, serviceName},{params: token});
            return 
        }
    }catch(err){
        console.log(err);
    }
}

export const setOrderWithToken = async (barberId, date, hours, serviceId, serviceName, token) => {
    try{
        let url = BASE_URL+'/order/setOrder';
        await axios.post(url,{barberId, date, hours, serviceId, serviceName},{params: token});
        return 
    }catch(err){
        console.log(err)
    }
}

export const deleteOrderById = async (orderId) => {
    try{
        let url = BASE_URL+'/order/deleteOrder';
        let token = await AsyncStorage.getItem('token');
        token = JSON.parse(token);
        if(token !== null){
            let orders = await axios.post(url,{orderId},{params: token});
            return orders.data
            
        }
    }catch(err){
        console.log(err);
    }
}


export const getOrdersAvailablity = async (barberId) => {
    try{
        let url = BASE_URL+'/order/getOrdersAvailablity';
        let token = await AsyncStorage.getItem('token');
        token = JSON.parse(token);
        if(token !== null){
            let availablity = await axios.post(url,{barberId},{params: token});
            return availablity.data;
        }
    }catch(err){
        console.log(err);
    }
}


export const getBarberWorkHoursById = async (barberId) => {
    try{
        let url = BASE_URL+'/barbers/getBarberWorkHoursById';
        let token = await AsyncStorage.getItem('token');
        token = JSON.parse(token);
        if(token !== null){
            let workHours = await axios.post(url,{barberId},{params: token});
            return workHours.data;
        }
    }catch(err){
        console.log(err);
    }
}


export default {
    login,
    getBarbers,
    getOrdersByBarberId,
    getBarberServicesByBarberId,
    getUserOrdersData,
    getOrderedHoursByDate,
    deleteOrderById,
    getBarberWorkHoursById,
    getUserToken,
    setOrderWithToken
}
