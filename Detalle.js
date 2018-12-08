import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps';
import * as poly from "@mapbox/polyline";
import HTML from 'react-native-render-html';

export default class Detalle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lugar: null,
            ubicacion: null,
            res: [],
            pasos: []
        }
    }
    componentWillMount() {
        let lugar = this.props.navigation.getParam('lugar');
        let ubicacion = this.props.navigation.getParam('ubicacion');
        this.setState({
            lugar,
            ubicacion
        });
    }
    componentDidMount() {
        const mode = "WALKING";//'bicycling'; // 'walking';
        const origin = "11.2174962,-74.1866339";//`${this.state.ubicacion.latitude},${this.state.ubicacion.longitude}`;//"11.2174962,-74.1866339";
        const destination = `${this.state.lugar.direccion.latitude},${this.state.lugar.direccion.longitude}`;
        const APIKEY = 'AIzaSyDyawTAYbxvKNNP-FgSnS6fNQG3R6qMV6Y'; // Maps api key
        const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${APIKEY}&mode=${mode}&language=es`;
        console.log(url);
        fetch(url)
            .then(response => response.json())
            .then(responseJson => {
                let puntos = poly.decode(
                    responseJson.routes[0].overview_polyline.points
                );
                let res = puntos.map((punto, index) => {
                    return {
                        latitude: punto[0],
                        longitude: punto[1]
                    };
                });
                let pasos = responseJson.routes[0].legs[0].steps;
                console.log("--------Inicio----------")
                console.log(puntos);
                console.log("--------Fin----------")
                console.log("--------Inicio----------")
                console.log(res);
                console.log("--------Fin----------")
                console.log("--------Inicio----------")
                console.log(responseJson.routes[0].legs[0].steps);
                console.log("--------Fin----------")
                this.setState({ res, pasos });
            }).catch(e => { console.warn(e) });
    }
    render() {
        return (
            <View style={estilos.contenedor}>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={estilos.mapa}
                    region={{
                        latitude: this.state.lugar.direccion.latitude,
                        longitude: this.state.lugar.direccion.longitude,
                        latitudeDelta: 10,
                        longitudeDelta: 10,
                    }}
                    showsUserLocation={true}
                // scrollEnabled={false}
                >
                    <Marker
                        coordinate={this.state.lugar.direccion}
                        title={this.state.lugar.nombre}
                        description={"Fin"}
                    />
                    <Marker
                        coordinate={this.state.ubicacion}
                        title={"Tu ubicación"}
                        description={"Inicio"}
                    />
                    <Polyline
                        coordinates={this.state.res}
                        strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
                        strokeColors={[
                            '#7F0000',
                            '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
                            '#B24112',
                            '#E5845C',
                            '#238C23',
                            '#7F0000'
                        ]}
                        strokeWidth={6}
                    />
                </MapView>
                <ScrollView style={estilos.texto}>
                    {this.state.pasos.map((paso, key) =>
                        (
                            <HTML html={paso.html_instructions} key={key} />
                        )
                    )}
                </ScrollView>
            </View >
        )
    }
}

const estilos = StyleSheet.create({
    contenedor: {
        flex: 1,
        backgroundColor: 'tomato',
    },
    mapa: {
        flex: 1
    },
    texto: {
        flex: 3,
        textAlign: 'center',
    }
});