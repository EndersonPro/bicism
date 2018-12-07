import React, { Component } from 'react';
import { ScrollView, Text, View, TextInput, Button, Alert } from 'react-native';
import firebase from 'react-native-firebase';

export default class IniciarSesion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usuario: "",
            pass: "",
            mensaje: ""
        };
        this.iniciarSesion = this.iniciarSesion.bind(this);
        this.registrarse = this.registrarse.bind(this);
    }

    componentWillMount() {
        console.log("debug")
        var subs = firebase.auth().onAuthStateChanged((usuario) => {
            if (usuario) {
                this.setState({
                    usuario: '',
                    pass: ''
                });
                this.props.navigation.replace('Inicio');
            }
        });
        subs();
    }

    iniciarSesion() {
        firebase.auth().signInWithEmailAndPassword(this.state.usuario, this.state.pass)
            .then(() => {
                this.setState({
                    usuario: '',
                    pass: ''
                });
                this.props.navigation.replace('Inicio');
            })
            .catch((error) => {
                Alert.alert(
                    "Error",
                    error.message,
                    [
                        { text: "Cancelar", onPress: () => console.log("Cancelar") },
                        { text: "Ok", onPress: () => console.log("Ok") }
                    ]
                );
            });
    }

    registrarse() {
        firebase.auth().createUserWithEmailAndPassword(this.state.usuario, this.state.pass)
            .catch((error) => {
                Alert.alert(
                    "Error",
                    error.message,
                    [
                        { text: "Cancelar", onPress: () => console.log("Cancelar") },
                        { text: "Ok", onPress: () => console.log("Ok") }
                    ]
                );
            });
    }

    render() {
        return (
            <ScrollView style={{ padding: 20 }}>
                <TextInput
                    placeholder='Correo Electronico'
                    onChangeText={(usuario) => this.setState({ usuario })}
                    value={this.state.usuario}
                />
                <TextInput
                    placeholder='Contraseña'
                    onChangeText={(pass) => this.setState({ pass })}
                    value={this.state.pass}
                    secureTextEntry={true}
                />
                <View style={{ margin: 7 }} />
                {!!this.state.mensaje && (
                    <Text
                        style={{ fontSize: 18, color: 'red' }}>
                        {this.state.mensaje}
                    </Text>
                )}
                <Button
                    onPress={this.iniciarSesion}
                    disabled={!this.state.usuario || !this.state.pass}
                    title="Iniciar sesión"
                />
                <Text>
                    {"\n"}
                </Text>
                <Button
                    onPress={this.registrarse}
                    disabled={!this.state.usuario || !this.state.pass}
                    title="Registrarse"
                />
            </ScrollView>
        )
    }
}