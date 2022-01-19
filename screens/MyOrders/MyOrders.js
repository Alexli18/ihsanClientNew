import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Button, SafeAreaView, ScrollView, Image } from 'react-native';
import { DataTable } from 'react-native-paper';
import BottomBar from '../../components/BottomTabBar/BottomBar';
import ModalDateTimePicker from '../../components/ModalDateTimePicker/ModalDateTimePicker';
import { getUserOrdersData, deleteOrderById, getUserToken, setOrderWithToken } from '../../Api/api';
import styled from 'styled-components/native';
import ExpandIcon from '../../assets/ExpandIcon';
import Input from '../../shared/Input/Input';
import axios from 'axios';

const ModalItem = styled.View`
  background-color: #fff;
  border-radius: 10px;
  margin-top: 15px;
  padding: 10px;
`;
const Modal = styled.Modal``;
const CloseButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
`;
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


const styles = StyleSheet.create({
    container: {
      paddingTop: 100,
      paddingHorizontal: 30,
      height: '100%'
    },
  });

export default class MyOrders extends Component {
    constructor(props ,{ navigation }) {
        super(props);
        this.state = {
          userOrders: false,
          isBarber: false,
          show: false,
          service: '',
          barberId: '',
          addUserModal: false,
          clientName: '',
          clientPhone: '',
          token: ''
        }
      }

      toggleModal(){
        let show = this.state.show;
        show = !show;
        this.setState({show})
      }
      toggleModalUser(){
        let addUserModal = this.state.addUserModal;
        addUserModal = !addUserModal;
        this.setState({addUserModal});
      }
      
      async componentDidMount(){
          try{
            let userOrders = await getUserOrdersData();
            let isBarber = userOrders.isBarber;
            if(isBarber){
              let service = userOrders.service;
              console.log(service)
              await this.setState({service});
              
            }
            userOrders = userOrders.data;
            await this.setState({
              userOrders
            })
            await this.setState({isBarber})
            console.log(userOrders);
          }catch(err){
              console.log(err);
          }
      }

      async deleteOrder(orderId){
        try{
          let userOrders = await deleteOrderById(orderId);
          console.log(userOrders)
          this.setState({
            userOrders
          })
        }catch(err){
          console.log(err)
        }
      }


      renderTableData(data){
        let { isBarber } = this.state;
        console.log(data)
          return data.map((item, idx)=>{
            console.log(item);
              return(
                <DataTable.Row key={idx}>
                    <DataTable.Cell>{item.date.split('T')[0]}</DataTable.Cell>
                    <DataTable.Cell>{item.hours[0]}</DataTable.Cell>
                    {
                      isBarber && <DataTable.Cell>{item.userDetail[0].name}</DataTable.Cell>
                    }
                    {
                      isBarber && <DataTable.Cell>{item.userDetail[0].name}</DataTable.Cell>
                    }
                    <DataTable.Cell onPress ={()=> this.deleteOrder(item._id) }>

                      <View style ={{border: '1px solid black', borderRadius: 5}}>
                        <Text>
                          Delete
                        </Text>
                      </View>


                    </DataTable.Cell>
                </DataTable.Row>
              )
          })
      }

      getName = (data) => {
        this.setState({
          clientName: data
        });
      }
    
      getPhone = (data) => {
        this.setState({
          clientPhone: data
        })
      }


      sendUserData = async () => {
        try{
            let token = await getUserToken(this.state.clientName, this.state.clientPhone);
            this.setState({token});
            this.toggleModalUser();
            this.toggleModal();
            // await setOrderWithToken()
            console.log(token)
        }catch(err){
            console.log(err)
        }
    }

      renderAddUserModal(){
        let { addUserModal } = this.state;
        return(
          <Modal transparent visible={addUserModal} animationType="slide">
                <ModalArea>
                    <ModalBody>
                        <CloseButton onPress={()=>this.toggleModalUser()}>
                            <ExpandIcon/>
                        </CloseButton>


                        <ModalItem>
                        <Input
                            text = {"Please enter name"}
                            func = {this.getName.bind(this)}
                        ></Input>
                        <Input
                            text = {"Please enter phone num"}
                            func = {this.getPhone.bind(this)}
                        ></Input>
                        <Button
                    style={styles.button}
                    color="#268596"
                    title = {"המשך"}
                    onPress = {()=>{
                        this.sendUserData()
                    }}
                >
                </Button>
                        </ModalItem>
                    </ModalBody>
                    </ModalArea>
                    </Modal>
        )
      }

      render(){
        console.log(userOrders)
        let { userOrders, isBarber, show, service } = this.state;
        if(userOrders || userOrders?.length>0){
          return(
            <SafeAreaView style={{backgroundColor: "#dce8e1", flex: 1, height: '100%'}}>
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
              <ScrollView style={styles.container}>
                  <DataTable>
                    <DataTable.Header>
                      
                      <DataTable.Title>Order date</DataTable.Title>
                      <DataTable.Title>Order hour</DataTable.Title>
                      {
                        isBarber && <DataTable.Title>Client name</DataTable.Title>
                      }
                      {
                        isBarber && <DataTable.Title>Client phone</DataTable.Title>
                      }
                      <DataTable.Title>Action</DataTable.Title>
                    </DataTable.Header>

                    {
                        this.renderTableData(userOrders)
                    }

     

                </DataTable>
                { isBarber && <TouchableOpacity onPress={()=>this.toggleModalUser()}>
                  <Text>
                    Add
                  </Text>
                </TouchableOpacity> }

                {
                  isBarber && <ModalDateTimePicker 
                  show = {show}
                  func = {this.toggleModal.bind(this)}
                  service = { service[0] }
                  // avatar = { avatar }
                  barberId = { service[0].barberId }    
                  navigation = { this.props.navigation }
                  isBarber = { this.state.isBarber }
                  token = { this.state.token }
              />
                }
                {
                  this.renderAddUserModal()
                }
              </ScrollView>
                <BottomBar navigation = {this.props.navigation}/>
              </SafeAreaView>
          )
        }else{
          return(
            <Text>
              {/* gjghg */}
            </Text>
          )
        }
          
      }
    }


