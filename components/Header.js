import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

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
        height: 90,
        paddingTop: 40,
        backgroundColor: "#ccc",
        borderBottomWidth: 1,
        alignItems: "center",
        justifyContent: 'center'
    },
    HeaderTitle: {
        color: "black",
        fontSize: 18,
        fontWeight: "bold",
    }
})

export default Header;