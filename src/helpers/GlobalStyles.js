import {Fonts} from '../components/Fonts';

export const GlobalStyles = {
    container: {
        flex: 1
    },
    header: {
        flex: 1,
        flexDirection: 'row',
        padding: 5,
        position: 'absolute',
        zIndex: 9,
        top: 0,
        left: 0,
        right: 0
    },
    headerLeft: {
        width: '20%',
        padding: 5,
        alignItems: 'center',
    },
    headerCenter: {
        width: '60%',
        padding: 5,
    },
    headerRight: {
        width: '20%',
        padding: 5,
        alignItems: 'center'
    },
    headerLogo: {
        resizeMode: 'contain',
        width: '100%',
        height: 80
    },
    drawerButton: {
        backgroundColor: '#FFF',
        borderRadius: 3,
        padding: 8,
        textAlign: 'center',
        marginTop: 15,
        width: 40,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        elevation: 16,
    },
    drawerButtonIcon: {
        color: '#21ac75',
        textAlign: 'center',
        fontSize: 20
    },
    headerTextLogo: {
        resizeMode: 'contain',
        width: '100%',
        paddingHorizontal: 10
    },
    pageContent: {
        marginTop: 120
    },
    pageHeading: {
        fontSize: 40,
        fontFamily: Fonts.Latolight,
        color: '#53b584',
        textAlign: 'center'
    },
    pageText: {
        marginTop: 20,
        alignSelf: 'center',
        fontSize: 15,
        width: 320,
        textAlign: 'center',
        fontFamily: Fonts.Latoregular,
    }
};