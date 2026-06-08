import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaView, StyleSheet } from 'react-native';

import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import ProfileScreen from './screens/ProfileScreen';
import MenuScreen from './screens/MenuScreen';

// Icônes SVG
const HomeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 9L12 3L21 9V20H3V9Z" stroke="#2563EB" strokeWidth="2" fill="white"/>
    <path d="M9 20V12H15V20" stroke="#2563EB" strokeWidth="2" fill="white"/>
  </svg>
);

const SearchIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="10" r="7" stroke="#2563EB" strokeWidth="2"/>
    <path d="M15 15L21 21" stroke="#2563EB" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const ProfileIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="8" r="4" stroke="#2563EB" strokeWidth="2"/>
    <path d="M4 20C4 16.8 6.8 14 12 14C17.2 14 20 16.8 20 20" stroke="#2563EB" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const MenuIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 6H20" stroke="#2563EB" strokeWidth="2" strokeLinecap="round"/>
    <path d="M4 12H20" stroke="#2563EB" strokeWidth="2" strokeLinecap="round"/>
    <path d="M4 18H20" stroke="#2563EB" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused }) => {
              let IconComponent;
              if (route.name === 'Accueil') IconComponent = HomeIcon;
              else if (route.name === 'Recherche') IconComponent = SearchIcon;
              else if (route.name === 'Profil') IconComponent = ProfileIcon;
              else IconComponent = MenuIcon;
              return <IconComponent />;
            },
            tabBarActiveTintColor: '#2563EB',
            tabBarInactiveTintColor: '#9CA3AF',
            headerShown: false,
            tabBarStyle: styles.bottomBar,
          })}
        >
          <Tab.Screen name="Accueil" component={HomeScreen} />
          <Tab.Screen name="Recherche" component={SearchScreen} />
          <Tab.Screen name="Profil" component={ProfileScreen} />
          <Tab.Screen name="Menu" component={MenuScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  bottomBar: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingBottom: 10,
    paddingTop: 10,
    height: 60,
  },
});