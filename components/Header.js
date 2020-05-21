import React from 'react';
import { 
    View, 
    Text, 
    Dimensions,
    Platform,
    StyleSheet 
} from 'react-native';

import Colors from '../constants/colors'

const Header = (props) => {
    return (
        <View style={{...styles.Header, ...Platform.select({ios: styles.headerIos, android: styles.headerAndriod})}}>
            <Text style={styles.HeaderTitle}>{props.title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    Header: {
        width: '100%',
        height: Dimensions.get('window').height / 10,
        paddingTop: 20,
        // backgroundColor: Platform.OS === 'android' ? Colors.header : 'white',
        // borderBottomWidth: Platform.OS === 'ios' ? 1 : 0,
        // borderBottomColor: Platform.OS === 'ios' ? "#ccc" : 'transparent',
        alignItems: "center",
        justifyContent: 'center'
    },    
    headerIos: {
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    headerAndriod: {
        backgroundColor: Colors.header,
    },

    HeaderTitle: {
        color: "black",
        fontSize: 18,
        fontFamily: 'open-sans-bold'
    }
})

export default Header;