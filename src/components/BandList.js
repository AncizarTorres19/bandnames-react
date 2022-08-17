import React, { useEffect, useState } from 'react'

export const BandList = ({ data, vote, deleteBanda, changeBanda }) => {

    const [bands, setBands] = useState([]);

    useEffect(() => {
        setBands(data)
    }, [data])

    const changeName = (e, id) => {
        const newName = e.target.value;
        setBands(bands => bands.map(band => {
            if (band.id === id) {
                band.name = newName;
            }
            return band;
        }))
    }

    const onLostFocus = (id, name) => {
        console.log(id, name);

        // TODO:Disparar el evento Socket
        changeBanda(id, name)
    }

    const createRows = () => {
        return (
            bands.map(({ name, votes, id }) => (
                <tr key={id}>
                    <td>
                        <button
                            className='btn btn-primary'
                            onClick={() => vote(id)}
                        >
                            +1
                        </button>
                    </td>
                    <td>
                        <input
                            className='form-control'
                            value={name}
                            onChange={(e) => changeName(e, id)}
                            onBlur={() => onLostFocus(id, name)}
                        />
                    </td>
                    <td><h3>{votes}</h3></td>
                    <td>
                        <button
                            className='btn btn-danger'
                            onClick={() => deleteBanda(id)}
                        >Borrar
                        </button>
                    </td>
                </tr>
            ))
        )
    }

    return (
        <table className='table table-stripped'>
            <thead>
                <tr>
                    <th></th>
                    <th>Nombre</th>
                    <th>votos</th>
                    <th>Borrar</th>
                </tr>
            </thead>
            <tbody>
                {createRows()}
            </tbody>
        </table>
    )
}
