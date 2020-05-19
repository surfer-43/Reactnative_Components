import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import Header from './components/Header';
import StartGameScreen from './screen/StartGameScreen';
import GameScreen from './screen/GameScreen'
import GameOverScreen from './screen/GameOverScreen'

export default function App() {
  const [ userNum, setUserNum ] = useState();
  const [ numRounds, setNumRounds ] = useState(0);

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

  let displayedScreen = <StartGameScreen startGame={startGameHandler}/>
  if( userNum && numRounds <= 0 ) {
    displayedScreen = <GameScreen chosenNum={userNum} gameOver={gameOverHandler}/>;
  } else if( numRounds > 0) {
    displayedScreen = <GameOverScreen guessCount={numRounds} userNum={userNum} restart={restartHandler}/>
  }

  return (
    <View style={styles.container}>
      <Header title='Guess A Number'/>
      {displayedScreen}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  }
});
