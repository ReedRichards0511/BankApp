import { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import DatePicker from 'react-native-date-picker';
import { formatDate } from '../../core/application/uitls';
import { NavigationProp, RouteProp, StackActions, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParams } from '../../routes/StackNavigator';
import { useCreateFinancialProduct, useUpdateFinancialProduct } from '../../application/hooks';
import { ButtonComponent } from '../components';


interface NewProductForm {
  id: string;
  name: string;
  description: string;
  logo: string;
  date_release: string;
  date_revision: string;
}


export const NewProductScreen = () => {

  const params = useRoute<RouteProp<RootStackParams, 'EditProduct'>>().params;
  const navigator = useNavigation<NavigationProp<RootStackParams>>();
  const { control, handleSubmit, formState: { errors }, setValue } = useForm<NewProductForm>();
  const [dateRelease, setDateRelease] = useState(new Date());
  const [dateRevision, setDateRevision] = useState(new Date());
  const [openRelease, setOpenRelease] = useState(false);
  const [openRevision, setOpenRevision] = useState(false);
  const { createNewProduct, isErrorCreateProduct, isLoadingCreateProduct } = useCreateFinancialProduct();
  const { updateFinancialProduct, isErrorUpdateFinancialProduct, isLoadingUpdateFinancialProduct } = useUpdateFinancialProduct();

  useEffect(() => {
    if (params) {
      setValue('id', params.id);
    }
  }, [params])


  const handleSelectDate = (date: Date) => {
    setValue('date_release', formatDate(date));
    setOpenRelease(false);
    setDateRelease(date);
  };

  const handleSelectDateRevision = (date: Date) => {
    setValue('date_revision', formatDate(date));
    setOpenRevision(false);
    setDateRevision(date);
  }


  const handleCreateNewProduct = async (data: NewProductForm) => {
    const response = await createNewProduct(data as any);
    if (response) {
      successFullAlert();
      setValue('id', '');
      setValue('name', '');
      setValue('description', '');
      setValue('logo', '');
      setValue('date_release', '');
      setValue('date_revision', '');
      return;
    }
    if (isErrorCreateProduct) {
      errorAlert();
    }
  }

  const handleUpdateProduct = async (data: NewProductForm) => {
    const response = await updateFinancialProduct(data as any);
    if (response) {
      successFullAlert();
      return;
    }
    if (isErrorUpdateFinancialProduct) {
      errorAlert();
    }
  }


  const successFullAlert = () => {
    Alert.alert(
      "Producto creado",
      `El producto ha sido ${params ? 'actualizado' : 'creado'} correctamente`,
      [
        { text: "OK", onPress: () => navigator.dispatch(StackActions.popToTop()) }
      ]
    );
  }

  const errorAlert = () => {
    Alert.alert(
      "Error",
      `El producto no pudo ser ${params ? 'actualizado' : 'creado'} correctamente`,
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );
  }


  return (
    <ScrollView style={styles.mainContainer}>
      <Text style={styles.title}>Formulario de Registro</Text>
      <View style={{ flexDirection: 'column', gap: 30 }}>
        <View style={styles.inputContainer}>
          <Text>ID:</Text>
          <Controller
            control={control}
            rules={{
              required: 'Este campo es requerido',
              minLength: {
                value: 3,
                message: 'El id debe tener al menos 3 caracteres'
              },
              maxLength: {
                value: 10,
                message: 'El id no debe tener más de 10 caracteres'

              }
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                editable={params ? false : true}
                style={{
                  ...styles.inputText,
                  borderColor: errors.id ? 'red' : 'gray'
                }}

                onBlur={onBlur}
                onChangeText={onChange}
                value={params ? params.id : value}
              />

            )}
            name='id'
            defaultValue=''
          />
          {errors.id && <Text style={styles.errorText}>{errors.id.message}</Text>}
        </View>
        <View style={styles.inputContainer}>
          <Text>Nombre:</Text>
          <Controller
            control={control}
            rules={{
              required: 'Este campo es requerido',
              minLength: {
                value: 5,
                message: 'El nombre debe tener al menos 5 caracteres'
              },
              maxLength: {
                value: 100,
                message: 'El nombre no debe tener más de 100 caracteres'

              }
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={{
                  ...styles.inputText,
                  borderColor: errors.name ? 'red' : 'gray'
                }}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />

            )}
            name='name'
            defaultValue=''
          />
          {errors.name && <Text style={styles.errorText}>{errors.name.message}</Text>}
        </View>
        <View style={styles.inputContainer}>
          <Text>Descripción:</Text>
          <Controller
            control={control}
            rules={{
              required: 'Este campo es requerido',
              minLength: {
                value: 10,
                message: 'La descripción debe tener al menos 10 caracteres'
              },
              maxLength: {
                value: 200,
                message: 'La descripción no debe tener más de 200 caracteres'

              }
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={{
                  ...styles.inputText,
                  borderColor: errors.description ? 'red' : 'gray'
                }}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />

            )}
            name='description'
            defaultValue=''
          />
          {errors.description && <Text style={styles.errorText}>{errors.description.message}</Text>}
        </View>
        <View style={styles.inputContainer}>
          <Text>Logo:</Text>
          <Controller
            control={control}
            rules={{
              required: 'Este campo es requerido',
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={{
                  ...styles.inputText,
                  borderColor: errors.logo ? 'red' : 'gray'
                }}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />

            )}
            name='logo'
            defaultValue=''
          />
          {errors.logo && <Text style={styles.errorText}>{errors.logo.message}</Text>}
        </View>
        <View style={styles.inputContainer}>
          <Text>Fecha de Liberación:</Text>
          <Controller
            control={control}
            rules={{
              required: 'Este campo es requerido',

            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                editable={true}
                onPress={() => setOpenRelease(true)}
                style={{
                  ...styles.inputText,
                  borderColor: errors.date_release ? 'red' : 'gray'
                }}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />

            )}
            name='date_release'
            defaultValue=''
          />
          {errors.date_release && <Text style={styles.errorText}>Este campo es requerido</Text>}
          <DatePicker
            modal
            mode='date'
            open={openRelease}
            date={dateRelease}
            onConfirm={(date) => handleSelectDate(date)}
            minimumDate={new Date()}
            onCancel={() => {
              setOpenRelease(false)
            }}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text>Fecha de Revisión:</Text>
          <Controller
            control={control}
            rules={{
              required: 'Este campo es requerido',
              // validate: (value) => value > dateRelease.toLocaleDateString() || 'La fecha de revisión debe ser mayor a la fecha de liberación'

            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                editable={true}
                onPress={() => setOpenRevision(true)}
                style={{
                  ...styles.inputText,
                  borderColor: errors.date_release ? 'red' : 'gray'
                }}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />

            )}
            name='date_revision'
            defaultValue=''
          />
          {errors.date_revision && <Text style={styles.errorText}>{errors.date_revision.message}</Text>}
          <DatePicker
            modal
            mode='date'
            open={openRevision}
            date={dateRevision}
            onConfirm={(date) => handleSelectDateRevision(date)}
            minimumDate={new Date(dateRelease.getFullYear() + 1, dateRelease.getMonth(), dateRelease.getDate())}
            onCancel={() => {
              setOpenRevision(false)
            }}
          />
        </View>
        <View style={{ flexDirection: 'column', gap: 10, justifyContent: 'center', alignItems: 'center', paddingBottom: 20 }}>
          <ButtonComponent
            title={isLoadingCreateProduct || isLoadingUpdateFinancialProduct ? 'Creando...' : 'Enviar'}
            handlePress={handleSubmit(
              params ? handleUpdateProduct : handleCreateNewProduct
            )}
            primaryColor='yellow'
            textColor='black'
            disabled={isLoadingCreateProduct || isLoadingUpdateFinancialProduct}
          />
          <ButtonComponent
            title='Reiniciar'
            handlePress={
              () => {
                setValue('id', '');
                setValue('name', '');
                setValue('description', '');
                setValue('logo', '');
                setValue('date_release', '');
                setValue('date_revision', '');
              }
            }
            primaryColor='lightgray'
            textColor='blue'
          />
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
  },
  inputContainer: {
    flexDirection: 'column',
    gap: 5
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },
  inputText: {
    height: 40,
    borderWidth: 1,
    borderRadius: 5

  }
})