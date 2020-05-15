import React from 'react';
import { View, Text, TextInput, Button,StyleSheet } from 'react-native';

import Card from '../components/Card';

const StartGameScreen = () => {
    return(
        <View style={styles.screen}>
            <Text style={styles.title}>Start a new Game!</Text>
            <Card />
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    }
})

export default StartGameScreen;