import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    Alert,
    ScrollView,
    Dimensions,
    StyleSheet,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons'

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import MainButton from '../components/MainButton';
import BodyText from '../components/BodyText'

import DefaultStyle from '../constants/defaultStyles'
import Colors from '../constants/colors';

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

const renderListItem = ( count, guess) => {
    return (
        <BodyText key={guess} style={styles.listItem}>
            <Text style={DefaultStyle.bodyText}>Guess Count: {count}</Text>
            <Text style={DefaultStyle.bodyText}>{guess}</Text>
        </BodyText>
    );
}

const GameScreen = (props) => {
    const firstGuess =  generateRandomBetween(1, 100, props.chosenNum) 
    const [ currentGuess, setCurrentGuess ] = useState( firstGuess );
    const [ guessCount, setGuessCount ] = useState(0);
    const [ guessList, setGuessList ] = useState([firstGuess]);
    const [ orientationIsPortrait, setOrientationIsPortrait] = useState(
        Dimensions.get('window').width < Dimensions.get('window').height
    );

    console.log("the state of orientationIsPortrait: ", orientationIsPortrait);

    const { gameOver, chosenNum } = props;
    
    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    let gameControls = null;


    const nextGuessHandler =( direction ) => {
        // validate user input
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

    useEffect(() => {
        const changeLayout = () => {
            setOrientationIsPortrait( (currentOrientation) => !orientationIsPortrait )
        }        

        Dimensions.addEventListener('change', changeLayout)
        return () => {
            Dimensions.removeEventListener('change', changeLayout);
        }
    })

    if( !orientationIsPortrait ) {
        gameControls = (
                <Card style={styles.horizontalGameContainer}>
                    <View style={styles.horizontalTitleContainer}>
                        <Text style={{... styles.HorizontalTitle, ...DefaultStyle.bodyText}}>
                            Oppenent's Guess:
                        </Text>
                    </View>
                    <View style={styles.gameLayoutContainer}>
                        <MainButton style={styles.directionBtn} onPress={nextGuessHandler.bind( this , 'down')}>
                            <Ionicons name="ios-arrow-dropdown-circle" size={30} color={Colors.primary} />
                        </MainButton>
                        {/* <Button title='Down' onPress={nextGuessHandler.bind( this , 'down')}/> */}
                        <NumberContainer style={styles.horizontalGuessContainer}>
                            {currentGuess}
                        </NumberContainer>
                        <MainButton style={styles.directionBtn} onPress={nextGuessHandler.bind( this , 'up')}>
                            <Ionicons name="ios-arrow-dropup-circle" size={30} color={Colors.primary} />
                        </MainButton>
                        {/* <Button title='Up' onPress={nextGuessHandler.bind( this , 'up')} /> */}
                    </View>
                </Card>
        )
    } else {
        gameControls = (
            <View style={styles.protratiGameContainer}>
                <Text style={DefaultStyle.bodyText}>
                    Oppenent's Guess:
                </Text>
                <NumberContainer>
                    {currentGuess}
                </NumberContainer>
                <Card style={styles.buttonContainerVertical}>
                    <MainButton style={styles.directionBtn} onPress={nextGuessHandler.bind( this , 'down')}>
                        <Ionicons name="ios-arrow-dropdown-circle" size={30} color={Colors.primary} />
                    </MainButton>
                    {/* <Button title='Down' onPress={nextGuessHandler.bind( this , 'down')}/> */}
                    <MainButton style={styles.directionBtn} onPress={nextGuessHandler.bind( this , 'up')}>
                        <Ionicons name="ios-arrow-dropup-circle" size={30} color={Colors.primary} />
                    </MainButton>
                    {/* <Button title='Up' onPress={nextGuessHandler.bind( this , 'up')} /> */}
                </Card>
            </View>
        )
    }

    return (
        <View style={styles.screen}>
            {gameControls}
            <View style={styles.listContainer}>
                <ScrollView contentContainerStyle={styles.list}>
                    {guessList.map( (guess, index) => renderListItem(guessList.length - index, guess) )}
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        width: '100%'
    },
    protratiGameContainer: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        width: '100%'
    },
    buttonContainerVertical: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: Dimensions.get('window').height > 600 ? 20 : 10,
        width: 300,
        maxWidth: '80%',
    },
    horizontalGameContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        marginTop: Dimensions.get('window').height > 600 ? 20 : 10,
        width: 300,
        maxWidth: '80%',
    },
    horizontalTitleContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 10,
    },
    gameLayoutContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    horizontalGuessContainer: {
        marginVertical: 0,
        padding: 10,
    },
    directionBtn: {
        marginVertical: 10,
    },
    listContainer: {
        flex: 1,
        width: '80%',
    },
    list: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    listItem: {
        borderColor: 'grey',
        borderWidth: 2,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: Dimensions.get('window').width > 350 ? '60%' : '90%',
        marginVertical: 10,
    },
});

export default GameScreen;