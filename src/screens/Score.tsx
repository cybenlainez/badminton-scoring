import {
  Button,
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Image,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {BORDERRADIUS, COLORS, FONTSIZE, SPACING} from '../theme/theme';
import Header from '../components/Header';
import ScoreSummary from '../components/ScoreSummary';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {format} from 'date-fns';
import {ScoreDetails} from '../interfaces/ScoreDetails';
import {countryData} from '../data/countryData';

const Score = ({navigation, route}: any) => {
  const [currentGameDetails, setCurrentGameDetails] = useState<ScoreDetails>({
    date: new Date(),
    duration: 0,
    venue: route.params ? route.params.venue : '',
    p1A: route.params ? route.params.p1A : '',
    p1B: route.params ? route.params.p1B : '',
    p2A: route.params ? route.params.p2A : '',
    p2B: route.params ? route.params.p2B : '',
    p1Country: route.params ? route.params.p1Country : '',
    p2Country: route.params ? route.params.p2Country : '',
    p1Score: 0,
    p2Score: 0,
    p1Set1Score: 0,
    p2Set1Score: 0,
    p1Set2Score: 0,
    p2Set2Score: 0,
    p1Set3Score: 0,
    p2Set3Score: 0,
    currentSet: 1,
  });
  const [currentSet, setCurrentSet] = useState(1);
  const [isPlayer1Serving, setIsPlayer1Serving] = useState(true);
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);

  const findCountry = (id: string) => {
    const row = countryData.find((item: any) => item.value === id);
    return row
      ? row['image']['uri']
      : 'https://www.worldometers.info//img/flags/small/tn_fi-flag.gif';
  };

  function scoreConditions(): boolean {
    if (player1Score >= 21 || player2Score >= 21) {
      if (player1Score > player2Score + 1 || player2Score > player1Score + 1) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  const incrementPlayer1 = () => {
    setPlayer1Score(player1Score + 1);
    setIsPlayer1Serving(true);
  };

  const incrementPlayer2 = () => {
    setPlayer2Score(player2Score + 1);
    setIsPlayer1Serving(false);
  };

  const decrementPlayer1 = () => {
    setPlayer1Score(player1Score - 1);
  };

  const decrementPlayer2 = () => {
    setPlayer2Score(player2Score - 1);
  };

  const handleChangeFavor = () => {
    if (isPlayer1Serving) {
      setIsPlayer1Serving(false);
    } else {
      setIsPlayer1Serving(true);
    }
  };

  const handlePause = () => {
    updateCurrentGame(false);
  };

  const handleReset = () => {
    setPlayer1Score(0);
    setPlayer2Score(0);
    setIsPlayer1Serving(true);
  };

  const updateCurrentGame = async (reset?: boolean) => {
    try {
      const value: ScoreDetails = {
        date: new Date(),
        duration: 0,
        venue: currentGameDetails.venue,
        p1A: currentGameDetails.p1A,
        p1B: currentGameDetails.p1B,
        p2A: currentGameDetails.p2A,
        p2B: currentGameDetails.p2B,
        p1Country: currentGameDetails.p1Country,
        p2Country: currentGameDetails.p2Country,
        p1Score: player1Score,
        p2Score: player2Score,
        p1Set1Score:
          currentSet === 1 ? player1Score : currentGameDetails.p1Set1Score,
        p2Set1Score:
          currentSet === 1 ? player2Score : currentGameDetails.p2Set1Score,
        p1Set2Score:
          currentSet === 2 ? player1Score : currentGameDetails.p1Set2Score,
        p2Set2Score:
          currentSet === 2 ? player2Score : currentGameDetails.p2Set2Score,
        p1Set3Score:
          currentSet === 3 ? player1Score : currentGameDetails.p1Set3Score,
        p2Set3Score:
          currentSet === 3 ? player2Score : currentGameDetails.p2Set3Score,
        currentSet: reset ? 1 : currentSet,
      };

      setCurrentGameDetails(value);
      await AsyncStorage.setItem('currentGame', JSON.stringify(value));
      console.log('Current game updated');
    } catch (e) {
      console.error(e);
    }
  };

  const saveSet = async () => {
    updateCurrentGame();
    setCurrentSet(currentSet + 1);
    setPlayer1Score(0);
    setPlayer2Score(0);
    ToastAndroid.showWithGravity(
      `Set ${currentSet} has been saved.`,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  };

  const endGame = async () => {
    if (currentSet > 3) {
      try {
        const score = await AsyncStorage.getItem('score');
        let newScore = JSON.parse(score);

        const value = {
          date: Date.now(),
          duration: 0,
          venue: currentGameDetails.venue,
          p1A: currentGameDetails.p1A,
          p1B: currentGameDetails.p1B,
          p2A: currentGameDetails.p2A,
          p2B: currentGameDetails.p2B,
          p1Country: currentGameDetails.p1Country,
          p2Country: currentGameDetails.p2Country,
          p1Score: player1Score,
          p2Score: player2Score,
          p1Set1Score: currentGameDetails.p1Set1Score,
          p2Set1Score: currentGameDetails.p2Set1Score,
          p1Set2Score: currentGameDetails.p1Set2Score,
          p2Set2Score: currentGameDetails.p2Set2Score,
          p1Set3Score: currentGameDetails.p1Set3Score,
          p2Set3Score: currentGameDetails.p2Set3Score,
          currentSet: currentSet,
        };

        if (!Array.isArray(newScore)) {
          newScore = [];
        }

        newScore.push(value);

        await AsyncStorage.setItem('currentGame', '');
        await AsyncStorage.setItem('score', JSON.stringify(newScore));
        console.log('Data saved');
        navigation.goBack();
      } catch (e) {
        console.error(e);
      }
    } else {
      navigation.goBack();
    }
  };

  const getCurrentData = async () => {
    try {
      const currentGame = await AsyncStorage.getItem('currentGame');

      if (currentGame != null) {
        setCurrentGameDetails(JSON.parse(currentGame));


        // CYHERE - FURTHER TESTING
        console.log(currentGame)
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getCurrentData();
  }, []);

  return (
    <View style={styles.screenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewFlex}>
        <View style={styles.scrollViewInnerView}>
          <View style={styles.bodyContainer}>
            <Header
              time={true}
              icon={true}
              title={format(currentGameDetails.date, 'MMMM d, yyyy')}
              subtitle={currentGameDetails.venue}
              isProfile={false}
              isBack={true}
              isSettings={true}
            />

            <View style={styles.content}>
              <View style={styles.table}>
                <View style={styles.row}>
                  <View style={[styles.cell, styles.cellTopLeft]}>
                    <View style={styles.playerContainer}>
                      <Image
                        style={styles.flag}
                        source={{
                          uri: findCountry(currentGameDetails.p1Country),
                        }}
                      />
                      <View>
                        <Text style={styles.name}>
                          {currentGameDetails.p1A}
                        </Text>
                        <Text style={styles.name}>
                          {currentGameDetails.p1B}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={[styles.cell, styles.cellTopRight]}>
                    <View style={styles.playerContainer}>
                      <Image
                        style={styles.flag}
                        source={{
                          uri: findCountry(currentGameDetails.p2Country),
                        }}
                      />
                      <View>
                        <Text style={styles.name}>
                          {currentGameDetails.p2A}
                        </Text>
                        <Text style={styles.name}>
                          {currentGameDetails.p2B}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={styles.row}>
                  <View style={[styles.cell, styles.cellBottomLeft]}>
                    <View style={styles.scoreContainerLeft}>
                      {/* <View style={styles.scoreButtonsContainer}>
                            <TouchableOpacity style={styles.plusContainer} onPress={() => {}}>
                              <Image style={styles.plus} source={require('../assets/images/plus.png')} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.minusContainer} onPress={() => {}}>
                              <Image style={styles.minus} source={require('../assets/images/minus.png')} />
                            </TouchableOpacity>
                          </View> */}
                      <Text style={[styles.score, styles.scoreLeft]}>
                        {player1Score}
                      </Text>
                    </View>
                    {isPlayer1Serving ? (
                      <TouchableOpacity
                        style={styles.shuttle}
                        onPress={() => handleChangeFavor()}>
                        <Image
                          source={require('../assets/images/shuttle.png')}
                        />
                      </TouchableOpacity>
                    ) : (
                      <></>
                    )}
                  </View>
                  <View style={[styles.cell, styles.cellBottomRight]}>
                    <View style={styles.scoreContainerRight}>
                      <Text style={[styles.score, styles.scoreRight]}>
                        {player2Score}
                      </Text>
                      {/* <View style={styles.scoreButtonsContainer}>
                            <TouchableOpacity style={styles.plusContainer} onPress={() => {}}>
                              <Image style={styles.plus} source={require('../assets/images/plus.png')} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.minusContainer} onPress={() => {}}>
                              <Image style={styles.minus} source={require('../assets/images/minus.png')} />
                            </TouchableOpacity>
                          </View> */}
                    </View>
                    {!isPlayer1Serving ? (
                      <TouchableOpacity
                        style={styles.shuttle}
                        onPress={() => handleChangeFavor()}>
                        <Image
                          source={require('../assets/images/shuttle.png')}
                        />
                      </TouchableOpacity>
                    ) : (
                      <></>
                    )}
                  </View>
                </View>
              </View>

              {(() => {
                if (isPlayer1Serving) {
                  if (player1Score % 2 == 1) {
                    return (
                      <View style={styles.courtContainer}>
                        <TouchableOpacity
                          onPress={() => incrementPlayer1()}
                          delayLongPress={2000}
                          onLongPress={() => decrementPlayer1()}>
                          <Image
                            style={styles.courtImage}
                            source={require('../assets/images/courtLeftTopServer.png')}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => incrementPlayer2()}
                          delayLongPress={2000}
                          onLongPress={() => decrementPlayer2()}>
                          <Image
                            style={styles.courtImage}
                            source={require('../assets/images/courtRightBlank.png')}
                          />
                        </TouchableOpacity>
                      </View>
                    );
                  } else if (player1Score % 2 == 0) {
                    return (
                      <View style={styles.courtContainer}>
                        <TouchableOpacity
                          onPress={() => incrementPlayer1()}
                          delayLongPress={2000}
                          onLongPress={() => decrementPlayer1()}>
                          <Image
                            style={styles.courtImage}
                            source={require('../assets/images/courtLeftBottomServer.png')}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => incrementPlayer2()}
                          delayLongPress={2000}
                          onLongPress={() => decrementPlayer2()}>
                          <Image
                            style={styles.courtImage}
                            source={require('../assets/images/courtRightBlank.png')}
                          />
                        </TouchableOpacity>
                      </View>
                    );
                  } else {
                    return (
                      <Image
                        style={styles.courtImage}
                        source={require('../assets/images/courtLeftBlank.png')}
                      />
                    );
                  }
                } else {
                  if (player2Score % 2 == 1) {
                    return (
                      <View style={styles.courtContainer}>
                        <TouchableOpacity
                          onPress={() => incrementPlayer1()}
                          delayLongPress={2000}
                          onLongPress={() => decrementPlayer1()}>
                          <Image
                            style={styles.courtImage}
                            source={require('../assets/images/courtLeftBlank.png')}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => incrementPlayer2()}
                          delayLongPress={2000}
                          onLongPress={() => decrementPlayer2()}>
                          <Image
                            style={styles.courtImage}
                            source={require('../assets/images/courtRightBottomServer.png')}
                          />
                        </TouchableOpacity>
                      </View>
                    );
                  } else if (player2Score % 2 == 0) {
                    return (
                      <View style={styles.courtContainer}>
                        <TouchableOpacity
                          onPress={() => incrementPlayer1()}
                          delayLongPress={2000}
                          onLongPress={() => decrementPlayer1()}>
                          <Image
                            style={styles.courtImage}
                            source={require('../assets/images/courtLeftBlank.png')}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => incrementPlayer2()}
                          delayLongPress={2000}
                          onLongPress={() => decrementPlayer2()}>
                          <Image
                            style={styles.courtImage}
                            source={require('../assets/images/courtRightTopServer.png')}
                          />
                        </TouchableOpacity>
                      </View>
                    );
                  } else {
                    return (
                      <Image
                        style={styles.courtImage}
                        source={require('../assets/images/courtRightBlank.png')}
                      />
                    );
                  }
                }
              })()}

              <ScoreSummary
                withHeader={false}
                scoreDetails={[currentGameDetails]}
              />
            </View>
          </View>

          <View
            style={[
              styles.buttonContainer,
              {display: currentSet <= 3 ? 'flex' : 'none'},
            ]}>
            <TouchableOpacity
              style={styles.buttonReset}
              onPress={() => {
                handleReset();
              }}>
              <Text style={styles.buttonTextReset}>RESET</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonPause}
              onPress={() => {
                handlePause();
              }}>
              <Text style={styles.buttonTextPause}>PAUSE</Text>
            </TouchableOpacity>
          </View>

          <View
            style={[
              styles.buttonContainer,
              {display: currentSet <= 3 && scoreConditions() ? 'flex' : 'none'},
            ]}>
            <TouchableOpacity
              style={styles.buttonSave}
              onPress={() => {
                saveSet();
              }}>
              <Text style={styles.buttonTextSave}>PROCEED TO THE NEXT SET</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.buttonEnd}
              onPress={() => {
                endGame();
              }}>
              <Text style={styles.buttonTextSave}>SAVE &amp; EXIT</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  scrollViewFlex: {
    flexGrow: 1,
  },
  scrollViewInnerView: {
    flex: 1,
    justifyContent: 'space-between',
  },
  bodyContainer: {
    flex: 1,
  },
  content: {
    paddingHorizontal: SPACING.space_20,
    paddingVertical: SPACING.space_20,
    gap: SPACING.space_20,
  },

  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.space_10,
    paddingBottom: SPACING.space_15,
    paddingLeft: SPACING.space_20,
    paddingRight: SPACING.space_20,
  },
  buttonReset: {
    backgroundColor: COLORS.primaryWhiteHex,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: SPACING.space_48,
    borderRadius: BORDERRADIUS.radius_4,
  },
  buttonPause: {
    backgroundColor: COLORS.primaryYellowHex,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: SPACING.space_48,
    borderRadius: BORDERRADIUS.radius_4,
  },
  buttonSave: {
    backgroundColor: COLORS.primaryGreenHex,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: SPACING.space_48,
    borderRadius: BORDERRADIUS.radius_4,
  },
  buttonEnd: {
    backgroundColor: COLORS.primaryBlackRGBA,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: SPACING.space_48,
    borderRadius: BORDERRADIUS.radius_4,
  },
  buttonTextReset: {
    fontWeight: 'bold',
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryBlackHex,
  },
  buttonTextPause: {
    fontWeight: 'bold',
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryBlackHex,
  },
  buttonTextSave: {
    fontWeight: 'bold',
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
  },

  table: {},
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    alignItems: 'center',
    fontSize: FONTSIZE.size_12,
    color: COLORS.primaryWhiteHex,
    borderColor: COLORS.secondaryWhiteRGBA,
  },
  cellTopLeft: {
    borderBottomWidth: 1,
    borderRightWidth: 1,
  },
  cellTopRight: {
    flex: 1,
    borderBottomWidth: 1,
    textAlign: 'center',
    color: COLORS.primaryWhiteHex,
    borderColor: COLORS.secondaryWhiteRGBA,
  },
  cellBottomLeft: {
    flex: 1,
    borderRightWidth: 1,
    textAlign: 'center',
    color: COLORS.primaryWhiteHex,
    borderColor: COLORS.secondaryWhiteRGBA,
  },
  cellBottomRight: {
    flex: 1,
    textAlign: 'center',
    color: COLORS.primaryWhiteHex,
    borderColor: COLORS.secondaryWhiteRGBA,
  },

  playerContainer: {
    flexDirection: 'row',
    gap: SPACING.space_10,
    paddingTop: SPACING.space_20,
    paddingBottom: SPACING.space_20,
    paddingLeft: SPACING.space_8,
    paddingRight: SPACING.space_8,
    alignItems: 'flex-start',
  },
  flag: {
    width: 49,
    height: 28,
  },
  name: {
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_11,
  },
  shuttle: {
    position: 'absolute',
    top: SPACING.space_10,
    right: SPACING.space_7,
  },
  scoreContainerLeft: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    // paddingRight: SPACING.space_20,
  },
  scoreContainerRight: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    // paddingLeft: SPACING.space_20,
  },
  scoreButtonsContainer: {
    justifyContent: 'space-between',
    marginTop: SPACING.space_20,
    marginBottom: SPACING.space_15,
  },
  plusContainer: {
    backgroundColor: COLORS.tertiaryWhiteRGBA,
    padding: SPACING.space_12,
    borderRadius: BORDERRADIUS.radius_20,
    alignItems: 'center',
  },
  minusContainer: {
    backgroundColor: COLORS.tertiaryWhiteRGBA,
    padding: SPACING.space_12,
    borderRadius: BORDERRADIUS.radius_20,
    justifyContent: 'center',
    height: FONTSIZE.size_36,
    alignItems: 'center',
  },
  plus: {
    height: FONTSIZE.size_12,
    width: FONTSIZE.size_12,
  },
  minus: {
    height: FONTSIZE.size_4,
    width: FONTSIZE.size_12,
  },
  score: {
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_100,
    fontWeight: '800',
  },
  scoreLeft: {
    // marginLeft: SPACING.space_10,
  },
  scoreRight: {
    // marginRight: SPACING.space_10,
  },
  courtContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  courtImage: {},
});

export default Score;
