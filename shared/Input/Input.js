import React from "react";
import { SafeAreaView, StyleSheet, TextInput } from "react-native";

const Input = (props) => {
  const [text, onChangeText] = React.useState('');

const updateParentState = (data) => {
        props.func(data);
    }

  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        onChange={(e)=>{
            updateParentState(e.target.value);
        }}
        value={text}
        placeholder={props.text}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default Input;