import React from 'react';
import { 
    View, 
    Text, 
    Dimensions,
    StyleSheet 
} from 'react-native';

import Colors from '../constants/colors'

const Header = (props) => {
    return (
        <View style={styles.Header}>
            <Text style={styles.HeaderTitle}>{props.title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    Header: {
        width: '100%',
        height: Dimensions.get('window').height / 10,
        paddingTop: 20,
        backgroundColor: Colors.header,
        borderBottomWidth: 1,
        alignItems: "center",
        justifyContent: 'center'
    },
    HeaderTitle: {
        color: "black",
        fontSize: 18,
        fontFamily: 'open-sans-bold'
    }
})

export default Header;