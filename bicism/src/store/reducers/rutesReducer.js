const initState = {
    rutes: [
        {
            altura: "620",
            descripcion: "Ruta a las hermosas cascadas de marinca",
            direccion: {
                latitude: 11.1191412,
                longitude: -74.1204932
            },
            imagen: "https://firebasestorage.googleapis.com/v0/b/reactnativejp.appspot.com/o/cascadasdemarinca.jpg?alt=media&token=a2f8e499-b513-4824-8cdc-7be4f1f12458",
            nombre: "Cascadas de marinca",
            terreno: "Carretera + trocha",
            tiempo: "1 hora 46"
        },
        {
            altura: "720",
            descripcion: "Ruta a mi casa",
            direccion: {
                latitude: 51.1191412,
                longitude: -84.1204932
            },
            imagen: "https://firebasestorage.googleapis.com/v0/b/reactnativejp.appspot.com/o/cascadasdemarinca.jpg?alt=media&token=a2f8e499-b513-4824-8cdc-7be4f1f12458",
            nombre: "Cascadas de la cama",
            terreno: "Carretera + cama",
            tiempo: "5 hora 46"
        }
    ]
}

const mapsReducer = (state = initState, action) => {

    return state;
}

export default mapsReducer