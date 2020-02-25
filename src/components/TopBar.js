import React from 'react';
import {GlobalStyles} from "../helpers/GlobalStyles";
import {Image, TouchableOpacity, View} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

export default class TopBar extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={GlobalStyles.header}>
                <View style={GlobalStyles.headerLeft}>
                    <Image
                        style={GlobalStyles.headerLogo}
                        source={require('../assets/img/logo-icon.png')}
                    />
                </View>
                {this.props.centerContent}
                <View style={GlobalStyles.headerRight}>
                    <TouchableOpacity
                        onPress={this.props.navigation.toggleDrawer}
                        style={GlobalStyles.drawerButton}>
                        <Icon
                            style={GlobalStyles.drawerButtonIcon}
                            name="bars"
                            size={30}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}