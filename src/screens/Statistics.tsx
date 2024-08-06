import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {BarChart, LineChart} from 'react-native-gifted-charts';
import {BORDERRADIUS, COLORS, FONTSIZE, SPACING} from '../theme/theme';
import Header from '../components/Header';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ScoreDetails} from '../interfaces/ScoreDetails';
import {Dropdown} from 'react-native-element-dropdown';
import {Reports, Presentation, Star, XmarkCircle} from 'iconoir-react-native';

const Statistics = () => {
  const tabBarHeight = useBottomTabBarHeight();
  const [scores, setScores] = useState<ScoreDetails[]>([]);
  const [distinctData, setDistinctData] = useState<any[]>([]);
  const [isFocusPlayer, setIsFocusPlayer] = useState(false);
  const [player, setPlayer] = useState<any>({
    count: 0,
    frontColor: '',
    gradientColor: '',
    loss: 0,
    player: '',
    playerKey: '',
    spacing: 0,
    totalLosses: 0,
    totalWins: 0,
    value: 0,
    win: 0,
    winner: 0,
    winningPercentage: '',
  });

  const data = [
    {
      count: 2,
      frontColor: '#008224',
      gradientColor: '#00A42E',
      loss: 0,
      player: 'Cyben',
      playerKey: 'p1A',
      spacing: 7,
      totalLosses: 1,
      totalWins: 1,
      value: 50,
      win: 1,
      winner: 1,
      winningPercentage: '0.50',
    },
    {
      count: 1,
      frontColor: '#008224',
      gradientColor: '#00A42E',
      loss: 0,
      player: 'Ian',
      playerKey: 'p1B',
      spacing: 7,
      totalLosses: 0,
      totalWins: 1,
      value: 100,
      win: 1,
      winner: 1,
      winningPercentage: '1.00',
    },
    {
      count: 1,
      frontColor: '#006DFF',
      gradientColor: '#009FFF',
      loss: 1,
      player: 'Alvin',
      playerKey: 'p2A',
      spacing: 7,
      totalLosses: 1,
      totalWins: 0,
      value: 0,
      win: 0,
      winner: 1,
      winningPercentage: '0.00',
    },
    {
      count: 2,
      frontColor: '#006DFF',
      gradientColor: '#009FFF',
      loss: 1,
      player: 'Gian',
      playerKey: 'p2B',
      spacing: 7,
      totalLosses: 2,
      totalWins: 0,
      value: 0,
      win: 0,
      winner: 1,
      winningPercentage: '0.00',
    },
    {
      count: 1,
      frontColor: '#006DFF',
      gradientColor: '#009FFF',
      loss: 0,
      player: 'Lassi',
      playerKey: 'p1A',
      spacing: 7,
      totalLosses: 0,
      totalWins: 1,
      value: 100,
      win: 1,
      winner: 1,
      winningPercentage: '1.00',
    },
    {
      count: 1,
      frontColor: '#008224',
      gradientColor: '#00A42E',
      loss: 0,
      player: 'Ismo',
      playerKey: 'p1B',
      spacing: 7,
      totalLosses: 0,
      totalWins: 1,
      value: 100,
      win: 1,
      winner: 1,
      winningPercentage: '1.00',
    },
  ];

  const data1 = [
    {value: 70},
    {value: 36},
    {value: 50},
    {value: 40},
    {value: 18},
    {value: 38},
  ];

  const data2 = [
    {value: 50},
    {value: 10},
    {value: 45},
    {value: 30},
    {value: 45},
    {value: 18},
  ];

  const renderItem = (item: any) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
      </View>
    );
  };

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
      setScores(JSON.parse(score));

      // CYHERE - CHECK WITH ILPO USAGE OF 'distinctData'

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
      const transformedData = transformData(generateWinner, columnsToTranspose);

      // get distinct players
      const distinctData = getDistinctData(transformedData);

      setDistinctData(distinctData);

      // console.log(distinctData);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getData();
    getSinglePlayerStats(playerData[0].value);
  }, []);

  // populate players dropdown
  const players = data.map(item => item.player);
  players.filter((player, index) => players.indexOf(player) === index);

  const playerData = players
    .map(item => ({
      label: item,
      value: item,
    }))
    .sort((a, b) => a.label.localeCompare(b.label));

  // select player
  const getSinglePlayerStats = (name: any) => {
    setPlayer(data.find(item => item.player === name));
  };

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
            />

            <View style={styles.content}>
              {/* <View style={{padding: 10}}>
                <Text style={styles.title}>Lassi vs one (1) player</Text>
                <LineChart
                  width={255}
                  areaChart
                  curved
                  data={data1}
                  data2={data2}
                  hideDataPoints
                  spacing={68}
                  color1="#8a56ce"
                  color2="#56acce"
                  startFillColor1="#8a56ce"
                  startFillColor2="#56acce"
                  endFillColor1="#8a56ce"
                  endFillColor2="#56acce"
                  startOpacity={0.9}
                  endOpacity={0.2}
                  initialSpacing={0}
                  noOfSections={4}
                  yAxisColor="white"
                  yAxisThickness={0}
                  rulesType="solid"
                  rulesColor="gray"
                  yAxisTextStyle={{color: 'gray'}}
                  yAxisLabelSuffix="%"
                  xAxisColor="lightgray"
                  pointerConfig={{
                    pointerStripUptoDataPoint: true,
                    pointerStripColor: 'lightgray',
                    pointerStripWidth: 2,
                    strokeDashArray: [2, 5],
                    pointerColor: 'lightgray',
                    radius: 4,
                    pointerLabelWidth: 100,
                    pointerLabelHeight: 120,
                    pointerLabelComponent: (items: any) => {
                      return (
                        <View
                          style={{
                            height: 120,
                            width: 100,
                            backgroundColor: '#282C3E',
                            borderRadius: 4,
                            justifyContent: 'center',
                            paddingLeft: 16,
                          }}>
                          <Text style={{color: 'lightgray', fontSize: 12}}>
                            {2018}
                          </Text>
                          <Text style={{color: 'white', fontWeight: 'bold'}}>
                            {items[0].value}
                          </Text>
                          <Text
                            style={{
                              color: 'lightgray',
                              fontSize: 12,
                              marginTop: 12,
                            }}>
                            {2019}
                          </Text>
                          <Text style={{color: 'white', fontWeight: 'bold'}}>
                            {items[1].value}
                          </Text>
                        </View>
                      );
                    },
                  }}
                />
              </View> */}

              <View style={styles.nameContainer}>
                <Image
                  style={styles.avatar}
                  source={require('../assets/images/avatar.png')}
                />
                {/* <Text style={styles.name}>Lassi</Text> */}
                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={playerData}
                  labelField="label"
                  valueField="value"
                  placeholder={!isFocusPlayer ? '' : ''}
                  searchPlaceholder="search..."
                  value={player.player}
                  onFocus={() => setIsFocusPlayer(true)}
                  onBlur={() => setIsFocusPlayer(false)}
                  onChange={(item: {value: React.SetStateAction<null>}) => {
                    getSinglePlayerStats(item.value);
                    setIsFocusPlayer(false);
                  }}
                  renderItem={renderItem}
                />
              </View>
              <View style={styles.detailsContainer}>
                <View style={styles.detailContainer}>
                  <View style={styles.infoContainer}>
                    <Text
                      style={[
                        styles.detail,
                        {
                          color:
                            player.winningPercentage * 100 >= 50
                              ? COLORS.primaryGreenHex
                              : COLORS.primaryYellowHex,
                        },
                      ]}>
                      {player.winningPercentage * 100}%
                    </Text>
                    <Text style={styles.detailTitle}>WIN RATE</Text>
                  </View>
                  <Reports
                    width={20}
                    height={20}
                    strokeWidth={1}
                    color={COLORS.primaryWhiteRGBA}
                  />
                </View>
                <View style={styles.detailContainer}>
                  <View style={styles.infoContainer}>
                    <Text style={styles.detail}>{player.count}</Text>
                    <Text style={styles.detailTitle}>TOTAL GAMES</Text>
                  </View>
                  <Presentation
                    width={20}
                    height={20}
                    strokeWidth={1}
                    color={COLORS.primaryWhiteRGBA}
                  />
                </View>
              </View>
              <View style={styles.detailsContainer}>
                <View style={styles.detailContainer}>
                  <View style={styles.infoContainer}>
                    <Text style={styles.detail}>{player.totalWins}</Text>
                    <Text style={styles.detailTitle}>WINS</Text>
                  </View>
                  <Star
                    width={20}
                    height={20}
                    strokeWidth={1}
                    color={COLORS.primaryWhiteRGBA}
                  />
                </View>
                <View style={styles.detailContainer}>
                  <View style={styles.infoContainer}>
                    <Text style={styles.detail}>{player.totalLosses}</Text>
                    <Text style={styles.detailTitle}>LOSSES</Text>
                  </View>
                  <XmarkCircle
                    width={20}
                    height={20}
                    strokeWidth={1}
                    color={COLORS.primaryWhiteRGBA}
                  />
                </View>
              </View>

              <View style={styles.barChartContainer}>
                <BarChart
                  data={data}
                  barWidth={17}
                  initialSpacing={5}
                  spacing={14}
                  barBorderRadius={4}
                  showGradient
                  yAxisThickness={0}
                  xAxisType={'dashed'}
                  xAxisColor={'lightgray'}
                  yAxisTextStyle={{
                    fontSize: 12,
                    color: COLORS.primaryWhiteRGBA,
                  }}
                  stepValue={20}
                  maxValue={120}
                  noOfSections={7}
                  yAxisLabelTexts={[
                    '0',
                    '20%',
                    '40%',
                    '60%',
                    '80%',
                    '100%',
                    '',
                  ]}
                  labelWidth={40}
                  xAxisLabelTextStyle={{
                    display: 'none',
                    color: COLORS.primaryWhiteRGBA,
                    fontSize: 12,
                    textAlign: 'center',
                  }}
                  showLine
                  lineConfig={{
                    color: COLORS.primaryYellowHex,
                    thickness: 1,
                    curved: false,
                    hideDataPoints: true,
                    shiftY: 10,
                    initialSpacing: -30,
                  }}
                  isAnimated
                  renderTooltip={(item: any, index: any) => {
                    return (
                      <View
                        style={{
                          marginBottom: 10,
                          marginLeft: -6,
                          backgroundColor: 'rgba(0,0,0,0.7)',
                          paddingHorizontal: 6,
                          paddingVertical: 4,
                          borderRadius: 4,
                        }}>
                        <Text style={{fontSize: 12, color: '#fff'}}>
                          {item.player}
                        </Text>
                        <Text style={{fontSize: 10, color: '#fff'}}>
                          {item.value.toFixed(2)}%
                        </Text>
                      </View>
                    );
                  }}
                />
                <Text style={styles.title}>ALL PLAYERS WIN RATES</Text>
              </View>
            </View>
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
    paddingHorizontal: SPACING.space_20,
    paddingVertical: SPACING.space_20,
    gap: SPACING.space_15,
  },
  title: {
    color: COLORS.primaryWhiteRGBA,
    fontSize: FONTSIZE.size_11,
  },
  singleStatsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameContainer: {
    alignItems: 'center',
    gap: SPACING.space_14,
  },
  avatar: {
    height: 150,
    width: 150,
  },
  name: {
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_16,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: SPACING.space_14,
  },
  detailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: COLORS.secondaryWhiteRGBA,
    borderRadius: SPACING.space_15,
    padding: SPACING.space_15,
    width: '48%',
  },
  infoContainer: {
    flexDirection: 'column',
  },
  detailTitle: {
    color: COLORS.primaryWhiteRGBA,
    fontSize: FONTSIZE.size_11,
  },
  detailWinRate: {
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_34,
    fontWeight: 'bold',
  },
  detail: {
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_28,
    fontWeight: 'bold',
  },
  barChartContainer: {
    padding: 10,
    alignItems: 'center',
  },

  // dropdowns
  item: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryBlackRGBA,
  },
  imageStyle: {
    width: 37,
    height: 21,
  },
  dropdown: {
    flex: 1,
    backgroundColor: COLORS.quarternaryWhiteRGBA,
    borderRadius: BORDERRADIUS.radius_5,
    paddingRight: SPACING.space_10,
    paddingLeft: SPACING.space_15,
    fontSize: FONTSIZE.size_14,
    textAlignVertical: 'top',
    height: 40,
    width: 130,
  },
  placeholderStyle: {
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteRGBA,
  },
  selectedTextStyle: {
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: FONTSIZE.size_14,
    fontStyle: 'italic',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});

export default Statistics;
