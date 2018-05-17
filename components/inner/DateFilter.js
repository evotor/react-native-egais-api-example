import React from 'react'
import {DatePickerAndroid, TimePickerAndroid, Text, View} from 'react-native'
import styles from '../../res/styles'
import DateFilterItem from "./DateFilterItem"

export default class DateFilter extends React.Component {

    render = () =>
        <View style={styles.filterItem}>
            <Text style={styles.whiteText}>
                Период
            </Text>
            <View style={styles.center}>
                <View style={[styles.row, styles.dateContainer]}>
                    <DateFilterItem
                        value={this.props.values[0]}
                        updateValue={() => this.updateValue(0)}/>
                    <View style={[styles.dateSeparator, styles.row, styles.center]}>
                        <Text style={[styles.title, styles.container, styles.centerText, styles.whiteText]}>
                            —
                        </Text>
                    </View>
                    <DateFilterItem
                        value={this.props.values[1]}
                        updateValue={() => this.updateValue(1)}/>
                </View>
            </View>
        </View>;

    async updateValue(i) {
        const oldDate = new Date(this.props.values[i]);
        const {action, year, month, day} = await DatePickerAndroid.open({date: oldDate});
        if (action !== DatePickerAndroid.dismissedAction) {
            const newDate = new Date(year, month, day);
            const {action, hour, minute} = await TimePickerAndroid.open({
                hour: oldDate.getHours(),
                minute: oldDate.getMinutes(),
                is24Hour: true
            });
            if (action !== TimePickerAndroid.dismissedAction) {
                newDate.setHours(hour);
                newDate.setMinutes(minute);
            }
            const values = this.props.values;
            values[i] = newDate;
            this.props.updateValue(values)
        }
    }

}