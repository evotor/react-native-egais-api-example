import React from 'react'
import {View, Text, TouchableOpacity} from 'react-native'
import {formatDate} from 'abstract-query-builder'
import styles from '../../res/styles'

const DateFilterItem = ({value, updateValue}) => (
        <TouchableOpacity
            style={[styles.dateFilter, styles.white]}
            onPress={updateValue}>
            <View style={[styles.container, styles.center]}>
                <View style={[styles.container, styles.row, styles.center]}>
                    <Text>{formatDate(value)}</Text>
                </View>
            </View>
        </TouchableOpacity>
);

export default DateFilterItem;