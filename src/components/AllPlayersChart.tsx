import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, FONTSIZE} from '../theme/theme';
import {BarChart} from 'react-native-gifted-charts';

const AllPlayersChart = ({data}: any) => {
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

  return data.length > 0 ? (
    <View style={styles.barChartContainer}>
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
        yAxisLabelTexts={['0', '20%', '40%', '60%', '80%', '100%', '']}
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
              <Text style={{fontSize: 12, color: '#fff'}}>{item.player}</Text>
              <Text style={{fontSize: 10, color: '#fff'}}>
                {item.value.toFixed(2)}%
              </Text>
            </View>
          );
        }}
      />
      <Text style={styles.title}>ALL PLAYERS WIN RATES</Text>
    </View>
  ) : (
    <></>
  );
};

const styles = StyleSheet.create({
  barChartContainer: {
    padding: 10,
    alignItems: 'center',
    margin: 'auto',
  },
  title: {
    color: COLORS.primaryWhiteRGBA,
    fontSize: FONTSIZE.size_11,
  },
});

export default AllPlayersChart;
