import React, { useState, useEffect } from "react";
import axios from "axios";

const Municipios = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: response } = await axios.get(
          "https://www.el-tiempo.net/api/json/v2/municipios"
        );
        setData(response);
      } catch (error) {
        console.error(error.message);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div>
      {loading && <div>Cargando...</div>}
      {!loading && (
        <div>
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Provincia</th>
                <th>Población</th>
                <th>Superficie (km²)</th>
                <th>Altitud (m)</th>
                <th>Longitud (°)</th>
                <th>Latitud (°)</th>
              </tr>
            </thead>
            <tbody>
              {data.municipios.map((municipio) => (
                <tr key={municipio.CODIGOINE}>
                  <td>{municipio.NOMBRE}</td>
                  <td>{municipio.NOMBRE_PROVINCIA}</td>
                  <td>{municipio.POBLACION_MUNI}</td>
                  <td>{Math.round(municipio.SUPERFICIE) / 100}</td>
                  <td>{municipio.ALTITUD}</td>
                  <td>{municipio.LONGITUD_ETRS89_REGCAN95}</td>
                  <td>{municipio.LATITUD_ETRS89_REGCAN95}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Municipios;
