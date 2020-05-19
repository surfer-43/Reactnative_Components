import React from 'react';
import {
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
        <Text style={ { ...props.style, ...styles.body} }>
            {props.children}
        </Text>
    )
}

const styles = StyleSheet.create({
    body: {
        fontFamily: "open-sans"
    }
})

export default Bodytext;