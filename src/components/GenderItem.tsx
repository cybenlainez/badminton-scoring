import {StyleSheet, Switch, Text, View} from 'react-native';
import React, {useState, useCallback, useEffect} from 'react';
import {COLORS, FONTSIZE, SPACING} from '../theme/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Genders } from '../interfaces/Genders';

const GenderItem = ({data}: any) => {
  const [status, setStatus] = useState(data.status);
  const [genders, setGenders] = useState<Genders[]>([]);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('genders');
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
      console.error('Error reading value', e);
    }
  };

  const saveData = async (data: any) => {
    try {
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem('genders', jsonValue);
      console.log('Data saved');
    } catch (e) {
      console.error('Error saving value', e);
    }
  };

  const updateItem = async (value: any, newData: any) => {
    const data = await getData();
    const updatedData = data.map((item: any) =>
      item.value === value ? { ...item, ...newData } : item
    );
    await saveData(updatedData);
    setGenders(updatedData);
  };

  const handleToggle = (value: any) => {
    updateItem(value, { status: !genders.find((item: any) => item.value === value)?.status });
    setStatus(!status);
  };

  useEffect(() => {
    const initializeData = async () => {
      const storedData = await getData();
      if (storedData.length === 0) {
        await saveData(genders);
        setGenders(genders);
      } else {
        setGenders(storedData);
      }
    };

    initializeData();
  }, []);

  return (
    <View style={styles.item}>
      <Text style={styles.itemText}>{data.label}</Text>
      <Switch
        value={status}
        onValueChange={() => handleToggle(data.value)}
        trackColor={{
          false: COLORS.primaryWhiteHex,
          true: COLORS.primaryGreenHex,
        }}
        thumbColor="#f4f3f4"
      />
    </View>
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
});

export default GenderItem;
