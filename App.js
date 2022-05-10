import React, { useEffect } from 'react';
import { Alert } from 'react-native';

import Home from './screen/Home';
import More from './screen/More';
import ProfileToEdit from './screen/ProfileToEdit'
import ChooseIcon from './screen/ChooseIcon'
import Camera from './screen/Camera'
import messaging from '@react-native-firebase/messaging';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator screenOptions={{
      tabBarActiveBackgroundColor: 'black',
      tabBarInactiveBackgroundColor: 'black',
      tabBarActiveTintColor: 'white'
    }}>
      <Tab.Screen 
        name="Home" 
        component={Home} 
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => {
            return <Icon name="home" size={size} color={color} />;
          },
        }} />
      <Tab.Screen name="More" component={More}  
          options={{
          tabBarLabel: 'More',
          tabBarIcon: ({color, size}) => {
            return <Icon name="menu" size={size} color={color} />;
          },
        }} />
        <Tab.Screen name="Search" component={Home}  
          options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({color, size}) => {
            return <Icon name="search-web" size={size} color={color} />;
          },
        }} />
        <Tab.Screen name="Soon" component={Home}  
          options={{
          tabBarLabel: 'Soon',
          tabBarIcon: ({color, size}) => {
            return <Icon name="timer-sand" size={size} color={color} />;
          },
        }} />
        <Tab.Screen name="Downloads" component={Home}  
          options={{
          tabBarLabel: 'Download',
          tabBarIcon: ({color, size}) => {
            return <Icon name="download" size={size} color={color} />;
          },
        }} />
    </Tab.Navigator>
  );
}

const App = () => {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator>
          <Stack.Screen name="Tab" component={Tabs} options={{headerShown: false}}/>  
          <Stack.Screen name="ProfileToEdit" component={ProfileToEdit}/>    
          <Stack.Screen name="ChooseIcon" component={ChooseIcon}/>
          <Stack.Screen name='Camera' component={Camera}/>
      </Stack.Navigator>
    </NavigationContainer>);
};
export default App;