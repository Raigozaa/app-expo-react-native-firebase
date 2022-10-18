import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator()

import IniciarSesion from './screens/IniciarSesion';
import CrearUsuario from './screens/CrearUsuario';
import PantallaRecetas from './screens/PantallaRecetas'
import CrearReceta from './screens/CrearReceta'
import DetalleReceta from './screens/DetalleReceta'

function MyStack(){
  return(
    <Stack.Navigator>
      <Stack.Screen name='IniciarSesion' component={IniciarSesion} options={{title: 'Iniciar sesion'}} />
      <Stack.Screen name='CrearUsuario' component={CrearUsuario} options={{title: 'Registros'}} />
      <Stack.Screen name='PantallaRecetas' component={PantallaRecetas} options={{title: 'Lista de recetas'}} />
      <Stack.Screen name="CrearReceta" component={CrearReceta} options={{title: 'Crear nueva receta'}} />
      <Stack.Screen name="DetalleReceta" component={DetalleReceta} options={{title: 'Detalles de recetas'}} />
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
