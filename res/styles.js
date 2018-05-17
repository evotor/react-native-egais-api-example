import {StyleSheet, Dimensions} from 'react-native'

const fullWidth = Dimensions.get('window').width;
const fullHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    row: {
        flexDirection: 'row'
    },
    center: {
        alignItems: 'center'
    },
    centerText: {
        textAlign: 'center'
    },
    title: {
        fontWeight: 'bold'
    },
    optionItemContainer: {
        height: fullHeight / 10,
        marginTop: 15,
    },
    applyButtonContainer: {
        height: 50,
    },
    optionItemContent: {
        width: fullWidth - 80,
        borderRadius: 7,
        borderWidth: 1,
        borderColor: '#252525'
    },
    applyButtonContent: {
        width: fullWidth - 30,
        borderRadius: 7,
        borderWidth: 1,
        borderColor: '#252525'
    },
    listItem: {
        padding: 15
    },
    listSeparator: {
        height: 1,
        width: fullWidth - 14,
        marginLeft: 7,
    },
    filterButtonTop: {
        width: fullWidth,
        height: 5
    },
    filterButton: {
        position: 'absolute',
        left: 312,
        top: -4,
        width: 82,
        height: 32,
        borderRadius: 10,
        borderWidth: 0,
        borderColor: '#252525'
    },
    filter: {
        marginTop: 55
    },
    filterHeightOne: {
        height: 145
    },
    filterHeightTwo: {
        height: 225
    },
    filterItem: {
        width: fullWidth - 30,
        marginTop: 15
    },
    textFilter: {
        width: fullWidth - 45,
        height: 40,
        marginLeft: 15,
        marginTop: 5,
    },
    dateContainer: {
        marginLeft: 15,
        marginTop: 5
    },
    dateFilter: {
        width: (fullWidth) / 2 - 40,
        height: 40
    },
    dateSeparator: {
        width: 30,
        height: 40
    },
    transparent: {
        backgroundColor: 'transparent'
    },
    deepGrey: {
        backgroundColor: '#252525'
    },
    middleGrey: {
        backgroundColor: '#3b3f44'
    },
    grey: {
        backgroundColor: '#8d8d8d'
    },
    white: {
        backgroundColor: 'white'
    },
    whiteText: {
        color: 'white'
    }
});

export default styles