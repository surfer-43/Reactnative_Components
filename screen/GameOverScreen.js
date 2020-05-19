import React from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet
} from 'react-native';

import Colors from '../constants/colors'

const GameOverScreen = (props) => {
    const { guessCount, userNum } = props;
    return (
        <View style={styles.screen}>
            <Text>Game Over</Text>
            <Text>Your number was guessed in: {guessCount}</Text>
            <Text>Your number was: {userNum}</Text>
            <Button title="Restart" color={Colors.primary} onPress={props.restart} />
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
    }
})

export default GameOverScreen;