import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { useGetFinancialProducts } from '../../application/hooks'
import { type NavigationProp, useNavigation } from '@react-navigation/native';
import { type RootStackParams } from '../../routes/StackNavigator';
import { useEffect, useState } from 'react';
import { GetAllProductsResponse } from '../../domain/products.interfaces';
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ProductItemComponent } from '../components/ProductItem.component';
import { ButtonComponent } from '../components/Button.component';

export const AllProductsScreen = () => {
    const [search, setSearch] = useState('');
    const [products, setProducts] = useState<GetAllProductsResponse[]>([]);
    const navigation = useNavigation<NavigationProp<RootStackParams>>();
    const { financialProducts, isLoadingFinancialProducts, isErrorFinancialProducts } = useGetFinancialProducts();


    const searchProduct = (search: string) => {
        const filteredProducts = financialProducts.filter(product => product.name.toLowerCase().includes(search.toLowerCase()));
        setProducts(filteredProducts);
    }

    useEffect(() => {
        setProducts(financialProducts);
    }, [])


    if (isLoadingFinancialProducts) return <Text>Loading...</Text>

    if (isErrorFinancialProducts) return <Text>Error</Text>

    return (
        <View style={styles.mainContainer}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.inputStyle}
                    placeholder='Search ...'
                    value={search}
                    onChangeText={search => {
                        setSearch(search);
                        searchProduct(search);
                    }}
                />
            </View>
            <View style={styles.listContainer}>
                <FlatList
                    data={products}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <ProductItemComponent item={item} onNext={() => navigation.navigate('Product', item)} />
                    )}
                />
                <ButtonComponent  
                title='Agregar'
                handlePress={() => navigation.navigate('NewProduct')}
                primaryColor='yellow'
                textColor='black'
            />
            </View>
            
        </View>
    )
}



const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
    },
    inputStyle: {
        width: 500,
        height: 60,
        borderColor: 'gray',
        borderWidth: 0.3,
        borderRadius: 5,
        margin: 10,
        padding: 10

    },
    inputContainer: {
        paddingVertical: 30,
    },
    listContainer: {
        flex: 1,
        width: 510,
        paddingTop: 20,
        margin: 10,
        padding: 10
    },

})