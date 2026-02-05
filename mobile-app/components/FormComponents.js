import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';

export const InputGroup = ({ label, placeholder, value, onChangeText, secureTextEntry, multiline, numberOfLines }) => (
    <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>{label}</Text>
        <TextInput
            style={[styles.input, multiline && styles.multilineInput]}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
            multiline={multiline}
            numberOfLines={numberOfLines}
        />
    </View>
);

export const PrimaryButton = ({ label, onPress, style, textStyle }) => (
    <TouchableOpacity style={[styles.primaryBtn, style]} onPress={onPress}>
        <Text style={[styles.primaryBtnText, textStyle]}>{label}</Text>
    </TouchableOpacity>
);

export const SecondaryButton = ({ label, onPress, style, textStyle }) => (
    <TouchableOpacity style={[styles.secondaryBtn, style]} onPress={onPress}>
        <Text style={[styles.secondaryBtnText, textStyle]}>{label}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    inputGroup: {
        marginBottom: 20,
    },
    inputLabel: {
        fontSize: 12,
        fontWeight: '700',
        color: '#1F55A6',
        marginBottom: 8,
        textTransform: 'uppercase',
    },
    input: {
        borderWidth: 1,
        borderColor: '#e2e8f0',
        borderRadius: 12,
        height: 52,
        paddingHorizontal: 16,
        fontSize: 15,
        backgroundColor: '#fff',
        color: '#1e293b',
    },
    multilineInput: {
        height: 100,
        textAlignVertical: 'top',
        paddingTop: 12,
    },
    primaryBtn: {
        backgroundColor: '#1F55A6',
        height: 56,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#1F55A6',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    primaryBtnText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    secondaryBtn: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#1F55A6',
        height: 56,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    secondaryBtnText: {
        color: '#1F55A6',
        fontWeight: '700',
        fontSize: 16,
    },
});
