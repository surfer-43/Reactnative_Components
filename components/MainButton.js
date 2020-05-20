import React from 'react'
import { 
    View, 
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import Colors from '../constants/colors'

const MainButton = (props) => {
    console.log("what are the props: ", props.children)
    return (
        <TouchableOpacity onPress={props.onPress}>
            <View style={{...styles.mainButton, ...props.style}}>
                <Text style={styles.buttonTxt}>{props.children}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    mainButton: {
        borderColor: Colors.secondary,
        borderWidth: 2,
        borderRadius: 20,
        marginVertical: 30,
        paddingVertical: 12,
        paddingHorizontal: 30,
    },
    buttonTxt: {
        fontFamily: 'open-sans-bold',
        fontSize: 18,
        color: "white"
    }
})

export default MainButton
