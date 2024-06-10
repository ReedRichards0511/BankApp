import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GetAllProductsResponse } from '../../domain/products.interfaces';
import Icon from 'react-native-vector-icons/Ionicons';


interface ProductItemProps {
    item: GetAllProductsResponse
    onNext: () => void
}

export const ProductItemComponent = ({ item, onNext }: ProductItemProps) => {



    return (
        <TouchableOpacity onPress={onNext}>
            <View style={styles.itemContainer}>
                <View style={styles.nameContainer}>
                    <Text>{item.name}</Text>
                    <Text style={{paddingTop:6}}>ID: {item.id}</Text>
                </View>
                <Icon name="chevron-forward-outline" size={30} color="gray" />
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderWidth: 0.3,
        borderColor: 'gray',
        paddingVertical: 20
    },
    nameContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
    }
})