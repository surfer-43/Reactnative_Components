import React from 'react';
import {
    View, 
    Text, 
    TextInput, 
    Button, 
    StyleSheet 
} from 'react-native';

const Card = (props) => {
    return (
        <View style={styles.card}>
            <Text>Pick a number... any number!</Text>
            <TextInput style={styles.textInput}/>
            <View style={styles.buttonContainer}>
                <Button title='Reset' onPress={() => console.log('Reset was pressed')}/>
                <Button title='Confirm' onPress={() => console.log('Confirm was pressed')}/>
            </View>
        </View>
    )
} 

const styles = StyleSheet.create({
    card: {
        width: 250,
        maxWidth: '60%',
        padding: 20,
        alignItems: 'center',
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 6,
        elevation: 5,
        shadowOpacity: .26,
        backgroundColor: 'white',
        borderRadius: 10,
        marginVertical: 20
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
    },
    textInput: {
        borderWidth: 1,
        width: '80%',
        borderColor: '#aa33dd'
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: "space-between",
        paddingHorizontal: 15
    }
})

export default Card;