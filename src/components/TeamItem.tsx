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
import {Teams} from '../interfaces/Teams';

const HEIGHT = Dimensions.get('window').height;

interface TeamItemProps {
  team: Teams;
  onEditTeam: any;
  onToggle: any;
  index: number;
}

const TeamItem = ({
  team,
  onEditTeam,
  onToggle,
  index,
}: TeamItemProps) => {
  const [toggleStatus, setToggleStatus] = useState(team.status);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newTeam, setNewTeam] = useState('');

  const handleSelectItem = (team: string) => {
    setNewTeam(team);
    setIsModalVisible(true);
  };

  return (
    <>
      <TouchableOpacity onPress={() => handleSelectItem(team.label)}>
        <View style={styles.item}>
          <Text style={styles.itemText}>{team.label}</Text>
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
        <Pressable
          style={[styles.modalPressable, {height: HEIGHT / 2}]}
          onPress={() => setIsModalVisible(false)}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewFlex}>
          <View style={styles.modalContent}>
            <TextInput
              placeholder="Please enter a team"
              placeholderTextColor={COLORS.primaryLightGreyHex}
              style={styles.input}
              value={newTeam}
              onChangeText={value => setNewTeam(value)}
            />
            <View style={styles.buttonSave}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  onEditTeam(newTeam, index);
                  setIsModalVisible(false);
                }}>
                <Text style={styles.buttonText}>UPDATE</Text>
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
});

export default TeamItem;
