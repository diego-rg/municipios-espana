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
        setData(response.provincias);
      } catch (error) {
        console.error(error.message);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="text-center">
      {loading && <div>Cargando...</div>}
      {!loading && (
        <div>
          <select
            className="py-2 px-4 bg-gray-300 font-bold outline-0"
            name="select"
            onChange={onSelectChange}
            defaultValue={"default"}
          >
            <option disabled value="default">
              Seleccione una provincia
            </option>
            {data
              .sort((a, b) =>
                a.NOMBRE_PROVINCIA > b.NOMBRE_PROVINCIA ? 1 : -1
              )
              .map((provincia) => (
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
