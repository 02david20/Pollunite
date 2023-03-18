import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-element-textinput';

const PassWordComponent = (props:{placeholder: string, color: string, value: any, setValue: any}) => {
  return (
    <View style={styles.container}>
      <TextInput
        mode="password"
        value={props.value}
        style={styles.input}
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
        placeholderStyle={styles.placeholderStyle}
        textErrorStyle={styles.textErrorStyle}
        label="Password"
        placeholder={props.placeholder}
        placeholderTextColor="gray"
        focusColor={props.color}
        onChangeText={text => {
          props.setValue(text);
        }}
      />
    </View>
  );
};

export default PassWordComponent;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    height: 55,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  inputStyle: { fontSize: 16 },
  labelStyle: {  
    fontSize: 14,
    position: 'absolute',
    top: -10,
    backgroundColor: 'white',
    paddingHorizontal: 4,
    marginLeft: -4,
  },
  placeholderStyle: { fontSize: 16 },
  textErrorStyle: { fontSize: 16 },
});