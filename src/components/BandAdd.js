import { useContext, useState } from 'react'
import { SocketConext } from '../context/SocketContext'

export const BandAdd = () => {

    const [name, setName] = useState('')

    const { socket } = useContext(SocketConext);

    const onSubmit = (e) => {
        e.preventDefault();

        if (name.trim().length > 0) {
            //TODO: Llamar la Funcion para emitir el evento, (Agregar Banda).
            socket.emit('nueva-banda', { name })
            setName('');
        }
    }
    return (
        <>
            <h3>Agregar Banda</h3>

            <form onSubmit={onSubmit}>
                <input
                    className='form-control'
                    placeholder='Nuevo nombre de banda'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </form>
        </>
    )
}
