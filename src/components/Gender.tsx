import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Pressable,
  ScrollView,
  TextInput,
  Dimensions,
} from 'react-native';
import React, {useState, useCallback} from 'react';
import {BORDERRADIUS, COLORS, FONTSIZE, SPACING} from '../theme/theme';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Genders} from '../interfaces/Genders';
import GenderItem from './GenderItem';

const HEIGHT = Dimensions.get('window').height;

const Gender = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [gender, setGender] = useState('');
  const [genders, setGenders] = useState<Genders[]>([]);

  const handleAdd = () => {
    setGender('');
    setIsModalVisible(true);
  };

  const getGenders = async () => {
    try {
      const genders = await AsyncStorage.getItem('genders');
      setGenders(JSON.parse(genders));
    } catch (e) {
      console.error(e);
    }
  };
  
  const handleSave = async () => {
    if (gender != '') {
      try {
        const genders = await AsyncStorage.getItem('genders');
        let newGenders = JSON.parse(genders);
  
        const value = {
          label: gender,
          value: gender,
          status: true,
        };
  
        if (!Array.isArray(newGenders)) {
          newGenders = [];
        }
  
        newGenders.push(value);
  
        await AsyncStorage.setItem('genders', JSON.stringify(newGenders));
        console.log('Data saved');
        getGenders();
        setIsModalVisible(false);
      } catch (e) {
        console.error(e);
      }
    }
  };

  useFocusEffect(
    useCallback(() => {
      getGenders();
    }, []),
  );

  return (
    <>
      {genders != null && (
        <View style={styles.content}>
          {genders.map((data: any, index: number) => (
            <GenderItem key={data.label} data={data} />
          ))}
        </View>
      )}
      
      <View style={styles.buttonAddContainer}>
        <TouchableOpacity style={styles.button} onPress={() => handleAdd()}>
          <Text style={styles.buttonText}>ADD GENDER</Text>
        </TouchableOpacity>
      </View>

      {/* players info modal */}
      <Modal
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
        animationType="fade"
        transparent>
        <Pressable
          style={[styles.modalPressable, {height: HEIGHT / 2}]}
          onPress={() => setIsModalVisible(false)}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewFlex}>
          <View style={styles.modalContent}>
            <TextInput
              placeholder="Please enter a gender"
              placeholderTextColor={COLORS.primaryLightGreyHex}
              style={styles.input}
              value={gender}
              onChangeText={value => setGender(value)}
            />
            <View style={styles.buttonSave}>
              <TouchableOpacity style={styles.button} onPress={() => handleSave()}>
                <Text style={styles.buttonText}>SAVE</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: SPACING.space_10,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: SPACING.space_15,
    paddingBottom: SPACING.space_15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.quarternaryWhiteRGBA,
  },
  itemText: {
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_14,
  },
  buttonAddContainer: {
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

  // modal
  modalPressable: {
    backgroundColor: COLORS.primaryBlackHex,
    opacity: 0.7,
  },
  scrollViewFlex: {
    flexGrow: 1,
  },
  modalContent: {
    flex: 1,
    backgroundColor: COLORS.primaryDarkGrayHex,
    padding: SPACING.space_30,
    borderTopLeftRadius: BORDERRADIUS.radius_40,
    borderTopRightRadius: BORDERRADIUS.radius_40,
    gap: SPACING.space_20,
  },
  input: {
    backgroundColor: COLORS.quarternaryWhiteRGBA,
    color: COLORS.primaryWhiteHex,
    borderRadius: BORDERRADIUS.radius_5,
    paddingHorizontal: SPACING.space_20,
    paddingTop: SPACING.space_14,
    fontSize: FONTSIZE.size_14,
    textAlignVertical: 'top',
    height: 50,
  },
  buttonSave: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.space_20,
    paddingBottom: SPACING.space_20,
  },
});

export default Gender;
