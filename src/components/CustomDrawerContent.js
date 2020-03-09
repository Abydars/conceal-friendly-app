import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem
} from '@react-navigation/drawer';
import {Fonts} from "./Fonts";

export default class CustomDrawerContent extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <DrawerContentScrollView {...this.props}>
                <View style={styles.drawerContainer}>
                    <View style={styles.logoContainer}>
                        <Image
                            style={styles.logo}
                            source={require('../assets/img/text-logo.png')}
                        />
                    </View>
                    <DrawerItemList
                        {...this.props}
                        activeBackgroundColor={'transparent'}
                        inactiveBackgroundColor={'transparent'}
                        activeTintColor={'#000'}
                        inactiveTintColor={'#000'}
                        itemStyle={{
                            padding: 0
                        }}
                        labelStyle={{
                            fontFamily: Fonts.Latolight,
                            fontSize: 14
                        }}
                    />
                </View>
            </DrawerContentScrollView>
        );
    }
}

const styles = StyleSheet.create({
    drawerContainer: {
        paddingHorizontal: 15
    },
    logoContainer: {
        marginHorizontal: 10,
        borderBottomWidth: 1,
        borderColor: '#EEE',
        marginBottom: 20
    },
    logo: {
        resizeMode: 'contain',
        width: '100%'
    }
});