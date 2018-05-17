import React from 'react'
import {View, Text, TouchableOpacity} from 'react-native'
import styles from '../../res/styles'

const OptionItem = ({onPress, text, containerStyle, contentStyle}) => (
    <TouchableOpacity onPress={onPress}>
        <View style={[containerStyle, styles.center]}>
            <View style={[contentStyle, styles.container, styles.row, styles.center, styles.white]}>
                <View style={[styles.container, styles.center]}>
                    <Text style={styles.title}>
                        {text.toUpperCase()}
                    </Text>
                </View>
            </View>
        </View>
    </TouchableOpacity>
);

export default OptionItem