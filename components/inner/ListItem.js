import React from 'react'
import {Text} from 'react-native'
import styles from '../../res/styles'

const ListItem = ({text}) => (
    <Text style={[styles.whiteText, styles.listItem]}>
        {text}
    </Text>
);

export default ListItem