import { useState } from 'react'

export const BandAdd = ({ createBanda }) => {

    const [value, setValue] = useState('')

    const onSubmit = (e) => {
        e.preventDefault();

        if (value.trim().length > 0) {
            //TODO: Llamar la Funcion para emitir el evento
            createBanda(value);
            setValue('');
        }
    }
    return (
        <>
            <h3>Agregar Banda</h3>

            <form onSubmit={onSubmit}>
                <input
                    className='form-control'
                    placeholder='Nuevo nombre de banda'
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
            </form>
        </>
    )
}
