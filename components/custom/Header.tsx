import React, { useEffect } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useUser } from "@/context/UserContext";


const Header = () => {
    const { user } = useUser();

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        backgroundColor: "#f0f0e1",
      }}>
      <Image
        source={{
          uri: user?.profilePicture || "../../assets/images/profile.png",
        }}
        style={{ width: 40, height: 40, borderRadius: 20, borderColor: "#fff", borderWidth: 1 }}
      />
      <Text style={{ marginLeft: 8, fontSize: 18, fontWeight: "bold" }}>
        {user?.name || "User"}
      </Text>
      <TouchableOpacity style={{ marginLeft: "auto" }}>
        <Text style={{ fontSize: 24 }}>⚙️</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Header;
