import React from 'react';
import {Text, Button, SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Container} from './styles';

import BottomBar from '../../components/BottomTabBar/BottomBar';

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    paddingHorizontal: 30,
    height: '100%'
  },
});
const Profile = ({navigation}) => {
  // const navigation = useNavigation();

  const handleLogoutClick = async () => {
    // await Api.logout();
    AsyncStorage.removeItem('token');
    navigation.reset({
      routes: [{name: 'Login'}],
    });
  };

  return (
    // <SafeAreaView>
      // <ScrollView style={styles.container}>
    <Container style={{backgroundColor: "#dce8e1", flex: 1, height: '100%'}}>
      <ScrollView style={styles.container}>
      <Text>Profile Screen</Text>
      <Button title="לחץ כאן להתנתק" onPress={handleLogoutClick} />
      </ScrollView>
      <BottomBar navigation = {navigation}/>
    </Container>
    // {/* </ScrollView> */}
    // </SafeAreaView>
  );
};

export default Profile;
