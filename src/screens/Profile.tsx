import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState, useCallback} from 'react';
import {BORDERRADIUS, COLORS, FONTSIZE, SPACING} from '../theme/theme';
import Header from '../components/Header';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Dropdown, SelectCountry} from 'react-native-element-dropdown';
import { countryData } from '../data/countryData';
import { Genders } from '../interfaces/Genders';
import {useFocusEffect} from '@react-navigation/native';

const Profile = () => {
  const tabBarHeight = useBottomTabBarHeight();
  const [title, setTitle] = useState('');
  const [country, setCountry] = useState(1);
  const [age, setAge] = useState<number>(0);
  const [ageInputValue, setAgeInputValue] = useState<string>('');
  const [gender, setGender] = useState(null);
  const [bio, setBio] = useState('');
  const [genders, setGenders] = useState<Genders[]>([]);

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
      const parsedAgeValue = parseInt(ageInputValue); // Ensure the input value is parsed to a number
      if (!isNaN(parsedAgeValue)) {
        setAge(parsedAgeValue);
      }

      const value = {
        name: 'Lassi Haapanen',
        title: title,
        country: country,
        age: age,
        gender: gender,
        biography: bio,
      };

      await AsyncStorage.setItem('profile', JSON.stringify(value));
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
        setTitle(p.title);
        setCountry(p.country);
        setAge(p.age);
        setAgeInputValue(p.age.toString());
        setGender(p.gender);
        setBio(p.biography);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const getGenders = async () => {
    try {
      const genders = await AsyncStorage.getItem('genders');
      setGenders(JSON.parse(genders));
    } catch (e) {
      console.error(e);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getData();
      getGenders();
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
              title="Lassi Haapanen"
              subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod."
              isProfile={true}
              isBack={true}
              isSettings={true}
            />

            <View style={styles.content}>
              <TextInput
                placeholder="Title"
                placeholderTextColor={COLORS.primaryLightGreyHex}
                style={styles.input}
                value={title}
                onChangeText={value => setTitle(value)}
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
                  value={country}
                  data={countryData}
                  valueField="value"
                  labelField="label"
                  imageField="image"
                  placeholder={!isFocusCountry ? '' : ''}
                  searchPlaceholder="search..."
                  onChange={(e: { value: React.SetStateAction<number>; }) => {
                    setCountry(e.value);
                  }}
                />
                <TextInput
                  placeholder="Age"
                  placeholderTextColor={COLORS.primaryLightGreyHex}
                  style={styles.input}
                  value={ageInputValue}
                  onChangeText={setAgeInputValue}
                  keyboardType="numeric"
                />
                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={genders == null ? [] : genders.filter((gender, index) => gender.status === true)}
                  labelField="label"
                  valueField="value"
                  placeholder={!isFocusGender ? 'Gender' : ''}
                  searchPlaceholder="search..."
                  value={gender}
                  onFocus={() => setIsFocusGender(true)}
                  onBlur={() => setIsFocusGender(false)}
                  onChange={(item: {value: React.SetStateAction<null>}) => {
                    setGender(item.value);
                    setIsFocusGender(false);
                  }}
                  renderItem={renderItem}
                />
              </View>
              <TextInput
                editable
                multiline
                numberOfLines={10}
                placeholder="Biography"
                placeholderTextColor={COLORS.primaryLightGreyHex}
                style={styles.input}
                value={bio}
                onChangeText={value => setBio(value)}
              />
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={saveData}>
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
