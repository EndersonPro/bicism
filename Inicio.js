import React, { Component } from 'react';
import { StyleSheet, Text, ScrollView, Alert } from 'react-native';
import firebase from 'react-native-firebase';
import { Card, ListItem, Button, List } from 'react-native-elements'
import { createStackNavigator, createAppContainer } from 'react-navigation';

export default class Inicio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usuario: null
    }
    this.cerrarSesion = this.cerrarSesion.bind(this);
  }


  componentWillMount() {
    let usuario = firebase.auth().currentUser;
    this.setState({ usuario });
  }

  cerrarSesion() {
    Alert.alert(
      "¿Seguro?",
      "¿Cerrar sesión?",
      [
        { text: "No", onPress: () => console.log("Cancelar") },
        {
          text: "Si", onPress: () => {
            firebase.auth().signOut()
              .then(() => {
                this.props.navigation.replace('IniciarSesion');
              })
          }
        }
      ]
    );
  }
  render() {
    let lugares = [
      {
        nombre: "Urbanización el parque",
        direccion: {
          latitude: 11.215904,
          longitude: -74.1891454
        },
        descripcion: "Lorem Ipsum dolor sit amet...",
        imagen: require("./imagenes/elparque.jpg")
      },
      {
        nombre: "Universidad del magdalena",
        direccion: {
          latitude: 11.2265303,
          longitude: -74.1906627
        },
        descripcion: "Lorem Ipsum dolor sit amet...",
        imagen: require("./imagenes/unimag.jpg")
      },
      {
        nombre: "Centro comercial buena vista",
        direccion: {
          latitude: 11.2270661,
          longitude: -74.1832583
        },
        descripcion: "Lorem Ipsum dolor sit amet...",
        imagen: require("./imagenes/buenavista.jpg")
      },
      {
        nombre: "Centro comercial ocean mall",
        direccion: {
          latitude: 11.2306677,
          longitude: -74.1939096
        },
        descripcion: "Lorem Ipsum dolor sit amet...",
        imagen: require("./imagenes/oceanmall.jpg")
      }
    ];
    let lista = [];
    lugares.map((lugar, i) => {
      let elemento =
        <ListItem
          roundAvatar
          avatar={lugar.imagen}
          key={i}
          title={lugar.nombre}
          onPress={() => { this.props.navigation.push('Detalle', { lugar: lugar }); }}
        />;
      lista.push(elemento);
    })
    return (
      <ScrollView>
        <List containerStyle={{ marginBottom: 20 }}>
          {lista}
        </List>
        <Button
          onPress={this.cerrarSesion}
          title="Cerrar sesión"
        />
        <Text>
          {"\n"}
        </Text>
        <Button
          title="Detalles"
        />
      </ScrollView>
    )
  }
}