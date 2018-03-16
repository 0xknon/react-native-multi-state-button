import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Text,
  Animated,
  TouchableOpacity,
  PanResponder,
  Dimensions,
  ScrollView
} from 'react-native';
const { width, height } = Dimensions.get('window');

class MultipleStateButton extends React.Component {

    constructor(props) {
        super(props);
        let { initialIndex, onStateChange, buttonsList } = this.props;
        this.numberOfButtons = buttonsList.length;
        this.selectorWidth = this.props.width / this.numberOfButtons;

        let newButtonsList = [];
        buttonsList.map((text, index) => {
            if (index == initialIndex) {
                newButtonsList.push({
                    text,
                    isSelected: true
                });
            } else {
                newButtonsList.push({
                    text,
                    isSelected: false
                });
            }
        });
        onStateChange(initialIndex);
        this.state = {
            index: initialIndex != null? new Animated.Value(initialIndex) : initialIndex,
            indexVal: initialIndex,
            buttonsList: newButtonsList
        }


    }

    renderAnimatedSelector() {
        let { buttonsList } = this.state
        let { width, slidingBackgroundColor, slidingBackgroundStyle } = this.props
        return (
            
            <Animated.View 
                style={[styles.selectorContainer, {
                    backgroundColor: slidingBackgroundColor,
                    width: this.selectorWidth,
                    transform: [{
                        translateX: this.state.index.interpolate({
                            inputRange: [0, buttonsList.length],
                            outputRange: [0, width]  // 0 : 150, 0.5 : 75, 1 : 0
                        }),
                    }]}, slidingBackgroundStyle]}>
                    <Text 
                        style={[styles.buttonFontStyle, {color: 'rgba(0,0,0,0)'}]}>
                        {buttonsList[0].text}
                    </Text>
            </Animated.View>

        );
    }

    render() {
        let { buttonFontStyle, enableSlidingBackground, initialIndex, selectedColor, unselectedColor, style, width } = this.props;
        let { index } = this.state;
        return (
            <View style={[style, styles.container, {width}]}>
                {this.state.buttonsList.map((button, index) => (
                    <TouchableOpacity 
                        key={index} style={[styles.stateButton, {width: this.selectorWidth}]} 
                        onPress={() => this.onPress(index)}>
                        <Text style={[buttonFontStyle, !button.isSelected? {color: unselectedColor} : {color: selectedColor}]}>
                            {button.text}
                        </Text>
                    </TouchableOpacity>
                ))}
                { index != null && enableSlidingBackground && this.renderAnimatedSelector() }
            </View>
        );
    }

    onPress(selectedIndex) {
        let { enableSlidingBackground, onStateChange } = this.props;
        let { index, buttonsList, indexVal } = this.state;

        let newButtonList = buttonsList;
        if (indexVal != null) 
            newButtonList[indexVal].isSelected = false;
        newButtonList[selectedIndex].isSelected = true;
        this.setState({
            buttonsList: newButtonList,
            indexVal: selectedIndex
        });

        if (enableSlidingBackground) {
            if (index == null) {
                this.setState({
                    index: new Animated.Value(selectedIndex),
                    indexVal: selectedIndex
                })
            } else {
                Animated.timing(                  // Animate over time
                    index,           
                    {
                        toValue: selectedIndex,
                        duration: 500,              // Make it take a while
                    }
                ).start(); 
            }
        } 

        onStateChange(selectedIndex);
    }
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 20, 
        justifyContent: 'space-between', 
        flexDirection: 'row', 
        backgroundColor: 'rgba(255,255,255,1)',
        shadowOpacity: 0.2,
        shadowRadius: 1,
        shadowOffset: {
            height: 1,
            width: 0
        },
    },
    selectorContainer: {
        position: 'absolute', 
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        zIndex: 2,
        borderRadius: 20, 
    },
    stateButton: {
        padding: 10, 
        justifyContent: 'center', 
        alignItems: 'center', 
        zIndex: 3
    }
});

MultipleStateButton.propTypes = {
    buttonsList: PropTypes.arrayOf(PropTypes.string).isRequired,
    width: PropTypes.number.isRequired,
    style: PropTypes.object,
    enableSlidingBackground: PropTypes.bool,
    slidingBackgroundColor: PropTypes.string,
    selectedColor: PropTypes.string,
    unselectedColor: PropTypes.string,
    initialIndex: PropTypes.number,
    onStateChange: PropTypes.func,
    buttonFontStyle: PropTypes.object,
    slidingBackgroundStyle: PropTypes.object,
};

MultipleStateButton.defaultProps = {
    style: null,
    enableSlidingBackground: true,
    slidingBackgroundColor: '#000',
    selectedColor: '#FFF',
    unselectedColor: '#000',
    initialIndex: null,
    onStateChange: (index) => null,
    buttonFontStyle: null,
    slidingBackgroundStyle: null
};

export default MultipleStateButton;

