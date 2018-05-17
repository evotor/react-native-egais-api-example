import React from 'react'
import {View, Text, TextInput} from 'react-native'
import styles from '../../res/styles'

const TextFilter = ({name, value, updateValue}) => (
    <View style={styles.filterItem}>
        <Text style={styles.whiteText}>
            {name}
        </Text>
        <TextInput
            style={[styles.textFilter, styles.white]}
            underlineColorAndroid='transparent'
            defaultValue={value}
            onChangeText={updateValue}/>
    </View>
);

export default TextFilter;