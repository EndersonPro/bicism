import React, { Component } from 'react';
import { StyleSheet, Text, ScrollView, Alert } from 'react-native';
import firebase from 'react-native-firebase';
import { Card, ListItem, Button, List } from 'react-native-elements'
import { createStackNavigator, createAppContainer } from 'react-navigation';

export default class Inicio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usuario: null,
      ubicacion: {
        latitude: null,
        longitude: null
      }
    }
    this.cerrarSesion = this.cerrarSesion.bind(this);
  }


  componentWillMount() {
    let usuario = firebase.auth().currentUser;
    this.setState({ usuario });

    navigator.geolocation.getCurrentPosition((pos) => {
      let ubicacion = {
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      }
      this.setState({ ubicacion });
    });
    console.log("debug")
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
        nombre: "Paso del mango",
        direccion: {
          latitude: 11.2019997,
          longitude: -74.0953848
        },
        descripcion: "Lorem Ipsum dolor sit amet...",
        imagen: require("./imagenes/pasodelmango.jpg")
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
          latitude: 11.2277396,
          longitude: -74.1757745
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
          onPress={() => { this.props.navigation.push('Detalle', { lugar: lugar, ubicacion: this.state.ubicacion }); }}
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