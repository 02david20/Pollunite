import { Dimensions, StyleSheet } from 'react-native'

var maxWidth = Dimensions.get('window').width //full width
var maxHeight = Dimensions.get('window').height //full height

const styles = StyleSheet.create({
    container: {
        width: 400,
        height: maxHeight,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject
      },
})

export default styles
