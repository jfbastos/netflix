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
import { ProfileProvider } from './context/ProfileContext';
import { getLanguage, setLanguage } from './languages/Utils';
import { translate } from './languages/Utils';

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
          tabBarLabel: `${translate('home')}`,
          tabBarIcon: ({color, size}) => {
            return <Icon name="home" size={size} color={color} />;
          },
        }} />
      <Tab.Screen name="More" component={More}  
          options={{
          tabBarLabel: `${translate('more')}`,
          tabBarIcon: ({color, size}) => {
            return <Icon name="menu" size={size} color={color} />;
          },
        }} />
        <Tab.Screen name="Search" component={Home}  
          options={{
          tabBarLabel: `${translate('search')}`,
          tabBarIcon: ({color, size}) => {
            return <Icon name="search-web" size={size} color={color} />;
          },
        }} />
        <Tab.Screen name="Soon" component={Home}  
          options={{
          tabBarLabel:  `${translate('soon')}`,
          tabBarIcon: ({color, size}) => {
            return <Icon name="timer-sand" size={size} color={color} />;
          },
        }} />
        <Tab.Screen name="Downloads" component={Home}  
          options={{
          tabBarLabel: `${translate('downloads')}`,
          tabBarIcon: ({color, size}) => {
            return <Icon name="download" size={size} color={color} />;S
          },
        }} />
    </Tab.Navigator>
  );
}

const App = () => {

  const language = getLanguage();
  setLanguage(language);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);
  return (
    <ProfileProvider>
    <NavigationContainer>
      <Stack.Navigator>
          <Stack.Screen name="Tab" component={Tabs} options={{headerShown: false}}/>  
          <Stack.Screen name="ProfileToEdit" component={ProfileToEdit}/>    
          <Stack.Screen name="ChooseIcon" component={ChooseIcon}/>
          <Stack.Screen name='Camera' component={Camera}/>
      </Stack.Navigator>
    </NavigationContainer>
    </ProfileProvider>);
};
export default App;