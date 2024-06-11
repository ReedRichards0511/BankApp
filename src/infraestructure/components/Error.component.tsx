import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


export const ErrorComponent = () => {
    return (
        <View style={styles.mainContainer}>
           
                <Text style={{ textAlign: 'center' }}>Error al cargar los productos</Text>
                <Icon name="cloud-offline-outline" size={130} color="gray" />
       
        </View>

    )
}
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        paddingTop: 150,
        gap: 70,
        flexDirection: 'column',
        alignItems: 'center',


    },
})