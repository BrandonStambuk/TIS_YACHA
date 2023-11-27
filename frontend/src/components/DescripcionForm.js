
import React from "react";
import izqImage from "./images/izq.png";
import derImage from "./images/der.png";
import cenImage from "./images/cen.png";
import jusImage from "./images/jus.png";
const DescripcionForm = ({
  descripcion,
  fontSize,
  textAlign,
  handleFontSizeChange,
  handleTextAlignChange,
  setDescripcion,
  handleFileChange,
  navigate,
}) => {
  const buttonImageStyle = {
    width: "20px",
    height: "20px",
  };

  return (
    <div className="card-body tarjeta">
      <div className="mb-3">
        <h2 className="card-title text-center text-blue">Descripción</h2>

        <label htmlFor="descripcion" className="form-label">
          Descripción
        </label>

        <div className="mb-3">
          <div className="btn-group me-2">
            <button
              onClick={() => handleFontSizeChange(fontSize + 2)}
              className="btn btn-light btn-lg"
            >
              <strong>A</strong>
            </button>
            <button
              onClick={() => handleFontSizeChange(fontSize - 2)}
              className="btn btn-light btn-sm"
            >
              <small>A</small>
            </button>
          </div>
          <div className="btn-group">
            <button
              onClick={() => handleTextAlignChange("left")}
              className={`btn btn-light ${
                textAlign === "left" ? "active" : ""
              }`}
            >
              <img src={izqImage} alt="Izquierda" style={buttonImageStyle} />
            </button>
            <button
              onClick={() => handleTextAlignChange("center")}
              className={`btn btn-light ${
                textAlign === "center" ? "active" : ""
              }`}
            >
              <img src={cenImage} alt="Centro" style={buttonImageStyle} />
            </button>
            <button
              onClick={() => handleTextAlignChange("right")}
              className={`btn btn-light ${
                textAlign === "right" ? "active" : ""
              }`}
            >
              <img src={derImage} alt="Derecha" style={buttonImageStyle} />
            </button>
            <button
              onClick={() => handleTextAlignChange("justify")}
              className={`btn btn-light ${
                textAlign === "justify" ? "active" : ""
              }`}
            >
              <img src={jusImage} alt="Justificado" style={buttonImageStyle} />
            </button>
          </div>
        </div>

        <textarea
          className="form-control-descArea textarea-estilo"
          id="descripcion"
          name="descripcion"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          rows="4"
          style={{
            fontSize: `${fontSize}px`,
            textAlign: textAlign,
            width: "100%",
            height: "200px",
            resize: "none",
          }}
        ></textarea>

        <div>
          <button
            type="button"
            className="btn btn-warning btn-lg btn-block mx-auto boton-2"
            id="Afiche"
            onClick={() => navigate("/crearafiche")}
          >
            Crear afiche
          </button>
          <br></br>
          <input
            type="file"
            onChange={handleFileChange}
            style={{ display: "none", visibility: "hidden" }}
          />
          <label
            htmlFor="subirAfiche"
            type="button"
            className="btn btn-warning btn-lg btn-block mx-auto boton-2"
          >
            Subir afiche
          </label>
        
        </div>
        
      </div>
    </div>
  );
};

export default DescripcionForm;