import { RouteProp, useRoute } from '@react-navigation/native';
import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RootStackParams } from '../../routes/StackNavigator';
import { ButtonComponent } from '../components/Button.component';
import {Modalize} from 'react-native-modalize';
import { useRef } from 'react';



export const ProductScreen = () => {
  const params = useRoute<RouteProp<RootStackParams, 'Product'>>().params;
  const date_release = new Date(params.date_release).toLocaleDateString();
  const date_revision = new Date(params.date_revision).toLocaleDateString();

  const modalizeRef = useRef<Modalize>(null);

  const onOpen = () => {
    modalizeRef.current?.open();
  };


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
          <Text style={styles.value}>{params.name}</Text>
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
      <View style={{ paddingTop: 150, justifyContent:'center', alignContent:'center', alignItems:'center', gap:10}}>
        <ButtonComponent
          title='Editar'
          handlePress={() => console.log('Editando')}
          primaryColor='lightgray'
          textColor='blue'
      
        />
        <ButtonComponent
          title='Eliminar'
          handlePress={onOpen}
          primaryColor='red'
          textColor='white'
        />
         <Modalize ref={modalizeRef} snapPoint={500}>
         <Text>¿Estás seguro de eliminar el producto?</Text>
         </Modalize>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: 'white',
    paddingHorizontal: 50,
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