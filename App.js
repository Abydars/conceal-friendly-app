import React from 'react';
import {
    StyleSheet,
    ImageBackground, StatusBar,
} from 'react-native';
import {Login} from "./src/components/Login";
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {GooglePlacesInput} from "./src/components/GooglePlacesInput";
import Home from "./src/components/Home";
import ContactScreen from "./src/components/ContactScreen";
import AboutScreen from "./src/components/AboutScreen";
import ProfileScreen from "./src/components/ProfileScreen";
import SplashScreen from "./src/components/SplashScreen";
import LogoutScreen from "./src/components/LogoutScreen";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const HomeNavigation = () => (
    <Drawer.Navigator
        initialRouteName="Home"
        drawerPosition={"right"}
        drawerType={"slide"}>
        <Drawer.Screen name="Home" component={Home}/>
        <Drawer.Screen name="Contact Support" component={ContactScreen}/>
        <Drawer.Screen name="Profile" component={ProfileScreen}/>
        <Drawer.Screen name="About" component={AboutScreen}/>
        <Drawer.Screen name="Logout" component={LogoutScreen}/>
    </Drawer.Navigator>
);

const AppContainer = () => (
    <NavigationContainer>
        <StatusBar backgroundColor="#20ac75" barStyle="light-content"/>
        <Stack.Navigator
            initialRouteName={"SplashScreen"}
            headerMode={"none"}>
            <Stack.Screen
                name="SplashScreen"
                component={SplashScreen}
            />
            <Stack.Screen
                name="Login"
                component={Login}
            />
            <Stack.Screen
                name="Home"
                component={HomeNavigation}
            />
        </Stack.Navigator>
    </NavigationContainer>
);

export default class App extends React.Component {
    render() {
        return (
            <AppContainer/>
        );
    }
}