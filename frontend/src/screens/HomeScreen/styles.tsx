import { Dimensions, StyleSheet } from 'react-native'

var maxWidth = Dimensions.get('window').width //full width
var maxHeight = Dimensions.get('window').height //full height

const styles = StyleSheet.create({
    container: {
        width: maxWidth,
        height: maxHeight,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default styles
