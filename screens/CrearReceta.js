import React, { useState } from 'react';
import { View, Button, ScrollView, StyleSheet } from 'react-native';
import firebase from '../database/firebase';
import { TextInput } from "react-native-gesture-handler";
import { useTranslation } from "react-i18next";
import './i18n'
import i18next from "./i18n";

const CrearReceta = (props) => {


  const { t } = useTranslation()
  const [languaje, setLanguaje] = useState('en')



  const [state, setState] = useState({
      titulo: '',
      descripcion: '',
      pasos: '',
      uri: ''
    })

    
  const handleChangeText = (name, value) => {
      setState({...state, [name]: value})
  }

  const AddNewFood = async () => {
      /*console.log(state) */
      if (state.titulo == '') {
        alert('Por favor llenar título de receta')
          
      } else if (state.pasos == '') {
        alert('Por favor llenar pasos de la receta')
      
      } else {
        await firebase.db.collection('recetas').add({
            titulo: state.titulo,
            descripcion: state.descripcion,
            pasos: state.pasos,
            uri: state.uri
        })

        props.navigation.navigate('PantallaRecetas')
      }
  }

  return (
    <ScrollView style={styles.container}>

      <View style={styles.inputGroup}>
        <TextInput
          placeholder={t('home.iURI')}
          onChangeText={(value) => handleChangeText('uri', value)}/>
      </View>

      <View style={styles.inputGroup}>
        <TextInput
          placeholder={t('home.iTitulo')}
          onChangeText={(value) => handleChangeText('titulo', value)}/>
      </View>

      <View style={styles.inputGroup}>
        <TextInput 
        placeholder={t('home.iDecrip')}
        onChangeText={(value) => handleChangeText('descripcion', value)}/>
      </View>

      <View>
        <TextInput 
        placeholder={t('home.iPasos')} 
        multiline = "true"
        style = {{padding: 80}}
        onChangeText={(value) => handleChangeText('pasos', value)}/>
      </View>

      <View style={{marginTop: 25}}>
        <Button title={t('home.btnCrearReceta')} onPress={() => AddNewFood()} />
      </View>
    </ScrollView>
  )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 35,
    },
    inputGroup: {
      flex: 1,
      padding: 0,
      marginBottom: 20,
      borderBottomWidth: 1,
      borderBottomColor: '#cccccc',
    },
});


export default CrearReceta