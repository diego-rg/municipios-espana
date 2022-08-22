import React, { useState, useEffect } from "react";
import axios from "axios";
import { TiArrowUnsorted } from "react-icons/ti";

const Municipios = ({ codProv }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [order, setOrder] = useState("ASC");

  //Ordenar por valor da columna usando o estado order
  const sortCol = (col) => {
    if (order === "ASC") {
      const sorted = [...data].sort((a, b) => (a[col] > b[col] ? 1 : -1));
      setData(sorted);
      setOrder("DES");
    }
    if (order === "DES") {
      const sorted = [...data].sort((a, b) => (a[col] < b[col] ? 1 : -1));
      setData(sorted);
      setOrder("ASC");
    }
  };

  //Fetch data: axios devolve "data": sacámolo destructurando e renomeando a response.
  //Finalmente gardamos os datos solo do array "municipios"
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: response } = await axios.get(
          "https://www.el-tiempo.net/api/json/v2/municipios"
        );
        setData(response.municipios);
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
      {!loading && codProv && (
        <div className="flex justify-center">
          <table>
            <thead>
              <tr>
                <th onClick={() => sortCol("NOMBRE")} className="header-cell">
                  Nombre <TiArrowUnsorted className="inline mb-1" />
                </th>
                <th
                  onClick={() => sortCol("NOMBRE_PROVINCIA")}
                  className="header-cell"
                >
                  Provincia <TiArrowUnsorted className="inline mb-1" />
                </th>
                <th
                  onClick={() => sortCol("POBLACION_MUNI")}
                  className="header-cell"
                >
                  Población <TiArrowUnsorted className="inline mb-1" />
                </th>
                <th
                  onClick={() => sortCol("SUPERFICIE")}
                  className="header-cell"
                >
                  Superficie (km²) <TiArrowUnsorted className="inline mb-1" />
                </th>
                <th onClick={() => sortCol("ALTITUD")} className="header-cell">
                  Altitud (m) <TiArrowUnsorted className="inline mb-1" />
                </th>
                <th
                  onClick={() => sortCol("LONGITUD_ETRS89_REGCAN95")}
                  className="header-cell"
                >
                  Longitud (°) <TiArrowUnsorted className="inline mb-1" />
                </th>
                <th
                  onClick={() => sortCol("LATITUD_ETRS89_REGCAN95")}
                  className="header-cell"
                >
                  Latitud (°) <TiArrowUnsorted className="inline mb-1" />
                </th>
              </tr>
            </thead>
            <tbody>
              {data
                .filter((municipio) => municipio.CODPROV === codProv)
                .map((municipio) => (
                  <tr key={municipio.CODIGOINE}>
                    <td className="cell text-left">{municipio.NOMBRE}</td>
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
