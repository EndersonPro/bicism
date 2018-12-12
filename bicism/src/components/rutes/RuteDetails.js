import React from 'react'

const RuteDetails = (props) => {

    const id = props.match.params.id;
    console.log(id)
    
    return (
        <div className="container section rutes-details">
            <div className="card z-depth-0">
                <div className="card-content">
                    <div className="card-title">
                        Rute Title - {id}
                </div>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam cumque soluta, consequatur, amet excepturi hic provident incidunt voluptas sunt delectus vitae eveniet. Magni, alias? Iste incidunt minima tempore voluptatum cum!</p>
                </div>
                <div className="card-action grey lighten-4 grey-text">
                    Hola xd
                </div>
            </div>
        </div>
    )
}

export default RuteDetails

