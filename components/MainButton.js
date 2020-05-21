import React from 'react'
import { 
    View, 
    Text,
    TouchableOpacity,
    TouchableNativeFeedback,
    Platform,
    StyleSheet
} from 'react-native';
import Colors from '../constants/colors'

const MainButton = (props) => {
    let ButtonComponent = TouchableOpacity;

    if( Platform.OS === 'android' && Platform.Version >= 21 ) {
        ButtonComponent = TouchableNativeFeedback
    }

    return (
        <View style={{...styles.mainButton, ...props.style}}>
            <ButtonComponent onPress={props.onPress}>
                <View style={{...styles.mainButton, ...props.style}}>
                    <Text style={styles.buttonTxt}>{props.children}</Text>
                </View>
            </ButtonComponent>
        </View>
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
