import { StyleSheet, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';


export const NotFoundProductComponent = () => {
    return (
        <View style={styles.mainContainer}>
            <View>
                <Text style={{textAlign:'center'}}>No se encontraron Productos</Text>
                <Icon name="sad-outline" size={130} color="gray" />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        padding: 20,
        paddingTop: 150,
        
    },
})