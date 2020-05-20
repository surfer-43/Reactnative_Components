import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    Alert,
    ScrollView,
    StyleSheet,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons'

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import MainButton from '../components/MainButton'

import DefaultStyle from '../constants/defaultStyles'
import { Colors } from 'react-native/Libraries/NewAppScreen';

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
    const firstGuess =  generateRandomBetween(1, 100, props.chosenNum) 
    const [ currentGuess, setCurrentGuess ] = useState( 
        firstGuess
    );
    const [ guessCount, setGuessCount ] = useState(0);
    const [ guessList, setGuessList ] =useState([firstGuess]);

    const { gameOver, chosenNum } = props;
    
    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const nextGuessHandler =( direction ) => {
        // validate user input
        console.log("nextGuess was called: ", direction);
        if( (direction === 'down' && currentGuess < props.chosenNum) || direction === 'up' && currentGuess > props.chosenNum) {
            console.log('should have shown the alert...');
            // Alert.alert('don\'t cheet - you must play fair', [{text: 'Sorry!', style:'cancel'}]);
            Alert.alert(
                "You gotta play by the rules...",
                "please give accurate instructions",
                [{text: 'Sorry!', style:'cancel'}]
            )
            return;
        }

        if(direction === 'up'){
            currentLow.current = currentGuess + 1;
        } else {
            currentHigh.current = currentGuess;
        }
        const nextNum = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNum);
        setGuessCount( guessCount => {
            /**
             * get the current state of our guesses and return a new array of 
             * all the guess that have been made to this point
             * putting the new guess at the beginning keeps the most current 
             * order of the list
             */
            setGuessList(currentPastGuess => [ nextNum, ...guessList]);
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
            <Text style={DefaultStyle.bodyText}>
                Oppenent's Guess:
            </Text>
            <NumberContainer>
                {currentGuess}
            </NumberContainer>
            <Card style={styles.buttonContaienr}>
                <MainButton onPress={nextGuessHandler.bind( this , 'down')}>
                    <Ionicons name="ios-arrow-dropdown-circle" size={30} color={Colors.primary} />
                </MainButton>
                {/* <Button title='Down' onPress={nextGuessHandler.bind( this , 'down')}/> */}
                <MainButton onPress={nextGuessHandler.bind( this , 'up')}>
                    <Ionicons name="ios-arrow-dropup-circle" size={30} color={Colors.primary} />
                </MainButton>
                {/* <Button title='Up' onPress={nextGuessHandler.bind( this , 'up')} /> */}
            </Card>
            <ScrollView>
                {guessList.map( guess => (
                    <View key={guess}>
                        <Text>{guess}</Text>
                    </View>
                    )
                )}
            </ScrollView>
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