import { 
    Dimensions,
    StyleSheet
} from 'react-native';

export default StyleSheet.create({
    bodyText: {
        fontFamily: "open-sans",
        color: 'purple'
    },
    title: {
        fontSize: Dimensions.get('window').width < 400 ? 18 : 32,
        fontFamily: 'open-sans-bold'
    }
})