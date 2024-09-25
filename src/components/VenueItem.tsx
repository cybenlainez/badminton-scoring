import {
  Dimensions,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {BORDERRADIUS, COLORS, FONTSIZE, SPACING} from '../theme/theme';
import {Venues} from '../interfaces/Venues';

const HEIGHT = Dimensions.get('window').height;

interface VenueItemProps {
  venue: Venues;
  onEditVenue: any;
  onDeleteVenue: any;
  onToggle: any;
  index: number;
}

const VenueItem = ({
  venue,
  onEditVenue,
  onDeleteVenue,
  onToggle,
  index,
}: VenueItemProps) => {
  const [toggleStatus, setToggleStatus] = useState(venue.status);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newVenue, setNewVenue] = useState('');

  const handleSelectItem = (venue: string) => {
    setNewVenue(venue);
    setIsModalVisible(true);
  };

  return (
    <>
      <TouchableOpacity onPress={() => handleSelectItem(venue.label)}>
        <View style={styles.item}>
          <Text style={styles.itemText}>{venue.label}</Text>
          <Switch
            value={toggleStatus}
            onValueChange={() => {
              onToggle(!toggleStatus, index);
              setToggleStatus(!toggleStatus);
            }}
            trackColor={{
              false: COLORS.primaryWhiteHex,
              true: COLORS.primaryGreenHex,
            }}
            thumbColor="#f4f3f4"
          />
        </View>
      </TouchableOpacity>

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
              value={newVenue}
              onChangeText={value => setNewVenue(value)}
            />
            <View style={styles.buttonSave}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  onEditVenue(newVenue, index);
                  setIsModalVisible(false);
                }}>
                <Text style={styles.buttonText}>UPDATE</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonSave}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  onDeleteVenue(venue.label);
                  setIsModalVisible(false);
                }}>
                <Text style={styles.buttonDeleteText}>DELETE</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
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

  // modal
  modalPressable: {
    backgroundColor: COLORS.primaryBlackHex,
    opacity: 0.7,
    height: '70%',
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
  buttonDeleteText: {
    fontWeight: 'bold',
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryYellowHex,
  },
});

export default VenueItem;
