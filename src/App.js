import { useEffect, useState } from "react";
import io from "socket.io-client";
import { BandAdd } from "./components/BandAdd";
import { BandList } from "./components/BandList";

const connectSocketServer = () => {
  const socket = io.connect('http://localhost:8080', {
    transports: ['websocket']
  });
  return socket;
}
function App() {

  const [socket] = useState(() => connectSocketServer());
  const [online, setOnline] = useState(false)
  const [bands, setBands] = useState([])

  useEffect(() => {
    setOnline(socket.connected);
  }, [socket]);

  useEffect(() => {
    socket.on('connect', () => {
      setOnline(true);
    })
  }, [socket]);

  useEffect(() => {
    socket.on('disconnect', () => {
      setOnline(false);
    })
  }, [socket]);

  useEffect(() => {
    socket.on('current-bands', (bands) => {
      setBands(bands)
    })
  }, [socket]);

  //Votar por banda
  const vote = (id) => {
    socket.emit('votar-banda', id)
  }
  //Borrar banda
  const deleteBanda = (id) => {
    socket.emit('borrar-banda', id)
  }
  //Cambiar nombre
  const changeBanda = (id, name) => {
    socket.emit('cambiar-nombre-banda', { id, name })
  }
  //Agregar Banda
  const createBanda = (name) => {
    socket.emit('nueva-banda', { name })
  }

  return (
    <div className="container">

      <div className="alert">
        <p>
          Services Status:
          {
            online
              ? <span className="text-success">Online</span>
              : <span className="text-success">Offline</span>
          }
        </p>
      </div>

      <h1>BandNames</h1>
      <hr />

      <div className="row">
        <div className="col-8">
          <BandList
            data={bands}
            vote={vote}
            deleteBanda={deleteBanda}
            changeBanda={changeBanda}
          />
        </div>
        <div className="col-4">
          <BandAdd
            createBanda={createBanda}
          />
        </div>
      </div>


    </div>
  );
}

export default App;
