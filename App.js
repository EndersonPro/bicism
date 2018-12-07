/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import IniciarSesion from './IniciarSesion';
import Inicio from './Inicio';
import Detalle from './Detalle';
import { createStackNavigator, createAppContainer } from 'react-navigation';

const RootStack = createStackNavigator(
  {
    Inicio: {
      screen: Inicio,
      navigationOptions: () => ({
        title: 'Inicio',
        headerBackTitle: null
      })
    },
    Detalle: Detalle,
    IniciarSesion: {
      screen: IniciarSesion,
      navigationOptions: () => ({
        title: 'Iniciar Sesión'
      })
    }
  },
  {
    initialRouteName: 'IniciarSesion',
    // headerMode: 'none',
    // navigationOptions: {
    //   gesturesEnabled: false
    // }
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}