import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Modal,
  Dimensions,
  Pressable,
  TextInput,
  Image,
  Switch,
} from 'react-native';
import React, {useState, useCallback} from 'react';
import {BORDERRADIUS, COLORS, FONTSIZE, SPACING} from '../theme/theme';
import Header from '../components/Header';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import ScoreSummary from '../components/ScoreSummary';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ScoreDetails} from '../interfaces/ScoreDetails';
import {useFocusEffect} from '@react-navigation/native';
import {Dropdown, SelectCountry} from 'react-native-element-dropdown';
import {countryData} from '../data/countryData';
import {Venues} from '../interfaces/Venues';
import { Teams } from '../interfaces/Teams';

const HEIGHT = Dimensions.get('window').height;

const History = ({navigation, route}: any) => {
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
    server: 1,
  });
  const tabBarHeight = useBottomTabBarHeight();
  const [name, setName] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [mode, setMode] = useState(false);
  const [p1A, setP1A] = useState('');
  const [p1B, setP1B] = useState('');
  const [p2A, setP2A] = useState('');
  const [p2B, setP2B] = useState('');
  const [p1Country, setP1Country] = useState(1);
  const [p2Country, setP2Country] = useState(1);
  const [venue, setVenue] = useState(null);
  const [venues, setVenues] = useState<Venues[]>([]);
  const [teams, setTeams] = useState<Teams[]>([]);
  const [scores, setScores] = useState<ScoreDetails[]>([]);
  const [isFocusVenue, setIsFocusVenue] = useState(false);

  const createNewGame = () => {
    setP1A('');
    setP1B('');
    setP2A('');
    setP2B('');
    setP1Country(1);
    setP2Country(1);
    setVenue(null);
    setIsModalVisible(true);
  };

  const renderItem = (item: any) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
      </View>
    );
  };

  const getData = async () => {
    try {
      const profile = await AsyncStorage.getItem('profile');

      if (profile != null) {
        let p = JSON.parse(profile);
        setName(p.name);
      }

      const score = await AsyncStorage.getItem('score');
      setScores(JSON.parse(score));
      
      const currentGame = await AsyncStorage.getItem('currentGame');
      setCurrentGameDetails(JSON.parse(currentGame));
    } catch (e) {
      console.error(e);
    }
  };

  const getVenues = async () => {
    try {
      const venues = await AsyncStorage.getItem('venues');
      setVenues(JSON.parse(venues));
    } catch (e) {
      console.error(e);
    }
  };

  const getTeams = async () => {
    try {
      const teams = await AsyncStorage.getItem('teams');
      setTeams(JSON.parse(teams));
    } catch (e) {
      console.error(e);
    }
  };

  const handleStartGame = async () => {
    try {
      const value = {
        date: Date.now(),
        duration: 0,
        venue: venue,
        p1A: p1A,
        p1B: p1B,
        p2A: p2A,
        p2B: p2B,
        p1Country: p1Country,
        p2Country: p2Country,
        p1Score: 0,
        p2Score: 0,
        p1Set1Score: 0,
        p2Set1Score: 0,
        p1Set2Score: 0,
        p2Set2Score: 0,
        p1Set3Score: 0,
        p2Set3Score: 0,
        currentSet: 1,
        server: 1,
      };

      await AsyncStorage.setItem('currentGame', JSON.stringify(value));
      console.log('Current game added');

      setIsModalVisible(false);
      navigation.push('Score', {params: value});
    } catch (e) {
      console.error(e);
    }
  };

  const handleCurrentGame = () => {
    navigation.push('Score', {params: currentGameDetails});
  };

  useFocusEffect(
    useCallback(() => {
      // Function to be called every time the screen is focused
      getData();
      getVenues();
      getTeams();

      // Clean up function to be called when the screen is unfocused
      return () => {
        // console.log('Home Screen is unfocused');
      };
    }, []),
  );

  return (
    <View style={styles.screenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewFlex}>
        <View
          style={[styles.scrollViewInnerView, {marginBottom: tabBarHeight}]}>
          <View style={styles.bodyContainer}>
            <Header
              time={false}
              icon={false}
              title={name != null ? 'Welcome ' + name + '!' : 'Welcome!'}
              subtitle="It requires control, strength & measured movement."
              isProfile={false}
              isBack={false}
              isSettings={false}
            />
            <View style={styles.content}>
              {currentGameDetails && (
                <View style={styles.currentGameContainer}>
                  <TouchableOpacity
                    style={styles.buttonCurrentGame}
                    onPress={() => {
                      handleCurrentGame();
                    }}>
                    <Text style={styles.buttonTextCurrentGame}>
                      ON-GOING GAME
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
              <ScoreSummary withHeader={true} scoreDetails={scores} />
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => createNewGame()}>
              <Text style={styles.buttonText}>CREATE A NEW GAME</Text>
            </TouchableOpacity>
          </View>

          {/* players info modal */}
          <Modal
            visible={isModalVisible}
            onRequestClose={() => setIsModalVisible(false)}
            animationType="fade"
            transparent>
            <Pressable
              style={[
                styles.modalPressable,
                {height: mode ? HEIGHT / 3.7 : HEIGHT / 2.3},
              ]}
              onPress={() => setIsModalVisible(false)}
            />
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollViewFlex}>
              <View style={styles.modalContent}>
                <View style={styles.headerContainer}>
                  <Text style={styles.headerTitle}>Players Info</Text>
                  <View style={styles.modeContainer}>
                    <Text style={styles.modeTitle}>SINGLES</Text>
                    <Switch
                      value={mode}
                      onValueChange={() =>
                        setMode(previousState => !previousState)
                      }
                      trackColor={{
                        false: COLORS.primaryGreenHex,
                        true: COLORS.primaryGreenHex,
                      }}
                      thumbColor="#f4f3f4"
                    />
                    <Text style={styles.modeTitle}>DOUBLES</Text>
                  </View>
                </View>
                <View style={styles.inputFlagContainer}>
                  <SelectCountry
                    style={styles.dropdownCountry}
                    containerStyle={styles.containerStyleCountry}
                    selectedTextStyle={styles.selectedTextStyleCountry}
                    placeholderStyle={styles.placeholderStyle}
                    imageStyle={styles.imageStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    search
                    maxHeight={300}
                    value={p1Country}
                    data={teams != null ? teams.filter((venue, index) => venue.status === true).concat(countryData) : countryData}
                    valueField="value"
                    labelField="label"
                    imageField="image"
                    searchPlaceholder="search..."
                    onChange={(e: {value: React.SetStateAction<number>}) => {
                      setP1Country(e.value);
                    }}
                  />
                  <TextInput
                    placeholder="Player 1"
                    placeholderTextColor={COLORS.primaryLightGreyHex}
                    style={styles.input}
                    value={p1A}
                    onChangeText={value => setP1A(value)}
                  />
                </View>
                {mode ? (
                  <View style={styles.inputFlagContainer}>
                    <View style={{width: 70}}></View>
                    <TextInput
                      placeholder="Player 1"
                      placeholderTextColor={COLORS.primaryLightGreyHex}
                      style={styles.input}
                      editable={mode}
                      value={p1B}
                      onChangeText={value => setP1B(value)}
                    />
                  </View>
                ) : (
                  <></>
                )}
                <Text style={styles.versus}>versus</Text>
                <View style={styles.inputFlagContainer}>
                  <SelectCountry
                    style={styles.dropdownCountry}
                    containerStyle={styles.containerStyleCountry}
                    selectedTextStyle={styles.selectedTextStyleCountry}
                    placeholderStyle={styles.placeholderStyle}
                    imageStyle={styles.imageStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    search
                    maxHeight={300}
                    value={p2Country}
                    data={teams != null ? teams.filter((venue, index) => venue.status === true).concat(countryData) : countryData}
                    valueField="value"
                    labelField="label"
                    imageField="image"
                    searchPlaceholder="search..."
                    onChange={(e: {value: React.SetStateAction<number>}) => {
                      setP2Country(e.value);
                    }}
                  />
                  <TextInput
                    placeholder="Player 2"
                    placeholderTextColor={COLORS.primaryLightGreyHex}
                    style={styles.input}
                    value={p2A}
                    onChangeText={value => setP2A(value)}
                  />
                </View>
                {mode ? (
                  <View style={styles.inputFlagContainer}>
                    <View style={{width: 70}}></View>
                    <TextInput
                      placeholder="Player 2"
                      placeholderTextColor={COLORS.primaryLightGreyHex}
                      style={styles.input}
                      editable={mode}
                      value={p2B}
                      onChangeText={value => setP2B(value)}
                    />
                  </View>
                ) : (
                  <></>
                )}
                <View style={styles.inputFlagContainer}>
                  <Dropdown
                    // mode='modal'
                    dropdownPosition="top"
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={
                      venues == null
                        ? []
                        : venues
                            .filter((venue, index) => venue.status === true)
                            .sort((a, b) => b.label.localeCompare(a.label))
                    }
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocusVenue ? 'Select venue' : ''}
                    searchPlaceholder="search..."
                    value={venue}
                    onFocus={() => setIsFocusVenue(true)}
                    onBlur={() => setIsFocusVenue(false)}
                    onChange={(item: {value: React.SetStateAction<null>}) => {
                      setVenue(item.value);
                      setIsFocusVenue(false);
                    }}
                    renderItem={renderItem}
                  />
                </View>
                <View style={styles.buttonStartContainer}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={handleStartGame}>
                    <Text style={styles.buttonText}>START</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </Modal>
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
    gap: SPACING.space_15,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.space_20,
    padding: SPACING.space_20,
  },
  buttonStartContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.space_20,
    paddingTop: SPACING.space_20,
    paddingBottom: SPACING.space_20,
  },
  button: {
    backgroundColor: COLORS.primaryGreenHex,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: SPACING.space_48,
    borderRadius: BORDERRADIUS.radius_4,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
  },
  modalContent: {
    flex: 1,
    backgroundColor: COLORS.primaryDarkGrayHex,
    padding: SPACING.space_30,
    borderTopLeftRadius: BORDERRADIUS.radius_40,
    borderTopRightRadius: BORDERRADIUS.radius_40,
    gap: SPACING.space_20,
  },
  modalPressable: {
    backgroundColor: COLORS.primaryBlackHex,
    opacity: 0.7,
  },
  headerTitle: {
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_20,
    fontWeight: 'bold',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    flex: 1,
    backgroundColor: COLORS.quarternaryWhiteRGBA,
    color: COLORS.primaryWhiteHex,
    borderRadius: BORDERRADIUS.radius_5,
    paddingHorizontal: SPACING.space_20,
    paddingTop: SPACING.space_14,
    fontSize: FONTSIZE.size_14,
    textAlignVertical: 'top',
    height: 50,
  },
  versus: {
    color: COLORS.secondaryWhiteRGBA,
    fontSize: FONTSIZE.size_14,
    textAlign: 'center',
  },
  inputFlagContainer: {
    flexDirection: 'row',
    gap: SPACING.space_20,
    alignItems: 'center',
  },
  flag: {},
  modeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.space_2,
  },
  modeTitle: {
    color: COLORS.primaryWhiteRGBA,
    fontSize: FONTSIZE.size_11,
  },
  currentGameContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  buttonCurrentGame: {
    width: 110,
    height: SPACING.space_24,
    paddingTop: SPACING.space_4,
    backgroundColor: COLORS.primaryYellowHex,
    borderRadius: BORDERRADIUS.radius_4,
  },
  buttonTextCurrentGame: {
    fontWeight: 'bold',
    fontSize: FONTSIZE.size_11,
    color: COLORS.primaryBlackHex,
    textAlign: 'center',
  },

  // dropdowns
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryBlackRGBA,
  },
  imageStyle: {
    width: 37,
    height: 21,
  },
  dropdown: {
    flex: 1,
    backgroundColor: COLORS.quarternaryWhiteRGBA,
    borderRadius: BORDERRADIUS.radius_5,
    paddingHorizontal: SPACING.space_20,
    fontSize: FONTSIZE.size_14,
    textAlignVertical: 'top',
    height: 55,
  },
  dropdownCountry: {
    paddingHorizontal: SPACING.space_10,
    width: 70,
    height: 55,
  },
  containerStyleCountry: {
    width: '50%',
  },
  placeholderStyle: {
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteRGBA,
  },
  selectedTextStyle: {
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
  },
  selectedTextStyleCountry: {
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryBlackHex,
    marginLeft: 7,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: FONTSIZE.size_14,
    fontStyle: 'italic',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});

export default History;
