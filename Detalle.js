import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps';
import * as poly from "@mapbox/polyline";
import HTML from 'react-native-render-html';
import { Badge, Icon } from 'react-native-elements';

export default class Detalle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lugar: null,
            ubicacion: null,
            res: [],
            pasos: [],
            puntoZoom: null,
            distancia: 0,
            poner: null,
            loader: true
            // tiempo: 0
        }
        this.ponerMarker = this.ponerMarker.bind(this);
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('lugar').nombre,
        };
    };

    ponerMarker(key) {
        let pasoMarker = this.state.pasos[key];
        pasoMarker = poly.decode(
            pasoMarker.polyline.points
        );
        pasoMarker = {
            latitude: pasoMarker[0][0],
            longitude: pasoMarker[0][1]
        }
        let marker = <Marker
            coordinate={pasoMarker}
            title={`Paso ${key}`}
        />
        this.setState({ poner: marker });
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
                        let decode = pasos[parseInt(i) + 1] != null ? pasos[parseInt(i) + 1] : pasos[i];
                        let resPunto = poly.decode(
                            decode.polyline.points
                        );
                        resPunto = {
                            latitude: resPunto[0][0],
                            longitude: resPunto[0][1]
                        }
                        this.setState({
                            puntoZoom: resPunto
                        });
                    }
                }
                this.setState({
                    distancia: suma
                });
                this.setState({ res, pasos });
                this.setState({ loader: false });
            }).catch(e => { console.warn(e) });
    }
    render() {
        let div = 4;
        let zoom = (this.state.res.length * 0.15) / 358;
        div = this.state.res.length / div;
        div = Math.round(div);
        let distancia = 0;
        return (
            <View style={estilos.contenedor}>
                {
                    this.state.loader ?
                        <ActivityIndicator size="large" color="#ff0000" />
                        :
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
                                {this.state.poner}
                                <Polyline
                                    coordinates={this.state.res}
                                    strokeColor="red"
                                    strokeWidth={6}
                                />
                            </MapView>
                            <ScrollView style={estilos.texto}>
                                <View>
                                    <View style={styles.container}>
                                        <View style={styles.dateContainer}>
                                            <Text style={styles.darkText}>Distanca </Text>
                                        </View>
                                        <Icon
                                            reverse
                                            name='directions-bike'
                                            color='#000'
                                            style={styles.icon}
                                        />
                                        <View>
                                            <View style={styles.tempContainer}>
                                                <Text style={styles.darkText}>{(this.state.distancia * 2 / 1000).toFixed(1)}</Text>
                                                <Text style={styles.darkText}> Km</Text>
                                                <Text style={[styles.darkText, styles.slightMargin]}> Aprox</Text>
                                                {/* <Text style={styles.darkText}>C</Text> */}
                                            </View>
                                            <Text style={styles.lightText}>Ida y vuelta aproximadamente</Text>
                                        </View>
                                    </View>
                                    <View style={styles.separator} />
                                </View>

                                <View>
                                    <View style={styles.container}>
                                        <View style={styles.dateContainer}>
                                            <Text style={styles.darkText}>Terreno   </Text>
                                        </View>
                                        <Icon
                                            reverse
                                            name='map'
                                            color='#000'
                                            style={styles.icon}
                                        />
                                        <View>
                                            <View style={styles.tempContainer}>
                                                <Text style={styles.darkText}>{this.state.lugar.terreno}</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={styles.separator} />
                                </View>

                                <View>
                                    <View style={styles.container}>
                                        <View style={styles.dateContainer}>
                                            <Text style={styles.darkText}>Tiempo    </Text>
                                        </View>
                                        <Icon
                                            reverse
                                            name='access-time'
                                            color='#000'
                                            style={styles.icon}
                                        />
                                        <View>
                                            <View style={styles.tempContainer}>
                                                <Text style={styles.darkText}>{this.state.lugar.tiempo}</Text>
                                                <Text style={styles.darkText}>min</Text>
                                                <Text style={[styles.darkText, styles.slightMargin]}> Aprox</Text>
                                            </View>
                                            <Text style={styles.lightText}>Ida y vuelta aproximadamente</Text>
                                        </View>
                                    </View>
                                    <View style={styles.separator} />
                                </View>

                                <View>
                                    <View style={styles.container}>
                                        <View style={styles.dateContainer}>
                                            <Text style={styles.darkText}>Altimetria</Text>
                                        </View>
                                        <Icon
                                            reverse
                                            name='trending-up'
                                            color='#000'
                                            style={styles.icon}
                                        />
                                        <View>
                                            <View style={styles.tempContainer}>
                                                <Text style={styles.darkText}>{this.state.lugar.altura}</Text>
                                                <Text style={styles.darkText}> m</Text>
                                                <Text style={[styles.darkText, styles.slightMargin]}> Aprox</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={styles.separator} />
                                </View>
                                <View>
                                    <View style={styles.container}>
                                        <Icon
                                            reverse
                                            name='list'
                                            color='#000'
                                            style={styles.icon}
                                        />
                                        <View>
                                            <View style={styles.tempContainer}>
                                                <Text style={styles.darkText}>Instrucciones de la ruta</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={styles.separator} />
                                </View>
                                {this.state.pasos.map((paso, key) =>
                                    (
                                        <TouchableOpacity key={key} onPress={() => this.ponerMarker(key)}>
                                            <View style={styles.container}>
                                                <Badge
                                                    value={key}
                                                    textStyle={{ color: 'white' }}
                                                />
                                                <View style={{ padding: 10 }}>
                                                    <View style={styles.tempContainer}>
                                                        <HTML style={styles.darkText} html={paso.html_instructions} />
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={styles.separator} />
                                        </TouchableOpacity>
                                    )
                                )}
                            </ScrollView>
                        </View>
                }
            </View >
        )
    }
}

const estilos = StyleSheet.create({
    contenedor: {
        flex: 1,
        backgroundColor: '#F8F8F8',
        justifyContent: "center"
    },
    mapa: {
        flex: 1
    },
    texto: {
        flex: 3,
        textAlign: 'center',
    },

});

var styles = StyleSheet.create({
    listContainer: {
        backgroundColor: '#f2f2f2'
    },
    container: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center', //flex-start, flex-end, center, stretch
    },
    dateContainer: {
        alignItems: 'center',
        marginRight: 20
    },
    separator: {
        height: 1,
        backgroundColor: '#dddddd'
    },
    icon: {
        width: 75,
        height: 75,
        marginRight: 20
    },
    tempContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    darkText: {
        fontSize: 18
    },
    lightText: {
        color: "#9a9a9a"
    },
    slightMargin: {
        marginRight: 1
    }
});