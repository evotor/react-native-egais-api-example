import React from 'react'
import {View, FlatList, Modal} from 'react-native'
import Filter from "./inner/Filter"
import ListItem from "./inner/ListItem"
import FilterButton from "./inner/FilterButton"
import styles from '../res/styles'
import {getDayAgoDate} from "../res/options";

export default class List extends React.Component {

    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.state.params.name,
            headerStyle: styles.deepGrey,
            headerTintColor: 'white',
        }
    };

    constructor(props) {
        super(props);
        const filterValues = [];
        props.navigation.state.params.filters.forEach(
            (item) => {
                switch (item.type) {
                    case 'text':
                        filterValues.push("");
                        break;
                    case 'date':
                        filterValues.push([getDayAgoDate(), new Date()]);
                        break
                }
            }
        );
        this.state = {listData: [], filterVisible: false, filterValues: filterValues};
        this.updateFilterValue = this.updateFilterValue.bind(this);
        this.refreshList = this.refreshList.bind(this)
    }

    componentDidMount = () => this.refreshList();

    async refreshList(base, closeFilter) {
        const [query, listData] = [base || this.props.navigation.state.params.init(), []];
        (await query.execute()).forEach(
            (item, i) => listData.push({key: i.toString(), text: JSON.stringify(item)})
        );
        this.setState({listData});
        if (closeFilter) {
            this.setState({filterVisible: false})
        }
    }

    render = () =>
        <View style={[styles.container, styles.middleGrey]}>
            <Modal
                animationType='fade'
                transparent={true}
                visible={this.state.filterVisible}
                onRequestClose={() => this.setState({filterVisible: false})}>
                <Filter
                    filters={this.props.navigation.state.params.filters}
                    values={this.state.filterValues}
                    updateValue={this.updateFilterValue}
                    refreshList={this.refreshList}/>
            </Modal>
            <View style={[styles.filterButtonTop, styles.white]}/>
            <FlatList
                style={styles.container}
                data={this.state.listData}
                renderItem={this._renderItem}
                ItemSeparatorComponent={this._renderSeparator}/>
            <FilterButton onPress={() => this.setState({filterVisible: true})}/>
        </View>;

    _renderItem = ({item}) => <ListItem text={item.text}/>;

    _renderSeparator = () => <View style={[styles.listSeparator, styles.grey]}/>;

    updateFilterValue(i, value) {
        const filterValues = this.state.filterValues;
        filterValues[i] = value;
        this.setState({filterValues})
    }

}