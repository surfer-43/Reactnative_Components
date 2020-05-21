import React, { useState, useEffect } from 'react';
import { 
    View, 
    Text, 
    Button, 
    TouchableWithoutFeedback, 
    Keyboard,
    Alert,
    Dimensions,
    ScrollView,
    KeyboardAvoidingView,
    StyleSheet, 
} from 'react-native';

import MainButton from '../components/MainButton';
import Card from '../components/Card';
import UserInput from '../components/UserInput';
import NumberContainer from '../components/NumberContainer';
import Bodytext from '../components/BodyText'

import Colors from '../constants/colors';

const StartGameScreen = (props) => {
    console.log('width being set to the buttons: ', Dimensions.get('window').width / 2);
    const [ userNum, setUserNum ] = useState('');
    const [ confirmed, setConfirmed ] = useState(false);
    const [ selectedNum, setSelectedNum ] = useState();

    // managing some style specific attributes with state of orientation
    const [ buttonWidth, setButtonWidth ] = useState(Dimensions.get('window').width / 4)

    /**
     * useEffect in this case is a way to manage eventlisteners
     * so that there is only one being used no matter howmany times 
     * the screen is rotated.
     * useEffect runs just before the rerender cycle
     * with no dependancies declared, this useEffect will run every time
     */
    useEffect(() => {
        const updateLayout = () => {
            setButtonWidth(Dimensions.get('window').width / 4)
        }
        Dimensions.addEventListener('change', updateLayout);
        return () => {
            Dimensions.removeEventListener('change', updateLayout);
        }
    }); 

    const onChangedTextHandler = (inputText) => {
        setUserNum(inputText.replace(/[^0-9]/g, ''))
    }

    const resetUserNumHandler = () => {
        setUserNum('');
        setConfirmed(false);
    }

    const setConfirmedHandler = () => {
        const chosenNumber = userNum;
        if(isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert(
                'Invalid Number', 
                `You chose ${chosenNumber}. Please choose a number between 1 and 99`, 
                [{
                    text: 'Ok', 
                    style: 'destructive', 
                    onPress: resetUserNumHandler
                }] 
            );
            return;
        }
        setConfirmed(true);
        setSelectedNum(parseInt( userNum ));
        setUserNum('');
        Keyboard.dismiss();
    }

    let confirmedOutput;
    if(confirmed) {
        confirmedOutput = (
            <Card style={styles.StartedCard}>
                <Text style={styles.CardTitle}>The number to guess is:</Text>
                <NumberContainer style={styles.confirmedNumContainer}>{selectedNum}</NumberContainer>
                <MainButton style={styles.restBtn} onPress={() => props.startGame(selectedNum)}>START GAME</MainButton>
                {/* <Button title="START GAME" onPress={() => props.startGame(selectedNum)} color={Colors.primary}/> */}
            </Card>
        )
    }

    return(
        <ScrollView>
            <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={5}>
                <TouchableWithoutFeedback onPress={() => {
                    Keyboard.dismiss()
                }}>
                    <View style={styles.screen}>
                        <Text style={styles.title}>Start a new Game!</Text>
                        <Card style={styles.card}>
                            <Bodytext style={styles.cardTitle}><Text> Pick a number... any number! </Text></Bodytext>
                            <UserInput 
                                style={styles.textInput} 
                                blurOnSubmit
                                autoCapitalize='none'
                                autoCorrect={false}
                                keyboardType='number-pad'
                                maxLength={2}
                                onChangeText={onChangedTextHandler}
                                value={userNum}
                            />
                            <View style={styles.buttonContainer}>
                                <View style={{...styles.buttonWrapper, width: buttonWidth}}>
                                    <Button 
                                        title='Reset' 
                                        color={Colors.secondary} 
                                        onPress={resetUserNumHandler}
                                    />
                                </View>
                                <View style={{...styles.buttonWrapper, width: buttonWidth}}>
                                    <Button 
                                        title='Confirm' 
                                        color={Colors.primary} 
                                        onPress={setConfirmedHandler}
                                    />
                                </View>
                            </View> 
                        </Card>
                        { confirmedOutput }
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        width: '100%'
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
        fontFamily: 'open-sans-bold'
    },
    card: {
        width: '80%',
        minWidth: 250,
        maxWidth: '95%',
        alignItems: 'center',
        marginVertical: 10,
    },
    cardTitle: {
        color: Colors.primary
    },  
    textInput: {
        marginVertical: 20,
        width: '80%',
        textAlign: 'center',
        borderColor: '#aa33dd'
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: "space-between",
        paddingHorizontal: 15
    },
    buttonWrapper: {
        width: Dimensions.get('window').width / 4,
        color: 'white',
        borderColor: 'red',
        borderWidth: 1,
        borderRadius: 30, 
        overflow: 'hidden',
    },
    restBtn: {
        backgroundColor: Colors.secondary,
        paddingVertical: 10,
        marginVertical: 10,
    },
    StartedCard: {
        width: 300,
        maxWidth: '80%',
        padding:20,
        alignItems: 'center',
        marginVertical: 10,
    },
    confirmedNumContainer: {
        marginVertical: 10,
        padding: 10,
    }
})

export default StartGameScreen;