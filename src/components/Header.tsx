import React, {useState, useCallback, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {BORDERRADIUS, COLORS, FONTSIZE, SPACING} from '../theme/theme';
import {useNavigation} from '@react-navigation/native';
import {launchImageLibrary} from 'react-native-image-picker';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface HeaderProps {
  time: boolean;
  icon: boolean;
  title: string;
  subtitle: string;
  isProfile: boolean;
  isBack: boolean;
  isSettings: boolean;
}

const formatTime = (time: any) => {
  const getSeconds = `0${time % 60}`.slice(-2);
  const minutes = Math.floor(time / 60);
  const getMinutes = `0${minutes % 60}`.slice(-2);
  const getHours = `0${Math.floor(time / 3600)}`.slice(-2);

  return `${getHours}:${getMinutes}:${getSeconds}`;
};

const Header: React.FC<HeaderProps> = ({
  time,
  icon,
  title,
  subtitle,
  isProfile,
  isBack,
  isSettings,
}) => {
  const navigation = useNavigation();
  const [headerTime, setHeaderTime] = useState(0); // Holds the elapsed time in seconds
  const [isRunning, setIsRunning] = useState(true); // Indicates if the timer is running
  const [uri, setUri] = useState(null);
  const [name, setName] = useState('');
  const [titleP, setTitleP] = useState('');
  const [country, setCountry] = useState(1);
  const [age, setAge] = useState<number>(0);
  const [gender, setGender] = useState(null);
  const [bio, setBio] = useState('');

  const selectImage = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 300,
      quality: 1,
    };

    launchImageLibrary(options, (response: any) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const selectedImage = response.assets[0].uri;
        setUri(selectedImage);
        saveData(selectedImage);
      }
    });
  };

  const saveData = async (selectedImage: string) => {
    try {
      const value = {
        uri: selectedImage,
        name: name,
        title: titleP,
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
        setUri(p.uri);
        setName(p.name);
        setTitleP(p.title);
        setCountry(p.country);
        setAge(p.age);
        setGender(p.gender);
        setBio(p.biography);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getData();

      // time
      let interval: any = null;

      if (isRunning) {
        interval = setInterval(() => {
          setHeaderTime(prevTime => prevTime + 1);
        }, 1000); // Increment time by 1 second
      } else if (!isRunning && headerTime !== 0) {
        clearInterval(interval);
      }
    }, [isRunning]),
  );

  return (
    <View style={styles.headerContainer}>
      <ImageBackground
        style={styles.itemBackgroundImage}
        source={
          isProfile
            ? require('../assets/images/bg-big.png')
            : require('../assets/images/bg-small.png')
        }>
        <View style={styles.headerControlsContainer}>
          <TouchableOpacity
            onPress={() =>
              isBack ? navigation.goBack() : navigation.navigate('')
            }>
            <Image
              source={
                isBack
                  ? require('../assets/images/back.png')
                  : require('../assets/images/lock.png')
              }
              style={styles.image}
            />
          </TouchableOpacity>
          {time ? (
            <Text style={styles.time}>{formatTime(headerTime)}</Text>
          ) : (
            <></>
          )}
          <TouchableOpacity
            onPress={() =>
              isSettings
                ? navigation.navigate('Settings')
                : navigation.navigate('Profile')
            }>
            <Image
              source={
                isSettings
                  ? require('../assets/images/settings.png')
                  : require('../assets/images/profile.png')
              }
              style={styles.image}
            />
          </TouchableOpacity>
        </View>
        {isProfile ? (
          <View style={styles.profileContainer}>
            {/* <Image source={require('../assets/images/avatar.png')} /> */}

            <TouchableOpacity onPress={selectImage}>
              <Image
                source={
                  uri ? {uri: uri} : require('../assets/images/avatar.png') // Replace with your default image
                }
                style={styles.avatar}
              />
            </TouchableOpacity>

            <View>
              <View style={styles.titleContainer}>
                <Text
                  style={[
                    styles.headerTitle,
                    {fontSize: time ? FONTSIZE.size_20 : FONTSIZE.size_24},
                  ]}>
                  {title}
                </Text>
                <TouchableOpacity onPress={() => {}}>
                  <Image source={require('../assets/images/pencil.png')} />
                </TouchableOpacity>
              </View>
              <Text style={styles.headerSubtitle}>{subtitle}</Text>
              <View style={styles.verifyContainer}>
                <Image source={require('../assets/images/check.png')} />
                <Text style={styles.verify}>Verified Account</Text>
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.headerTitleContainer}>
            <Text
              style={[
                styles.headerTitle,
                {fontSize: time ? FONTSIZE.size_20 : FONTSIZE.size_24},
              ]}>
              {title}
            </Text>
            <Text style={styles.headerSubtitle}>{subtitle}</Text>
          </View>
        )}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  itemBackgroundImage: {
    width: '100%',
  },
  headerContainer: {
    // flex: 1,
  },
  headerControlsContainer: {
    padding: SPACING.space_30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profileContainer: {
    paddingLeft: SPACING.space_30,
    paddingRight: SPACING.space_30,
    paddingBottom: SPACING.space_30,
    gap: SPACING.space_15,
    flexDirection: 'row',
  },
  headerTitleContainer: {
    flexDirection: 'column',
    paddingBottom: SPACING.space_20,
    paddingLeft: SPACING.space_30,
    paddingRight: SPACING.space_30,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.space_10,
  },
  headerTitle: {
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_24,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_12,
    width: 220,
  },
  verifyContainer: {
    flexDirection: 'row',
    gap: SPACING.space_7,
    paddingTop: SPACING.space_7,
  },
  verify: {
    color: COLORS.primaryGreenHex,
    fontSize: FONTSIZE.size_12,
    fontWeight: 'bold',
  },
  image: {
    height: SPACING.space_16,
  },
  time: {
    fontWeight: 'bold',
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryYellowHex,
    backgroundColor: COLORS.tertiaryBlackRGBA,
    paddingTop: SPACING.space_7,
    paddingBottom: SPACING.space_7,
    paddingLeft: SPACING.space_10,
    paddingRight: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_5,
  },
  avatar: {
    height: 78,
    width: 78,
    borderRadius: 100,
  },
});

export default Header;
