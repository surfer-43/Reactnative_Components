import React from 'react';
import {
    View,
    Text,
    Image,
    Dimensions,
    ScrollView,
    StyleSheet
} from 'react-native';

import Bodytext from '../components/BodyText';
import MainButton from '../components/MainButton';

import Colors from '../constants/colors';
import DefaultStyles from '../constants/defaultStyles'

const GameOverScreen = (props) => {
    const { guessCount, userNum } = props;

    const imageSize = Dimensions.get('window').width >350 ? styles.bigImage : styles.smallImage;

    return (
        <ScrollView>
            <View style={styles.screen}>
                <Text style={{...styles.title, ...DefaultStyles.title}}>Game Over</Text>
                <View style={imageSize}>
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
                    <Bodytext style={styles.resultText}>
                        <Text style={DefaultStyles.bodyText}>Your number</Text>
                        <Text style={{...DefaultStyles.bodyText, ...styles.numToGuess}}>{userNum}</Text>
                        <Text style={DefaultStyles.bodyText}>was guessed in: </Text>
                        <Text style={{...DefaultStyles.bodyText, ...styles.triesToGuess}}>{guessCount} guesses</Text>
                    </Bodytext>
                </View>
                <MainButton style={styles.restBtn} onPress={props.restart}>Restart</MainButton>
                {/* <Button title="Restart" color={Colors.primary} onPress={props.restart} /> */}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        marginVertical: Dimensions.get('window').width < 400 ? 10 : 20,
    },
    restBtn: {
        backgroundColor: Colors.secondary,
        borderColor: Colors.primary,
        borderRadius: 25,
        borderWidth: 2
    },
    bigImage: {
        width: 300,
        height: 300,
        borderRadius: 150,
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden',
        marginVertical: 30
    },
    smallImage: {
        width: 200,
        height: 200,
        borderRadius: 100,
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden',
        marginVertical: 10
    },
    image: {
        width: '100%',
        height: '100%'
    },
    numToGuess: {
        fontFamily: 'open-sans-bold',
        color: Colors.primary,
        fontSize: 18,
        marginLeft: 5,
        marginRight: 5,
    },
    resultContainer: {
        width: '100%',
        marginVertical: 20,
        paddingHorizontal: 10
    },
    resultText: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'baseline',
        textAlign: "center",
        flexWrap: 'wrap',
        marginHorizontal: 10
    },
    triesToGuess: {
        fontFamily: 'open-sans-bold',
        color: Colors.secondary,
        fontSize: 18,
        marginLeft: 5,
        marginRight: 5,
    }

})

export default GameOverScreen;