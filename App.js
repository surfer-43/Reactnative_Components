import React, { useState } from 'react';
import {
  View ,
  SafeAreaView, 
  StyleSheet, 
} from 'react-native';

/**
 * special component from expo to take care of loading assests that should
 * be available on first render
 */
import { AppLoading } from 'expo'

import Header from './components/Header';
import StartGameScreen from './screen/StartGameScreen';
import GameScreen from './screen/GameScreen'
import GameOverScreen from './screen/GameOverScreen';

import * as Font from 'expo-font';

/**
 * fetching fonts only needs to happen once
 * do it outside any components
 */
const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require('./assets/fonts/OpenSans-Regular.ttf'),
    "open-sans-bold": require('./assets/fonts/OpenSans-Bold.ttf')
  })
}

export default function App() {
  const [ userNum, setUserNum ] = useState();
  const [ numRounds, setNumRounds ] = useState(0);
  const [ fontsLoaded, setFontsLoaded ] = useState(false);

  const startGameHandler = (selectedNum) => {
    setUserNum(selectedNum);
  }

  const gameOverHandler = (rounds) => {
    setNumRounds(rounds);
  }

  const restartHandler = () => {
    setNumRounds(0);
    setUserNum(null);
  }

  if( !fontsLoaded ) {
    /**
     * AppLoading specifically is listening for a promise
     * returned from the function you pass to it - fetchFonts
     */
    return <AppLoading 
      startAsync={fetchFonts} 
      onFinish={() => {
        return setFontsLoaded(true);
      }}
      onError={(error)=> console.log("the fonts promise failed: ", error)}
    />
  }

  let displayedScreen = <StartGameScreen startGame={startGameHandler}/>
  if( userNum && numRounds <= 0 ) {
    displayedScreen = <GameScreen chosenNum={userNum} gameOver={gameOverHandler}/>;
  } else if( numRounds > 0) {
    displayedScreen = <GameOverScreen guessCount={numRounds} userNum={userNum} restart={restartHandler}/>
  }

  return (
    <SafeAreaView style={styles.container}>
        <Header title='Guess A Number'/>
        {displayedScreen}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  }
});
