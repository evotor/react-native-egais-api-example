import React from 'react'
import {View} from 'react-native'
import styles from "../../res/styles"
import OptionItem from "./OptionItem"
import TextFilter from "./TextFilter"
import DateFilter from "./DateFilter"

export default class Filter extends React.Component {

    constructor(props) {
        super(props);
        this.apply = this.apply.bind(this)
    }

    render = () =>
        <View style={[styles.filter, this._getFilterHeight(), styles.center, styles.middleGrey]}>
            <View style={styles.container}>
                {this._renderContent()}
            </View>
            <OptionItem
                containerStyle={styles.applyButtonContainer}
                contentStyle={styles.applyButtonContent}
                onPress={this.apply}
                text="Применить"/>
            <View style={[styles.filterButtonTop, styles.white]}/>
        </View>;

    _getFilterHeight() {
        switch (this.props.filters.length) {
            case 1:
                return styles.filterHeightOne;
            case 2:
                return styles.filterHeightTwo
        }
    }

    _renderContent() {
        const filterComponents = [];
        this.props.filters.forEach(
            (item, i) => {
                switch (item.type) {
                    case 'text':
                        filterComponents.push(
                            <TextFilter
                                key={i}
                                name={item.name}
                                value={this.props.values[i]}
                                updateValue={(value) => this.props.updateValue(i, value)}/>
                        );
                        break;
                    case 'date':
                        filterComponents.push(
                            <DateFilter
                                key={i}
                                values={this.props.values[i]}
                                updateValue={(values) => this.props.updateValue(i, values)}/>
                        );
                        break
                }
            }
        );
        return filterComponents
    }

    apply() {
        let base;
        this.props.values.forEach(
            (item, i) => {
                if (item.length) {
                    const currentApply = this.props.filters[i].apply(item);
                    if (!base) {
                        base = currentApply
                    } else {
                        base.intersection(currentApply)
                    }
                }
            }
        );
        this.props.refreshList(base ? base : null, true)
    }

}