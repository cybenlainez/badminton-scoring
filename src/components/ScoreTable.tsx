import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, FONTSIZE, SPACING} from '../theme/theme';
import {format} from 'date-fns';
import {Plus, Minus} from 'iconoir-react-native';
import {countryData} from '../data/countryData';
import {Teams} from '../interfaces/Teams';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ScoreTable = ({data, showHeader, defaultVisible}: any) => {
  const [teams, setTeams] = useState<Teams[]>([]);
  const [toggle, setToggle] = useState(defaultVisible);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const findCountry = (id: string) => {
    const row =
      teams != null
        ? teams.concat(countryData).find((item: any) => item.value === id)
        : countryData.find((item: any) => item.value === id);
    return row
      ? row['image']['uri']
      : 'https://www.worldometers.info//img/flags/small/tn_fi-flag.gif';
  };

  const getTeams = async () => {
    try {
      const teams = await AsyncStorage.getItem('teams');
      setTeams(JSON.parse(teams));
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getTeams();
  }, []);

  return (
    <>
      {showHeader ? (
        <View style={styles.header}>
          <View>
            <Text style={styles.date}>
              {format(data.date, 'd.M.yyyy EEEE')}
            </Text>
            <Text style={styles.venue}>{data.venue}</Text>
          </View>
          <TouchableOpacity onPress={handleToggle}>
            {!toggle ? (
              <Plus
                width={15}
                height={15}
                strokeWidth={1}
                color={COLORS.primaryWhiteHex}
              />
            ) : (
              <Minus
                width={15}
                height={15}
                strokeWidth={1}
                color={COLORS.primaryWhiteHex}
              />
            )}
          </TouchableOpacity>
        </View>
      ) : (
        <></>
      )}
      {toggle && (
        <View style={styles.table}>
          <View style={styles.row}>
            <View style={[styles.cellLong, styles.cellLongBlank]}></View>
            <View style={[styles.cell, styles.cellSet1]}>
              <Text style={styles.cell}>SET 1</Text>
            </View>
            <View style={[styles.cell, styles.cellSet2]}>
              <Text style={styles.cell}>SET 2</Text>
            </View>
            <View style={[styles.cell, styles.cellSet3]}>
              <Text style={styles.cell}>SET 3</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={[styles.cellLong, styles.cellLongPlayer1]}>
              <Image
                style={styles.flagSmall}
                source={{uri: findCountry(data.p1Country)}}
              />
              <View style={styles.nameContainer}>
                <Text style={styles.name}>{data.p1A}</Text>
                <Text style={styles.name}>{data.p1B}</Text>
              </View>
            </View>
            <View style={[styles.cell, styles.cellScore1]}>
              <Text
                style={[
                  styles.cell,
                  data.p1Set1Score > data.p2Set1Score
                    ? styles.scoreWinner
                    : null,
                ]}>
                {data.p1Set1Score}
              </Text>
            </View>
            <View style={[styles.cell, styles.cellScore2]}>
              <Text
                style={[
                  styles.cell,
                  data.p1Set2Score > data.p2Set2Score
                    ? styles.scoreWinner
                    : null,
                ]}>
                {data.p1Set2Score}
              </Text>
            </View>
            <View style={[styles.cell, styles.cellScore3]}>
              <Text
                style={[
                  styles.cell,
                  data.p1Set3Score > data.p2Set3Score
                    ? styles.scoreWinner
                    : null,
                ]}>
                {data.p1Set3Score}
              </Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={[styles.cellLong, styles.cellLongPlayer2]}>
              <Image
                style={styles.flagSmall}
                source={{uri: findCountry(data.p2Country)}}
              />
              <View style={styles.nameContainer}>
                <Text style={styles.name}>{data.p2A}</Text>
                <Text style={styles.name}>{data.p2B}</Text>
              </View>
            </View>
            <View style={[styles.cell, styles.cellScore4]}>
              <Text
                style={[
                  styles.cell,
                  data.p2Set1Score > data.p1Set1Score
                    ? styles.scoreWinner
                    : null,
                ]}>
                {data.p2Set1Score}
              </Text>
            </View>
            <View style={[styles.cell, styles.cellScore5]}>
              <Text
                style={[
                  styles.cell,
                  data.p2Set2Score > data.p1Set2Score
                    ? styles.scoreWinner
                    : null,
                ]}>
                {data.p2Set2Score}
              </Text>
            </View>
            <View style={[styles.cell, styles.cellScore6]}>
              <Text
                style={[
                  styles.cell,
                  data.p2Set3Score > data.p1Set3Score
                    ? styles.scoreWinner
                    : null,
                ]}>
                {data.p2Set3Score}
              </Text>
            </View>
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  date: {
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_14,
    fontWeight: 'bold',
  },
  venue: {
    color: COLORS.primaryWhiteRGBA,
    fontSize: FONTSIZE.size_12,
  },
  table: {},
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    alignItems: 'center',
    fontSize: FONTSIZE.size_12,
    color: COLORS.primaryWhiteHex,
    borderColor: COLORS.secondaryWhiteRGBA,
    paddingTop: SPACING.space_8,
  },
  cellSet1: {
    borderBottomWidth: 1,
    borderRightWidth: 1,
  },
  cellSet2: {
    borderBottomWidth: 1,
    borderRightWidth: 1,
  },
  cellSet3: {
    borderBottomWidth: 1,
  },
  cellScore1: {
    borderBottomWidth: 1,
    borderRightWidth: 1,
  },
  cellScore2: {
    borderBottomWidth: 1,
    borderRightWidth: 1,
  },
  cellScore3: {
    borderBottomWidth: 1,
  },
  cellScore4: {
    borderRightWidth: 1,
  },
  cellScore5: {
    borderRightWidth: 1,
  },
  cellScore6: {},
  cellLong: {
    flexDirection: 'row',
    width: 190,
    textAlign: 'center',
    alignItems: 'center',
    color: COLORS.primaryWhiteHex,
    borderColor: COLORS.secondaryWhiteRGBA,
    padding: SPACING.space_10,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  cellLongBlank: {
    borderBottomWidth: 1,
    borderRightWidth: 1,
    height: SPACING.space_50,
  },
  cellLongPlayer1: {
    borderBottomWidth: 1,
    borderRightWidth: 1,
  },
  cellLongPlayer2: {
    borderRightWidth: 1,
  },

  flagSmall: {
    width: 37,
    height: 21,
  },
  nameContainer: {
    paddingLeft: SPACING.space_7,
  },
  name: {
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_11,
  },
  scoreWinner: {
    color: COLORS.primaryGreenHex,
    fontWeight: 'bold',
  },
});

export default ScoreTable;
