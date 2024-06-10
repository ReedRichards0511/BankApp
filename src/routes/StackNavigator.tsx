import { createStackNavigator } from '@react-navigation/stack';
import { AllProductsScreen, NewProductScreen, ProductScreen } from '../infraestructure/screens';
import { GetAllProductsResponse } from '../domain/products.interfaces';



export type RootStackParams = {
    Products: undefined,
    Product: GetAllProductsResponse,
    NewProduct: undefined,
    EditProduct: GetAllProductsResponse
}


const Stack = createStackNavigator<RootStackParams>();

export const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{
        title: 'Banco',
        headerTitleAlign: 'center',
        headerTintColor: 'blue',
        headerStyle: {
          // backgroundColor: 'lightgray',
          borderBottomWidth: 1,
        }
    }}>
      <Stack.Screen name="Products" component={AllProductsScreen} />
      <Stack.Screen name="Product" component={ProductScreen} />
      <Stack.Screen name="NewProduct" component={NewProductScreen} />
      <Stack.Screen name="EditProduct" component={NewProductScreen} />
    </Stack.Navigator>
  );
}