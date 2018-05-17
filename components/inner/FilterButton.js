import React from 'react'
import {View, Text, TouchableHighlight} from 'react-native'
import styles from '../../res/styles'

const FilterButton = ({onPress}) => (
    <TouchableHighlight
        style={[styles.filterButton, styles.white]}
        onPress={onPress}
        underlayColor='#8d8d8d'>
        <View style={[styles.container, styles.center]}>
            <View style={[styles.container, styles.row, styles.center]}>
                <Text style={styles.title}>
                    Выбор
                </Text>
            </View>
        </View>
    </TouchableHighlight>
);

export default FilterButton