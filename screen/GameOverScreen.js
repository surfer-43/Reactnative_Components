import React from 'react';
import {
    View,
    Text,
    Button,
    Image,
    StyleSheet
} from 'react-native';

import Bodytext from '../components/BodyText'

import Colors from '../constants/colors';
import DefaultStyles from '../constants/defaultStyles'

const GameOverScreen = (props) => {
    const { guessCount, userNum } = props;
    return (
        <View style={styles.screen}>
            <Text style={DefaultStyles.title}>Game Over</Text>
            <View style={styles.imageContainer}>
                <Image
                // source={require('../assets/original.png')}
                source={{
                    uri:
                    'https://cdn.pixabay.com/photo/2016/05/05/23/52/mountain-summit-1375015_960_720.jpg'
                }}
                style={styles.image}
                resizeMode="cover"
                />
            </View>
            <Bodytext>Your number was guessed in: {guessCount}</Bodytext>
            <Bodytext>Your number was: {userNum}</Bodytext>
            <Button title="Restart" color={Colors.primary} onPress={props.restart} />
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
      }
})

export default GameOverScreen;