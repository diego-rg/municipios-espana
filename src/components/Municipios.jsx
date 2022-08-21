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
              </tr>
            </thead>
            <tbody>
              {data.municipios.map((municipio) => (
                <tr key={municipio.CODIGOINE}>
                  <td>{municipio.NOMBRE}</td>
                  <td>{municipio.NOMBRE_PROVINCIA}</td>
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
