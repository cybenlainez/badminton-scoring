import {ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {BarChart, LineChart} from 'react-native-gifted-charts';
import {COLORS, FONTSIZE, SPACING} from '../theme/theme';
import Header from '../components/Header';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';

const Statistics = () => {
  const tabBarHeight = useBottomTabBarHeight();
  const data = [
    {
      value: 2500,
      frontColor: '#006DFF',
      gradientColor: '#009FFF',
      spacing: 6,
      label: 'Ismo',
    },
    {value: 2400, frontColor: '#008224', gradientColor: COLORS.primaryGreenHex},

    {
      value: 3500,
      frontColor: '#006DFF',
      gradientColor: '#009FFF',
      spacing: 6,
      label: 'Lassi',
    },
    {value: 3000, frontColor: '#008224', gradientColor: COLORS.primaryGreenHex},

    {
      value: 4500,
      frontColor: '#006DFF',
      gradientColor: '#009FFF',
      spacing: 6,
      label: 'Ilpo',
    },
    {value: 4000, frontColor: '#008224', gradientColor: COLORS.primaryGreenHex},

    {
      value: 5200,
      frontColor: '#006DFF',
      gradientColor: '#009FFF',
      spacing: 6,
      label: 'Taavi',
    },
    {value: 4900, frontColor: '#008224', gradientColor: COLORS.primaryGreenHex},

    {
      value: 3000,
      frontColor: '#006DFF',
      gradientColor: '#009FFF',
      spacing: 6,
      label: 'Juho',
    },
    {value: 2800, frontColor: '#008224', gradientColor: COLORS.primaryGreenHex},
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
              <View style={{padding: 10}}>
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
                    pointerLabelComponent: items => {
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
              </View>
              <View style={{padding: 10}}>
                <Text style={styles.title}>Lassi vs all players</Text>
                <BarChart
                  data={data}
                  barWidth={16}
                  initialSpacing={10}
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
                  stepValue={1000}
                  maxValue={6000}
                  noOfSections={6}
                  yAxisLabelTexts={[
                    '0',
                    '20%',
                    '50%',
                    '70%',
                    '80%',
                    '90%',
                    '100%',
                  ]}
                  labelWidth={40}
                  xAxisLabelTextStyle={{
                    color: COLORS.primaryWhiteRGBA,
                    fontSize: 12,
                    textAlign: 'center',
                  }}
                  showLine
                  lineConfig={{
                    color: COLORS.primaryYellowHex,
                    thickness: 1,
                    curved: true,
                    hideDataPoints: true,
                    shiftY: 20,
                    initialSpacing: -30,
                  }}
                />
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
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_14,
    marginBottom: SPACING.space_20,
  },
});

export default Statistics;
