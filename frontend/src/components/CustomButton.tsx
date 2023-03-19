import { Text, TouchableOpacity } from "react-native";
import React from "react";

type InputProps = { label: string; onPress: any };

export default function CustomButton({ label, onPress }: InputProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`${
        label == "Close" ? "bg-[#e84147]" : "bg-[#4CAF50]"
      } p-3 mb-7 mx-12 rounded-md`}
    >
      <Text
        className="text-center text-white"
        style={{
          // fontFamily: "MontserratRegular",
          fontSize: 20,
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}
