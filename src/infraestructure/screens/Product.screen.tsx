import { useRef } from 'react';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RootStackParams } from '../../routes/StackNavigator';
import { Modalize } from 'react-native-modalize';
import { useDeleteFinancialProduct } from '../../application/hooks';
import { Alert } from 'react-native';
import { ButtonComponent } from '../components';



export const ProductScreen = () => {
  const modalizeRef = useRef<Modalize>(null);
  const params = useRoute<RouteProp<RootStackParams, 'Product'>>().params;
  const navigator = useNavigation<NavigationProp<RootStackParams>>();
  const date_release = new Date(params.date_release).toLocaleDateString();
  const date_revision = new Date(params.date_revision).toLocaleDateString();
  const { deleteFinancialProduct, isDeletingFinancialProduct, isErrorDeletingFinancialProduct } = useDeleteFinancialProduct();


  const onOpen = () => {
    modalizeRef.current?.open();
  }

  const handleDeleteProduct = async () => {
    const resp = await deleteFinancialProduct(params.id);
    if (isErrorDeletingFinancialProduct) {
      onErrorDeleteProduct();
      return;
    }
    onSuccessDeleteProduct();
  };

  const handleEditProduct = () => {
    navigator.navigate('EditProduct', params);
  }


  const onSuccessDeleteProduct = () => {
    Alert.alert('Producto eliminado', 'El producto ha sido eliminado correctamente', [
      {
        text: 'Aceptar',
        onPress: () => {
          modalizeRef.current?.close();
          navigator.goBack();
        },
      },
    ]);
  };
  const onErrorDeleteProduct = () => {
    Alert.alert('Error al eliminar', 'Ha ocurrido un error al eliminar el producto', [
      {
        text: 'Aceptar',
        onPress: () => modalizeRef.current?.close(),
      },
    ]);
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.idContainer}>
        <Text style={styles.idText}>ID: {params.id}</Text>
        <Text style={styles.descriptionText}>Información extra</Text>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Nombre:</Text>
          <Text style={styles.value}>{params.name}</Text>
        </View>
        <View style={styles.infoRowWrap}>
          <Text style={styles.label}>Descripción:</Text>
          <Text style={styles.value}>{params.description}</Text>
        </View>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>Logo</Text>
          <Image source={{ uri: params.logo }} style={styles.logoImage} />
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Fecha de liberación:</Text>
          <Text style={styles.value}>{date_release}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Fecha de revisión:</Text>
          <Text style={styles.value}>{date_revision}</Text>
        </View>
      </View>
      <View style={{ paddingTop: 150, justifyContent: 'center', alignContent: 'center', alignItems: 'center', gap: 10 }}>
        <ButtonComponent
          title='Editar'
          handlePress={handleEditProduct}
          primaryColor='lightgray'
          textColor='blue'

        />
        <ButtonComponent
          title='Eliminar'
          handlePress={onOpen}
          primaryColor='red'
          textColor='white'
        />
      </View>
      <Modalize
        ref={modalizeRef}
        snapPoint={400}
        avoidKeyboardLikeIOS={true}
        HeaderComponent={
          <View style={{
            width: '100%',
            height: 50,
            backgroundColor: 'white',
            borderBottomWidth: 2, borderStyle: 'solid', borderBottomColor: 'lightgray',
          }}>
          </View>
        }
      >
        <View>
          <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', marginTop: 20 }}>¿Estás seguro de eliminar el producto {params.name}?</Text>
          <View style={{ flexDirection: 'column', justifyContent: 'center', marginTop: 80, alignItems: 'center', gap: 20 }}>
            <ButtonComponent
              title={isDeletingFinancialProduct ? 'Eliminando...' : 'Eliminar'}
              handlePress={handleDeleteProduct}
              primaryColor='yellow'
              textColor='blue'
            />
            <ButtonComponent
              title='Cancelar'
              handlePress={() => modalizeRef.current?.close()}
              primaryColor='lightgray'
              textColor='blue'
            />
          </View>
        </View>
      </Modalize>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: 'white',
    paddingHorizontal: 60,
  },
  idContainer: {
    marginBottom: 40,
  },
  idText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
  },
  descriptionText: {
    marginTop: 10,
    fontSize: 16,
    color: 'black',
  },
  infoContainer: {
    paddingTop: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  infoRowWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    flexWrap: 'wrap',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'gray',
  },
  value: {
    fontSize: 16,
    color: 'black',
  },
  logoContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  logoText: {
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'left',
  },
  logoImage: {
    width: 250,
    height: 120,
  },
})