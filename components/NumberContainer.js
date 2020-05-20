import React from 'react';
import { 
    View,
    Text,
    StyleSheet
} from 'react-native';
import Colors from '../constants/colors';

const NumberContainer = (props) => {
    return (
        <View style={{...styles.NumBox, ...props.style}}>
            <Text style={styles.Num}>{props.children}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    NumBox: {
        borderColor: Colors.primary,
        borderWidth: 3,
        borderRadius: 20,
        marginVertical: 20,
        padding: 20
    },
    Num: {
        fontWeight: 'bold',
        fontSize: 42,
        color: Colors.primary
    }
});

export default NumberContainer