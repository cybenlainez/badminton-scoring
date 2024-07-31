import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import TabNavigator from './src/navigators/TabNavigator'
import HistoryScreen from './src/screens/History'
import StatisticsScreen from './src/screens/Statistics'
import ScoreScreen from './src/screens/Score'
import ProfileScreen from './src/screens/Profile'
import SettingsScreen from './src/screens/Settings'
// import SplashScreen from 'react-native-splash-screen'
import { Provider } from 'react-redux'
import { store } from './src/store/store'

const Stack = createNativeStackNavigator()

const App = () => {

  // useEffect(() => {
  //   SplashScreen.hide()
  // }, [])

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Tab" component={ TabNavigator } options={{ animation: 'slide_from_bottom'}}></Stack.Screen>
          <Stack.Screen name="Score" component={ ScoreScreen } options={{ animation: 'slide_from_bottom'}}></Stack.Screen>
          {/* <Stack.Screen name="Home" component={ HistoryScreen } options={{ animation: 'slide_from_bottom'}}></Stack.Screen>
          <Stack.Screen name="Statistics" component={ StatisticsScreen } options={{ animation: 'slide_from_bottom'}}></Stack.Screen>
          <Stack.Screen name="Profile" component={ ProfileScreen } options={{ animation: 'slide_from_bottom'}}></Stack.Screen>
          <Stack.Screen name="Settings" component={ SettingsScreen } options={{ animation: 'slide_from_bottom'}}></Stack.Screen> */}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

export default App
