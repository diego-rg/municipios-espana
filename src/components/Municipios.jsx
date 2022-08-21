import React, { useState, useEffect } from "react";
import axios from "axios";

const Municipios = ({ codProv }) => {
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
                <th className="header-cell">Nombre</th>
                <th className="header-cell">Provincia</th>
                <th className="header-cell">Población</th>
                <th className="header-cell">Superficie (km²)</th>
                <th className="header-cell">Altitud (m)</th>
                <th className="header-cell">Longitud (°)</th>
                <th className="header-cell">Latitud (°)</th>
              </tr>
            </thead>
            <tbody>
              {data.municipios
                .filter((municipio) => municipio.CODPROV === codProv)
                .map((municipio) => (
                  <tr key={municipio.CODIGOINE}>
                    <td className="cell">{municipio.NOMBRE}</td>
                    <td className="cell">{municipio.NOMBRE_PROVINCIA}</td>
                    <td className="cell text-right">
                      {municipio.POBLACION_MUNI}
                    </td>
                    <td className="cell text-right">
                      {Math.round(municipio.SUPERFICIE) / 100}
                    </td>
                    <td className="cell text-right">{municipio.ALTITUD}</td>
                    <td className="cell">
                      {municipio.LONGITUD_ETRS89_REGCAN95}
                    </td>
                    <td className="cell">
                      {municipio.LATITUD_ETRS89_REGCAN95}
                    </td>
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
