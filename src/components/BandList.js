import { useEffect, useState, useContext } from 'react'
import { SocketConext } from '../context/SocketContext';

export const BandList = () => {

    const [bands, setBands] = useState([]);

    const { socket } = useContext(SocketConext);

    useEffect(() => {
        socket.on('current-bands', (bands) => {
            setBands(bands);
        })

        return () => socket.off('current-bands');

    }, [socket]);

    const changeName = (e, id) => {
        const newName = e.target.value;
        setBands(bands => bands.map(band => {
            if (band.id === id) {
                band.name = newName;
            }
            return band;
        }))
    }

    // TODO:Disparar el evento Socket,(Cambiar nombre).
    const onLostFocus = (id, name) => socket.emit('cambiar-nombre-banda', { id, name });

    //Votar por banda
    const vote = (id) => socket.emit('votar-banda', id);

    //Borrar banda
    const deleteBanda = (id) => socket.emit('borrar-banda', id);

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
