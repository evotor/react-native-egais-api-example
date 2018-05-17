import React from 'react'
import {StackNavigator} from 'react-navigation'
import Options from "./components/Options"
import List from "./components/List"

const AppContent = StackNavigator(
    {
        Options: {
            screen: Options
        },
        List: {
            screen: List
        }
    }
);

export default class App extends React.Component {

    render() {
        return <AppContent/>
    }

}


