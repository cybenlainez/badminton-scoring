import React from 'react';
import {ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import Header from '../components/Header';
import {COLORS, FONTSIZE, SPACING} from '../theme/theme';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';

const Settings = () => {
  const tabBarHeight = useBottomTabBarHeight();
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
              title="Settings"
              subtitle="All configurations of the application."
              isProfile={false}
              isBack={false}
              isSettings={false}
            />

            <View style={styles.content}>
              <View style={{padding: 10}}>
                <Text style={styles.title}>Gender</Text>
                <Text style={styles.title}>Venue</Text>
                <Text style={styles.title}>Country</Text>
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

export default Settings;
