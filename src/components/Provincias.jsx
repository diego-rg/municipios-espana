import React, { useState, useEffect } from "react";
import axios from "axios";

import Municipios from "./Municipios";

const Provincias = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [codProv, setCodProv] = useState();

  const onSelectChange = (event) => {
    setCodProv(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: response } = await axios.get(
          "https://www.el-tiempo.net/api/json/v2/provincias"
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
          <select name="select" onChange={onSelectChange}>
            <option disabled selected value>
              Seleccione una provincia
            </option>
            {data.provincias.map((provincia) => (
              <option key={provincia.CODPROV} value={provincia.CODPROV}>
                {provincia.NOMBRE_PROVINCIA}
              </option>
            ))}
          </select>
        </div>
      )}
      <Municipios codProv={codProv} />
    </div>
  );
};

export default Provincias;
