import React from 'react';
import {
    View, 
    Text, 
    TextInput, 
    Button, 
    StyleSheet 
} from 'react-native';

const Card = (props) => {
    console.log('looking for props.style: ', props);
    return (
        <View style={{...styles.card, ...props.style}}>{props.children}</View>
    )
} 

const styles = StyleSheet.create({
    card: {
        marginVertical: 20,
        padding: 20,
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 6,
        elevation: 5,
        shadowOpacity: .26,
        backgroundColor: 'white',
        borderRadius: 10,
    }
})

export default Card;