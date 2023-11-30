import React from "react";

const NombreEventoForm = ({nombre_evento}) => {

    const [nombre_evento, setNombreEvento] = useState("");

  return (
    <div className="card-body tarjeta">
        <div className="mb-3">
          <h2 htmlFor="nombreEvento" className="card-title text-center text-blue">
            Creacion de evento
          </h2>
          <label>Nombre</label>
          <input
            value={nombre_evento}
            onChange={(e) => setNombreEvento(e.target.value)}
            type="text"
            className={`form-control ${
              nombreEventoError ? "is-invalid" : ""
            }`}
            id="nombreEvento"
            name="nombreEvento"
          />
        </div>
    </div>
  );
};

export default NombreEventoForm;