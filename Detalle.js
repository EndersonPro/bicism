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
            pasos: [],
            puntoZoom: null
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
    getKilometros(lat1, lon1, lat2, lon2) {
        let rad = function (x) { return x * Math.PI / 180; }
        var R = 6378.137;
        var dLat = rad(lat2 - lat1);
        var dLong = rad(lon2 - lon1);
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        return d.toFixed(3);
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
                let distancia = this.getKilometros(11.2174962, -74.1866339, this.state.lugar.direccion.latitude, this.state.lugar.direccion.longitude) / 2;
                let suma = 0;
                for (let i in pasos) {
                    suma = suma + pasos[i].distance.value;
                    if (suma >= distancia * 1000) {
                        let resPunto = poly.decode(
                            pasos[parseInt(i) + 1].polyline.points
                        );
                        resPunto = {
                            latitude: resPunto[0][0],
                            longitude: resPunto[0][1]
                        }
                        this.setState({
                            puntoZoom: resPunto
                        });
                        break;
                    }
                }
                // console.log("--------Inicio----------")
                // console.log(puntos);
                // console.log("--------Fin----------")
                // console.log("--------Inicio----------")
                // console.log(res);
                // console.log("--------Fin----------")
                // console.log("--------Inicio----------")
                // console.log(responseJson.routes[0].legs[0].steps);
                // console.log("--------Fin----------")
                this.setState({ res, pasos });
            }).catch(e => { console.warn(e) });
    }
    render() {
        let div = 4;
        let zoom = (this.state.res.length * 0.15) / 358;
        div = this.state.res.length / div;
        div = Math.round(div);
        console.log("--------Inicio----------")
        console.log(this.state.res.length);
        console.log(div);
        console.log("--------Fin----------")
        let distancia = 0;
        return (
            <View style={estilos.contenedor}>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={estilos.mapa}
                    region={{
                        latitude: this.state.puntoZoom != null ? this.state.puntoZoom.latitude : 0,
                        longitude: this.state.puntoZoom != null ? this.state.puntoZoom.longitude : 0,
                        latitudeDelta: zoom,
                        longitudeDelta: zoom,
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