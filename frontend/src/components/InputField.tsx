import React from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";

type InputProps = {
  label: string;
  icon: JSX.Element;
  inputType: string;
  keyboardType: string;
  value: any;
  fieldButtonLabel: any;
  fieldButtonFunction: any;
  onChangeText: any;
};

export default function InputReportField({
  label,
  icon,
  inputType,
  keyboardType,
  value,
  fieldButtonLabel,
  fieldButtonFunction,
  onChangeText,
}: InputProps) {
  return (
    <View className="flex-row border-b-[#ccc] border-b-2 pb-2 mb-6">
      {icon}
      {inputType == "password" ? (
        <TextInput
          placeholder={label}
          keyboardType="default"
          className="flex-1 py-0"
          secureTextEntry={true}
          value={value}
          onChangeText={onChangeText}
        />
      ) : (
        <TextInput
          placeholder={label}
          keyboardType={keyboardType}
          className="flex-1 py-0"
          value={value}
          onChangeText={onChangeText}
        />
      )}
      <TouchableOpacity onPress={fieldButtonFunction}>
        <Text className="bg-[#AD40AF] font-bold">{fieldButtonLabel}</Text>
      </TouchableOpacity>
    </View>
  );
}
