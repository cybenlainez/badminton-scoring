import React from 'react'
import { StyleSheet } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { COLORS, SPACING } from '../theme/theme'
import { BlurView } from '@react-native-community/blur'
import HistoryScreen from '../screens/History'
import ScoreScreen from '../screens/Score'
import StatisticsScreen from '../screens/Statistics'
import ProfileScreen from '../screens/Profile'
import SettingsScreen from '../screens/Settings'
import { HomeSimpleDoor, NintendoSwitch, Reports, ProfileCircle, Settings } from 'iconoir-react-native'

const Tab = createBottomTabNavigator()

const TabNavigator = () => {
  return (
    <Tab.Navigator
        screenOptions={{
            tabBarHideOnKeyboard: true,
            headerShown: false,
            tabBarShowLabel: true,
            tabBarStyle: styles.tabBarStyle,
            tabBarActiveTintColor: COLORS.primaryGreenHex,
            tabBarBackground: () => (
                <BlurView
                    overlayColor=""
                    blurAmount={15}
                    style={styles.BlurViewStyles}>
                </BlurView>
            ), 
        }}>
        <Tab.Screen
            name="Home"
            component={HistoryScreen}
            options={{
                tabBarIcon: ({ focused, color, size }) => (
                    <HomeSimpleDoor
                        width={25}
                        height={25}
                        strokeWidth={1}
                        color={focused ? COLORS.primaryGreenHex : COLORS.primaryLightGreyHex}
                    />
                ),
        }}></Tab.Screen>
        <Tab.Screen
            name="Statistics"
            component={StatisticsScreen}
            options={{
                tabBarIcon: ({ focused, color, size }) => (
                    <Reports
                        width={25}
                        height={25}
                        strokeWidth={1}
                        color={focused ? COLORS.primaryGreenHex : COLORS.primaryLightGreyHex}
                    />
                ),
        }}></Tab.Screen>
        <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
                tabBarIcon: ({ focused, color, size }) => (
                    <ProfileCircle
                        width={25}
                        height={25}
                        strokeWidth={1}
                        color={focused ? COLORS.primaryGreenHex : COLORS.primaryLightGreyHex}
                    />
                ),
        }}></Tab.Screen>
        <Tab.Screen
            name="Settings"
            component={SettingsScreen}
            options={{
                tabBarIcon: ({ focused, color, size }) => (
                    <Settings
                        width={25}
                        height={25}
                        strokeWidth={1}
                        color={focused ? COLORS.primaryGreenHex : COLORS.primaryLightGreyHex}
                    />
                ),
        }}></Tab.Screen>
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
    tabBarStyle: {
        height: 70,
        position: 'absolute',
        backgroundColor: COLORS.secondaryBlackRGBA,
        borderTopWidth: 0,
        elevation: 0,
        borderTopColor: 'transparent',
        paddingBottom: SPACING.space_15,
        //display: 'none'
    },
    BlurViewStyles: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
})

export default TabNavigator
