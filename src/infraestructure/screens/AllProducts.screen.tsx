import { useCallback, useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native'
import { useGetFinancialProducts } from '../../application/hooks'
import { type NavigationProp, useNavigation, useFocusEffect } from '@react-navigation/native';
import { type RootStackParams } from '../../routes/StackNavigator';
import { GetAllProductsResponse } from '../../domain/products.interfaces';
import { ButtonComponent, NotFoundProductComponent, ProductItemComponent, SkeletonComponent } from '../components';
import { ErrorComponent } from '../components/Error.component';


export const AllProductsScreen = () => {
    const [search, setSearch] = useState('');
    const [products, setProducts] = useState<GetAllProductsResponse[]>([]);
    const navigation = useNavigation<NavigationProp<RootStackParams>>();
    const { financialProducts, isLoadingFinancialProducts, isErrorFinancialProducts, isRefetchingFinancialProducts, refetchFinancialProducts } = useGetFinancialProducts();


    const searchProduct = (search: string) => {
        const filteredProducts = financialProducts.filter(product =>
            product.name.toLowerCase().includes(search.toLowerCase())
        );
        setProducts(filteredProducts);
    }

    useEffect(() => {
        if (financialProducts.length > 0) {
            setProducts(financialProducts);
        }
    }, [financialProducts]);

    useEffect(() => {
        searchProduct(search);
    }, [search]);

    useFocusEffect(
        useCallback(() => {
            refetchFinancialProducts();
        }, [])
    );

    if (isLoadingFinancialProducts || isRefetchingFinancialProducts) {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#fff',
                padding: 20,
                gap: 10
            }}>
                {
                    Array.from({ length: 10 }).map((_, index) => (
                        <SkeletonComponent width={500} height={50} borderRadius={10}  key={index}/>
                    ))
                }
               
            </View>
        )
    }

    if (isErrorFinancialProducts) return <ErrorComponent />

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
                    editable={financialProducts.length > 0 ? true : false}
                />
            </View>
            {
                products.length === 0 ? (
                    <NotFoundProductComponent />
                )
                    :
                    (

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
                    )
            }

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