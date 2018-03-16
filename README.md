
# react-native-multi-state-button


A simple and customisable react-native multi-state button

## Features
- Customizable state by array of height
- Customizable speed during transition
- Draggable 

## Demo

<p align="center">
<img src="https://media.giphy.com/media/khNhEPTORpShRGolXq/giphy.gif" height="500" />
</p>

## Setup
Install it with: 

`npm install --save react-native-multi-state-button` , or 

`yarn add react-native-multi-state-button`.

## Usage

```javascript



import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';
import MSButton from 'react-native-multi-state-button';
const { width, height } = Dimensions.get('window')

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      index: 'not selected'
    }
  }

  render() {
    let { index } = this.state;
    return (
      <View style={styles.container}>
        <MSButton 
          width={width - 32}
          buttonsList={[ 'PEOPLE', 'ALL', 'ITEMS' ]} 
          onStateChange={(index => this.setState({index}))} />
        <Text style={styles.instructions}>
          Selected Index: {index}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 16
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginTop: 16,
  },
});
```
## props

| Name | Type| Default | Required | Description |
| --- | --- | --- | --- | --- |
| buttonsList | Array of String | NA | Yes | Array of string that will be displayed on each button respectively |
| width | number | NA | Yes | The width of the whole multi-state button |
| style | object | null | No | The style of the component|
| enableSlidingBackground | boolean | true | No | If it is true, there will be a sliding background |
| slidingBackgroundColor | string | '#000' | No | The color of the sliding background |
| selectedColor | string | '#FFF' | No | The color of the selected font color|
| unselectedColor | string | '#000' | No | The color of the unselected font color |
| initialIndex | number | null | No | The initial index of the multi-state button |
| onStateChange | func | (index) => null | No | return the selected index when a button is pressed |
| buttonFontStyle | object | null | No | The style of the button font |

