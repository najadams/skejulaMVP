import React from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface ChatOptionsModalProps {
  visible: boolean;
  onClose: () => void;
  onOptionPress: (option: string) => void;
  chatName: string;
}

const options = [
  { id: "prioritize", label: "Prioritize", icon: "star-outline" },
  {
    id: "raven",
    label: "Give Access to Raven",
    icon: "shield-checkmark-outline",
  },
  { id: "mute", label: "Mute", icon: "volume-mute-outline" },
  { id: "lock", label: "Lock Chat", icon: "lock-closed-outline" },
  { id: "block", label: "Block", icon: "ban-outline" },
  { id: "delete", label: "Delete", icon: "trash-outline", color: "#FF3B30" },
];

export default function ChatOptionsModal({
  visible,
  onClose,
  onOptionPress,
  chatName,
}: ChatOptionsModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.title}>{chatName}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#8E8E93" />
            </TouchableOpacity>
          </View>
          <View style={styles.optionsContainer}>
            {options.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={styles.optionButton}
                onPress={() => {
                  onOptionPress(option.id);
                  onClose();
                }}>
                <Ionicons
                  name={option.icon as any}
                  size={24}
                  color={option.color || "#000000"}
                />
                <Text
                  style={[
                    styles.optionText,
                    option.color && { color: option.color },
                  ]}>
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: "80%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000000",
  },
  closeButton: {
    padding: 8,
  },
  optionsContainer: {
    gap: 16,
  },
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#F2F2F7",
  },
  optionText: {
    fontSize: 16,
    marginLeft: 12,
    color: "#000000",
  },
});
