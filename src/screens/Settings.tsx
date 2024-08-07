import React, {useState} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from '../components/Header';
import {COLORS, FONTSIZE, SPACING} from '../theme/theme';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {NavArrowRight, NavArrowLeft} from 'iconoir-react-native';
import Gender from '../components/Gender';
import Venue from '../components/Venue';

const Settings = () => {
  const tabBarHeight = useBottomTabBarHeight();
  const [showList, setShowList] = useState(true);
  const [showGender, setShowGender] = useState(false);
  const [showVenue, setShowVenue] = useState(false);

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
              {showList && (
                <View>
                  <TouchableOpacity
                    style={styles.item}
                    onPress={() => {
                      setShowList(false);
                      setShowGender(true);
                    }}>
                    <Text style={styles.itemText}>Gender</Text>
                    <NavArrowRight
                      width={25}
                      height={25}
                      strokeWidth={1}
                      color={COLORS.primaryWhiteRGBA}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.item}
                    onPress={() => {
                      setShowList(false);
                      setShowVenue(true);
                    }}>
                    <Text style={styles.itemText}>Venue</Text>
                    <NavArrowRight
                      width={25}
                      height={25}
                      strokeWidth={1}
                      color={COLORS.primaryWhiteRGBA}
                    />
                  </TouchableOpacity>
                </View>
              )}
              {showGender && (
                <View>
                  <View style={styles.header}>
                    <TouchableOpacity
                      onPress={() => {
                        setShowList(true);
                        setShowGender(false);
                      }}>
                      <NavArrowLeft
                        width={25}
                        height={25}
                        strokeWidth={1}
                        color={COLORS.primaryWhiteRGBA}
                      />
                    </TouchableOpacity>
                    <Text style={styles.status}>STATUS</Text>
                  </View>
                  <Gender />
                </View>
              )}
              {showVenue && (
                <View>
                  <View style={styles.header}>
                    <TouchableOpacity
                      onPress={() => {
                        setShowList(true);
                        setShowVenue(false);
                      }}>
                      <NavArrowLeft
                        width={25}
                        height={25}
                        strokeWidth={1}
                        color={COLORS.primaryWhiteRGBA}
                      />
                    </TouchableOpacity>
                    <Text style={styles.status}>STATUS</Text>
                  </View>
                  <Venue />
                </View>
              )}
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
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: SPACING.space_15,
    paddingLeft: SPACING.space_10,
    paddingRight: SPACING.space_10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.quarternaryWhiteRGBA,
  },
  itemText: {
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_14,
    marginBottom: SPACING.space_20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: SPACING.space_10,
  },
  status: {
    color: COLORS.secondaryWhiteRGBA,
    fontWeight: 'bold',
    fontSize: FONTSIZE.size_12,
  }
});

export default Settings;
