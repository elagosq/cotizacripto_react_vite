import {useEffect, useState} from 'react';
import styled from "@emotion/styled";
import Error from "./Error";
import useSelectMonedas from "../hooks/useSelectMonedas.jsx";
import {monedas} from "../data/moneda.js";

const InputSubmit = styled.input`
  background-color: #9497FF;
  border: none;
  width: 100%;
  padding:10px;
  color:#FFF;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 20px;
  border-radius: 5px;
  margin-top: 30px;
  transition: background-color .3s ease;
  
  &:hover{
    background-color: #7A7DFE;
    cursor: pointer;
  }
`;

const Formulario = ({setMonedas}) => {
    const [criptos, setCriptos] = useState([]);
    const [error, setError] = useState(false);
    const [moneda,SelectMonedas ]  = useSelectMonedas('Elige tu moneda',monedas);
    const [criptomoneda,SelectCriptomoneda ]  = useSelectMonedas('Elige tu criptomoneda',criptos);

    useEffect(() => {
       const consultarAPI = async () => {
           const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD";
           const respuesta = await fetch(url)
           const resultado = await respuesta.json()

           const arrayCriptos = resultado.Data.map(cripto => {
               const object = {
                  id: cripto.CoinInfo.Name,
                  nombre: cripto.CoinInfo.FullName
               }

               return object
           });

           setCriptos(arrayCriptos);
       }

       consultarAPI();

    },[]);

    const handleSubmit = e => {
       //Prevenir la acción por default
        e.preventDefault();

        if([moneda,criptomoneda].includes('')){
            setError(true)
            return;
        }

        setError(false)

        setMonedas({
            moneda,
            criptomoneda
        })
    }

    return (
        <>
        {error && <Error>Todos los campos son obligatorios</Error>}
        <form onSubmit={handleSubmit}>
            <SelectMonedas />
            <SelectCriptomoneda />
            <InputSubmit
               type="submit"
               value="Cotizar"
           />
        </form>
        </>
    );
};

export default Formulario;