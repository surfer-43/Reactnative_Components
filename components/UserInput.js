import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const UserInput = (props) => {
    return (
        <TextInput 
            {...props}
            style={{ ...styles.input, ...props.style }} 
        />
    )
}

const styles = StyleSheet.create({
    input: {
        padding: 10,
        borderWidth: 1,
        width: 20,
        marginVertical: 10
    }
})

export default UserInput;