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
import {Venues} from '../interfaces/Venues';
import VenueItem from './VenueItem';
import { Plus } from 'iconoir-react-native';

const HEIGHT = Dimensions.get('window').height;

const Venue = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [venue, setVenue] = useState('');
  const [venues, setVenues] = useState<Venues[]>([]);

  const handleAdd = () => {
    setVenue('');
    setIsModalVisible(true);
  };

  const getVenues = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('venues');
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
      console.error('Error reading value', e);
    }
  };

  const handleSave = async () => {
    if (venue != '') {
      try {
        const venues = await AsyncStorage.getItem('venues');
        let newVenues = JSON.parse(venues);

        const value = {
          label: venue,
          value: venue,
          status: true,
        };

        if (!Array.isArray(newVenues)) {
          newVenues = [];
        }

        newVenues.push(value);

        await AsyncStorage.setItem('venues', JSON.stringify(newVenues));
        console.log('Data saved');
        setVenues(newVenues);
        setIsModalVisible(false);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const onEditVenue = async (newData: string, index: number) => {
    let updatedData = venues;
    updatedData[index].label = newData;
    updatedData[index].value = newData;
    const jsonValue = JSON.stringify(updatedData);
    await AsyncStorage.setItem('venues', jsonValue);
    setVenues(updatedData);
  };
  
  const onDeleteVenue = async (value: string) => {
    let updatedData = venues;
    updatedData = updatedData.filter(item => item.value !== value);
    const jsonValue = JSON.stringify(updatedData);
    await AsyncStorage.setItem('venues', jsonValue);
    setVenues(updatedData);
  };

  const onToggleVenue = async (status: boolean, index: number) => {
    let updatedData = venues;
    updatedData[index].status = status;
    const jsonValue = JSON.stringify(updatedData);
    await AsyncStorage.setItem('venues', jsonValue);
    setVenues(updatedData);
  };

  useFocusEffect(
    useCallback(() => {
      async function initializeVenues() {
        setVenues(await getVenues());
      }
      initializeVenues();
    }, []),
  );

  return (
    <>
      {venues != null && (
        <View style={styles.content}>
          {venues
            .sort((a, b) => a.label.localeCompare(b.label))
            .map((data: Venues, index: number) => (
              <VenueItem
                venue={data}
                onToggle={onToggleVenue}
                onEditVenue={onEditVenue}
                onDeleteVenue={onDeleteVenue}
                index={index}
                key={index}
              />
            ))}
        </View>
      )}

      <View style={styles.buttonAddContainer}>
        <TouchableOpacity style={styles.button} onPress={() => handleAdd()}>
          <Plus
            width={17}
            height={17}
            strokeWidth={3}
            color={COLORS.primaryGreenHex}
          />
          <Text style={styles.buttonText}>ADD A VENUE</Text>
        </TouchableOpacity>
      </View>

      {/* gender modal */}
      <Modal
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
        animationType="fade"
        transparent>
        <Pressable style={styles.modalPressable} onPress={() => setIsModalVisible(false)} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewFlex}>
          <View style={styles.modalContent}>
            <TextInput
              placeholder="Please enter a venue"
              placeholderTextColor={COLORS.primaryLightGreyHex}
              style={styles.input}
              value={venue}
              onChangeText={value => setVenue(value)}
            />
            <View style={styles.buttonSave}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleSave()}>
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.space_4,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryGreenHex,
  },

  // modal
  modalPressable: {
    backgroundColor: COLORS.primaryBlackHex,
    opacity: 0.7,
    height: '80%',
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

export default Venue;
