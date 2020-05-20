import React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

const Bodytext = (props) => {
    /** 
     * including the 'props.style first allows
     * for custom styles to be passed into the component
     * but sets absolute styles that should be consistent as overrides
     * like the font to use... 
     */
    return( 
        <View style={ {  ...styles.body, ...props.style } }>
            {props.children}
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        fontFamily: "open-sans"
    }
})

export default Bodytext;