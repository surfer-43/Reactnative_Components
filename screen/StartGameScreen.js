import React, { useState } from 'react';
import { 
    View, 
    Text, 
    Button, 
    TouchableWithoutFeedback, 
    Keyboard,
    Alert,
    StyleSheet 
} from 'react-native';

import Card from '../components/Card';
import UserInput from '../components/UserInput';
import NumberContainer from '../components/NumberContainer'

import Colors from '../constants/colors'

const StartGameScreen = () => {
    const [ userNum, setUserNum ] = useState('');
    const [ confirmed, setConfirmed ] = useState(false);
    const [ selectedNum, setSelectedNum ] = useState();

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
                <NumberContainer>{selectedNum}</NumberContainer>
                <Button title="START GAME" onPress={() => {console.log('start the game was called')}} color={Colors.primary}/>
            </Card>
        )
    }

    return(
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss()
        }}>
            <View style={styles.screen}>
                <Text style={styles.title}>Start a new Game!</Text>
                <Card style={styles.card}>
                    <Text>Pick a number... any number!</Text>
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
                        <View style={styles.buttonWrapper}>
                            <Button 
                                title='Reset' 
                                color={Colors.secondary} 
                                onPress={resetUserNumHandler}
                            />
                        </View>
                        <View style={styles.buttonWrapper}>
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
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    card: {
        width: 250,
        maxWidth: '80%',
        alignItems: 'center'
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
        width: 85,
        maxWidth: '50%',
        color: 'white',
        justifyContent:'space-between',
    },
    StartedCard: {
        width: 300,
        maxWidth: '80%',
        padding:30,
        alignItems: 'center'
    }
})

export default StartGameScreen;