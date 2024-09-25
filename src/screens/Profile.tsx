import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState, useCallback} from 'react';
import {BORDERRADIUS, COLORS, FONTSIZE, SPACING} from '../theme/theme';
import Header from '../components/Header';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Dropdown, SelectCountry} from 'react-native-element-dropdown';
import {countryData} from '../data/countryData';
import {Genders} from '../interfaces/Genders';
import {useFocusEffect} from '@react-navigation/native';
import { Teams } from '../interfaces/Teams';
import {genderData} from '../data/genderData';

const Profile = () => {
  const tabBarHeight = useBottomTabBarHeight();
  const [initialData, setInitialData] = useState({
    uri: '',
    name: '',
    title: '',
    country: 1,
    age: '',
    gender: null,
    biography: '',
  });
  const [currentData, setCurrentData] = useState({
    uri: '',
    name: '',
    title: '',
    country: 1,
    age: '',
    gender: null,
    biography: '',
  });
  const [hasChanges, setHasChanges] = useState(false);
  const [genders, setGenders] = useState<Genders[]>([]);
  const [teams, setTeams] = useState<Teams[]>([]);

  const [isFocusGender, setIsFocusGender] = useState(false);
  const [isFocusCountry, setIsFocusCountry] = useState(false);

  const renderItem = (item: any) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
      </View>
    );
  };

  const saveData = async () => {
    try {
      const profile = await AsyncStorage.getItem('profile');
      let pUri;

      if (profile != null) {
        let p = JSON.parse(profile);
        pUri = p.uri;
      }

      const value = {
        uri: pUri,
        name: currentData.name,
        title: currentData.title,
        country: currentData.country,
        age: currentData.age,
        gender: currentData.gender,
        biography: currentData.biography,
      };

      await AsyncStorage.setItem('profile', JSON.stringify(value));
      setInitialData(currentData);
      setHasChanges(false);
      ToastAndroid.showWithGravity(
        `The changes have been saved.`,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      console.log('Data saved');
    } catch (e) {
      console.error(e);
    }
  };

  const getData = async () => {
    try {
      const profile = await AsyncStorage.getItem('profile');

      if (profile != null) {
        let p = JSON.parse(profile);
        setInitialData(p);
        setCurrentData(p);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const getGenders = async () => {
    try {
      const genders = await AsyncStorage.getItem('genders');
      const allGenders = genders != null ? genderData.concat(JSON.parse(genders)) : genderData;
      setGenders(allGenders);
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

  const handleChange = (key: string, value: any) => {
    setCurrentData({
      ...currentData,
      [key]: value
    });
  };

  useFocusEffect(
    useCallback(() => {
      getData();
      getGenders();
      getTeams();
    }, []),
  );

  useFocusEffect(
    useCallback(() => {
      const hasChanges = 
        currentData.uri !== initialData.uri || 
        currentData.name !== initialData.name || 
        currentData.title !== initialData.title || 
        currentData.country !== initialData.country || 
        currentData.age !== initialData.age || 
        currentData.gender !== initialData.gender || 
        currentData.biography !== initialData.biography;
      setHasChanges(hasChanges);
    }, [currentData, initialData]),
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
              title={currentData.name == '' ? '(enter your name)' : currentData.name}
              subtitle={currentData.title == '' ? '(enter your title/description)' : currentData.title}
              isProfile={true}
              isBack={true}
              isSettings={true}
              duration={null}
            />

            <View style={styles.content}>
              <TextInput
                placeholder="Name"
                placeholderTextColor={COLORS.primaryLightGreyHex}
                style={styles.input}
                value={currentData.name}
                onChangeText={value => handleChange('name', value)}
              />
              <TextInput
                placeholder="Title"
                placeholderTextColor={COLORS.primaryLightGreyHex}
                style={styles.input}
                value={currentData.title}
                onChangeText={value => handleChange('title', value)}
              />
              <View style={styles.threeColumns}>
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
                  value={currentData.country}
                  data={teams != null ? teams.filter((venue, index) => venue.status === true).concat(countryData) : countryData}
                  valueField="value"
                  labelField="label"
                  imageField="image"
                  placeholder={!isFocusCountry ? '' : ''}
                  searchPlaceholder="search..."
                  onChange={(e: {value: React.SetStateAction<number>}) => {
                    handleChange('country', e.value);
                  }}
                />
                <TextInput
                  placeholder="Age"
                  placeholderTextColor={COLORS.primaryLightGreyHex}
                  style={styles.input}
                  value={currentData.age}
                  onChangeText={value => handleChange('age', value)}
                  keyboardType="numeric"
                />
                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={
                    genders == null
                      ? []
                      : genders.filter(
                          (gender, index) => gender.status === true,
                        )
                  }
                  labelField="label"
                  valueField="value"
                  placeholder={!isFocusGender ? 'Gender' : ''}
                  searchPlaceholder="search..."
                  value={currentData.gender}
                  onFocus={() => setIsFocusGender(true)}
                  onBlur={() => setIsFocusGender(false)}
                  onChange={(item: {value: React.SetStateAction<null>}) => {
                    handleChange('gender', item.value);
                    setIsFocusGender(false);
                  }}
                  renderItem={renderItem}
                />
              </View>
              <TextInput
                editable
                multiline
                numberOfLines={9}
                placeholder="Biography"
                placeholderTextColor={COLORS.primaryLightGreyHex}
                style={styles.input}
                value={currentData.biography}
                onChangeText={value => handleChange('biography', value)}
              />
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity disabled={!hasChanges} style={hasChanges ? styles.button : styles.buttonDisabled} onPress={saveData}>
              <Text style={styles.buttonText}>SAVE</Text>
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
    gap: SPACING.space_20,
    padding: SPACING.space_20,
  },
  button: {
    backgroundColor: COLORS.primaryGreenHex,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: SPACING.space_48,
    borderRadius: BORDERRADIUS.radius_4,
  },
  buttonDisabled: {
    backgroundColor: COLORS.tertiaryWhiteRGBA,
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
  input: {
    flex: 1,
    backgroundColor: COLORS.quarternaryWhiteRGBA,
    color: COLORS.primaryWhiteHex,
    borderRadius: BORDERRADIUS.radius_5,
    paddingHorizontal: SPACING.space_20,
    paddingTop: SPACING.space_16,
    fontSize: FONTSIZE.size_14,
    textAlignVertical: 'top',
  },
  threeColumns: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    gap: SPACING.space_20,
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

export default Profile;
