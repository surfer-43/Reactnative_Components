import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet,
    Alert
} from 'react-native';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';

const generateRandomBetween = ( min, max, exclude ) => {
    // normalizing the numbers
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * ( max - min )) + min;

    if(rndNum === exclude) {
        generateRandomBetween( min, max, exclude );
    }

    return rndNum;
}

const GameScreen = (props) => {
    const [ currentGuess, setCurrentGuess ] = useState( generateRandomBetween(1, 100, props.chosenNum) );
    const [ guessCount, setGuessCount ] = useState(0);

    const { gameOver, chosenNum } = props;
    
    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const nextGuessHandler =( direction ) => {
        // validate user input
        if( (direction === 'down' && currentGuess < props.chosenNum) || direction === 'up' && currentGuess > props.chosenNum) {
            Alert.alert('don\'t cheet - you must play fair', [{text: 'Sorry!', style:'cancel'}]);
            return;
        }

        if(direction === 'up'){
            currentLow.current = currentGuess;
        } else {
            currentHigh.current = currentGuess;
        }
        const nextNum = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNum);
        setGuessCount( guessCount => {
            return guessCount + 1;
        })
    }

    useEffect( () => {
        if (currentGuess === chosenNum) {
            gameOver(guessCount);
        }
    }, [guessCount, gameOver, chosenNum])

    return (
        <View style={styles.screen}>
            <Text>
                Oppenent's Guess:
            </Text>
            <NumberContainer>
                {currentGuess}
            </NumberContainer>
            <Card style={styles.buttonContaienr}>
                <Button title='Down' onPress={nextGuessHandler.bind( this , 'down')}/>
                <Button title='Up' onPress={nextGuessHandler.bind( this , 'up')} />
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContaienr: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 300,
        maxWidth: '80%',
    }
});

export default GameScreen;