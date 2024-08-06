import {StyleSheet, Switch, Text, View} from 'react-native';
import React, {useState, useCallback, useEffect} from 'react';
import {COLORS, FONTSIZE, SPACING} from '../theme/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Venues } from '../interfaces/Venues';

const VenueItem = ({data}: any) => {
  const [status, setStatus] = useState(data.status);
  const [venues, setVenues] = useState<Venues[]>([]);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('venues');
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
      console.error('Error reading value', e);
    }
  };

  const saveData = async (data: any) => {
    try {
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem('venues', jsonValue);
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
    setVenues(updatedData);
  };

  const handleToggle = (value: any) => {
    updateItem(value, { status: !venues.find((item: any) => item.value === value)?.status });
    setStatus(!status);
  };

  useEffect(() => {
    const initializeData = async () => {
      const storedData = await getData();
      if (storedData.length === 0) {
        await saveData(venues);
        setVenues(venues);
      } else {
        setVenues(storedData);
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

export default VenueItem;
