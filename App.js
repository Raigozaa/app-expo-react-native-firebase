import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { useTranslation } from "react-i18next";
import './screens/i18n'
import i18next from "./screens/i18n";



const Stack = createStackNavigator()

import IniciarSesion from './screens/IniciarSesion';
import CrearUsuario from './screens/CrearUsuario';
import PantallaRecetas from './screens/PantallaRecetas'
import CrearReceta from './screens/CrearReceta'
import DetalleReceta from './screens/DetalleReceta'

//{t('home.btnCrearC')} t('home.btnCrearC')


function MyStack(){
  return(
    <Stack.Navigator>
      <Stack.Screen name='IniciarSesion' component={IniciarSesion} options={{title: ''}} />
      <Stack.Screen name='CrearUsuario' component={CrearUsuario} options={{title: ''}} />
      <Stack.Screen name='PantallaRecetas' component={PantallaRecetas} options={{title: ''}} />
      <Stack.Screen name="CrearReceta" component={CrearReceta} options={{title: ''}} />
      <Stack.Screen name="DetalleReceta" component={DetalleReceta} options={{title: ''}} />
    </Stack.Navigator>
  )
}

export default function App() {

  return (


    <NavigationContainer>
      <MyStack/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
