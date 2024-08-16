import {ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import {COLORS, SPACING} from '../theme/theme';
import Header from '../components/Header';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AllPlayersChart from '../components/AllPlayersChart';
import PlayerStats from '../components/PlayerStats';
import {useFocusEffect} from '@react-navigation/native';

const Statistics = () => {
  const tabBarHeight = useBottomTabBarHeight();
  const [distinctData, setDistinctData] = useState<any[]>([]);
  const [playerData, setPlayerData] = useState<any[]>([]);
  const [noData, setNoData] = useState<boolean>(false);

  const getWinOrLose = (
    p1Set1Score: any,
    p2Set1Score: any,
    p1Set2Score: any,
    p2Set2Score: any,
    p1Set3Score: any,
    p2Set3Score: any,
  ) => {
    let p1Score = 0,
      p2Score = 0;

    if (p1Set1Score > p2Set1Score) {
      p1Score++;
    } else {
      p2Score++;
    }

    if (p1Set2Score > p2Set2Score) {
      p1Score++;
    } else {
      p2Score++;
    }

    if (p1Set3Score > p2Set3Score) {
      p1Score++;
    } else {
      p2Score++;
    }

    return p1Score > p2Score ? 1 : 2;
  };

  // Function to transform specific columns into rows and duplicate other fields
  const transformData = (data: any, columnsToTranspose: any) => {
    const transformedData: any[] = [];

    data.forEach((item: any) => {
      columnsToTranspose.forEach((column: any) => {
        let win = 0;
        let loss = 0;

        if (item['winner'] == 1 && (column == 'p1A' || column == 'p1B')) {
          win = 1;
        } else if (
          item['winner'] == 2 &&
          (column == 'p2A' || column == 'p2B')
        ) {
          win = 1;
        } else {
          loss = 1;
        }

        const newItem = {
          // ...item,
          playerKey: column,
          player: item[column],
          winner: item['winner'],
          win: win,
          loss: loss,
        };
        transformedData.push(newItem);
      });
    });

    return transformedData;
  };

  const getDistinctData = (data: any) => {
    const distinctData: any[] = [];
    const map = new Map();

    data.forEach((item: any, index: any) => {
      let frontColor;
      let gradientColor;

      if (index % 2 === 0) {
        frontColor = '#006DFF';
        gradientColor = '#009FFF';
      } else {
        frontColor = '#008224';
        gradientColor = COLORS.primaryGreenHex;
      }

      if (!map.has(item['player'])) {
        map.set(item['player'], true);
        distinctData.push({
          ...item,
          count: 1,
          player: item.player,
          totalWins: item.win,
          totalLosses: item.loss,
          winningPercentage: (item.win / 1).toFixed(2),
          value: (item.win / 1) * 100,
          frontColor: frontColor,
          gradientColor: gradientColor,
          spacing: 7,
        });
      } else {
        let existingItem = distinctData.find(
          d => d['player'] === item['player'],
        );
        let itemIndex = distinctData.findIndex(
          d => d['player'] === item['player'],
        );

        if (existingItem != undefined) {
          existingItem.count += 1;
          existingItem.player = item.player;
          existingItem.totalWins += item.win;
          existingItem.totalLosses += item.loss;
          existingItem.winningPercentage = (
            existingItem.totalWins / existingItem.count
          ).toFixed(2);
          existingItem.value =
            (existingItem.totalWins / existingItem.count) * 100;
          existingItem.frontColor = frontColor;
          existingItem.gradientColor = gradientColor;
          existingItem.spacing = 7;
          distinctData[itemIndex] = existingItem;
        }
      }
    });

    return distinctData;
  };

  const getData = async () => {
    try {
      const score = await AsyncStorage.getItem('score');

      if (score != null) {
        // generate win/lose
        const generateWinner = JSON.parse(score).map((player: any) => ({
          ...player,
          winner: getWinOrLose(
            player.p1Set1Score,
            player.p2Set1Score,
            player.p1Set2Score,
            player.p2Set2Score,
            player.p1Set3Score,
            player.p2Set3Score,
          ),
        }));

        // transpose
        const columnsToTranspose = ['p1A', 'p1B', 'p2A', 'p2B'];
        const transformedData = transformData(
          generateWinner,
          columnsToTranspose,
        );

        // get distinct players
        const distinctDataTmp = getDistinctData(transformedData);

        // get players
        let players = distinctDataTmp.map((item: any) => item.player);

        players = players.filter(
          (player: any, index: any) => players.indexOf(player) === index,
        );

        let newPlayerData = players
          .map((item: any) => ({label: item, value: item}))
          .sort((a: any, b: any) => a.label.localeCompare(b.label));

        setDistinctData(distinctDataTmp);
        setPlayerData(newPlayerData);
        setNoData(false);
      } else {
        setNoData(true);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getData();
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
              title="Statistics"
              subtitle="Graphical representation of the games."
              isProfile={false}
              isBack={false}
              isSettings={false}
              duration={null}
            />

            <View style={styles.content}>
              {distinctData.length > 0 && playerData.length > 0 && (
                <PlayerStats data={distinctData} playerData={playerData} />
              )}
              <AllPlayersChart data={distinctData} />
            </View>

            {noData && (
              <Text style={styles.noData}>No any records of game found.</Text>
            )}
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
    padding: SPACING.space_20,
    gap: SPACING.space_15,
  },
  singleStatsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noData: {
    color: COLORS.secondaryWhiteRGBA,
    margin: 'auto',
  },
});

export default Statistics;
