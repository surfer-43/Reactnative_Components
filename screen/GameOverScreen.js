import React from 'react';
import {
    View,
    Text,
    Button,
    Image,
    StyleSheet
} from 'react-native';

import Bodytext from '../components/BodyText';
import MainButton from '../components/MainButton';

import Colors from '../constants/colors';
import DefaultStyles from '../constants/defaultStyles'

const GameOverScreen = (props) => {
    const { guessCount, userNum } = props;
    return (
        <View style={styles.screen}>
            <Text style={DefaultStyles.title}>Game Over</Text>
            <View style={styles.imageContainer}>
                <Image
                    source={require('../assets/original.png')}
                // source={{
                //     uri:
                //     'https://cdn.pixabay.com/photo/2016/05/05/23/52/mountain-summit-1375015_960_720.jpg'
                // }}
                style={styles.image}
                resizeMode="cover"
                />
            </View>
            <View style={styles.resultContainer}>
                <Bodytext style={styles.resultText}>Your number <Text style={styles.numToGuess}>{userNum}</Text> was guessed in: <Text style={styles.triesToGuess}>{guessCount} guesses</Text></Bodytext>
            </View>
            <MainButton style={styles.restBtn} onPress={props.restart}>Restart</MainButton>
            {/* <Button title="Restart" color={Colors.primary} onPress={props.restart} /> */}
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    restBtn: {
        backgroundColor: Colors.secondary,
        borderColor: Colors.primary,
        borderRadius: 25,
        borderWidth: 2
    },
    imageContainer: {
        width: 300,
        height: 300,
        borderRadius: 150,
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden',
        marginVertical: 30
      },
      image: {
        width: '100%',
        height: '100%'
      },
      numToGuess: {
        fontFamily: 'open-sans-bold',
        color: Colors.primary,
        fontSize: 18
    },
    resultContainer: {
        marginHorizontal: 110
    },
    resultText: {
        textAlign: "center"
    },
    triesToGuess: {
        fontFamily: 'open-sans-bold',
        color: Colors.secondary,
        fontSize: 18
    }

})

export default GameOverScreen;