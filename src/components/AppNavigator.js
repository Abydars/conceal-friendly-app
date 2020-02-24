import React,{Component} from 'react';
import { createDrawerNavigator } from 'react-navigation-drawer';
import {createAppContainer,DrawerNavigator} from 'react-navigation';
import Contact from "./src/components/Contact.js";
import PrivacyPolicy from "./src/components/PrivacyPolicy.js";
//if you want custom design for side then you have to make a sperate SideMenu.js file
import SideMenu from './src/components/SideMenu.js';

const AppNavigator=createDrawerNavigator({
     PrivacyPolicy:{
        screen:PrivacyPolicy
       },
      Contact:{
        screen:Contact
       }
     },{
//here you gonna have all the customization for your custom drawer and other things like width of side drawer etc
//remove contentComponent: SideMenu and observe the changes
          contentComponent : SideMenu,
          drawerWidth:250,
          drawerType:'slide'
});
export default createAppContainer(AppNavigator);