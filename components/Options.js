import React from 'react'
import {View, ScrollView} from 'react-native'
import OptionItem from './inner/OptionItem'
import styles from '../res/styles'
import options from '../res/options'

export default class Options extends React.Component {

    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.state.params ? navigation.state.params.name : "Алкоголь",
            headerStyle: styles.deepGrey,
            headerTintColor: 'white',
        }
    };

    constructor(props) {
        super(props);
        const {params} = props.navigation.state;
        this.state = {
            options: params ? params.next : options
        }
    }

    render = () =>
        <ScrollView style={[styles.container, styles.deepGrey]}>
            <View>
                {this._renderContent()}
            </View>
        </ScrollView>;

    _renderContent() {
        const rows = [];
        this.state.options.forEach(
            (item, i) => rows.push(
                <OptionItem
                    key={i}
                    containerStyle={styles.optionItemContainer}
                    contentStyle={styles.optionItemContent}
                    onPress={() => this.props.navigation.navigate(item.next ? 'Options' : 'List', item)}
                    text={item.name}/>
            )
        );
        return rows
    }

}