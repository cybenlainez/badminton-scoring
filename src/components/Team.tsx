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
import {Teams} from '../interfaces/Teams';
import TeamItem from './TeamItem';

const HEIGHT = Dimensions.get('window').height;

const Team = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [team, setTeam] = useState('');
  const [teams, setTeams] = useState<Teams[]>([]);

  const handleAdd = () => {
    setTeam('');
    setIsModalVisible(true);
  };

  const getTeams = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('teams');
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
      console.error('Error reading value', e);
    }
  };

  const handleSave = async () => {
    if (team != '') {
      try {
        const teams = await AsyncStorage.getItem('teams');
        let newTeams = JSON.parse(teams);
        let id = 1000;

        if (newTeams != null) {
          id = Math.max(...newTeams.map((item: any) => item.value + 1));
        }

        const value = {
          value: id,
          label: team,
          image: {
            uri: 'https://www.creativefabrica.com/wp-content/uploads/2022/08/31/Badminton-Logo-Design-Vector-Icon-Graphics-37468611-1-1-580x387.jpg',
          },
          status: true,
        };

        if (!Array.isArray(newTeams)) {
          newTeams = [];
        }

        newTeams.push(value);

        // await AsyncStorage.setItem('teams', '');
        await AsyncStorage.setItem('teams', JSON.stringify(newTeams));
        console.log('Data saved');
        setTeams(newTeams);
        setIsModalVisible(false);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const onEditTeam = async (newData: string, index: number) => {
    let updatedData = teams;
    updatedData[index].label = newData;
    const jsonValue = JSON.stringify(updatedData);
    await AsyncStorage.setItem('teams', jsonValue);
    setTeams(updatedData);
  };

  const onToggleTeam = async (status: boolean, index: number) => {
    let updatedData = teams;
    updatedData[index].status = status;
    const jsonValue = JSON.stringify(updatedData);
    await AsyncStorage.setItem('teams', jsonValue);
    setTeams(updatedData);
  };

  useFocusEffect(
    useCallback(() => {
      async function initializeTeams() {
        setTeams(await getTeams());
      }
      initializeTeams();
    }, []),
  );

  return (
    <>
      {teams != null && (
        <View style={styles.content}>
          {teams
            .sort((a, b) => a.label.localeCompare(b.label))
            .map((data: Teams, index: number) => (
              <TeamItem
                team={data}
                onToggle={onToggleTeam}
                onEditTeam={onEditTeam}
                index={index}
                key={index}
              />
            ))}
        </View>
      )}

      <View style={styles.buttonAddContainer}>
        <TouchableOpacity style={styles.button} onPress={() => handleAdd()}>
          <Text style={styles.buttonText}>ADD TEAM</Text>
        </TouchableOpacity>
      </View>

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
              value={team}
              onChangeText={value => setTeam(value)}
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

export default Team;
