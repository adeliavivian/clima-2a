import { useState } from 'react'
import './App.css'
import { CloudSun,  MapPin, ThermometerSun, Droplet, Wind} from 'lucide-react';

function App() {
  const [cidade, setCidade] = useState("");
  const [clima, setClima] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  const buscarClima = async () =>{
    if(!cidade.trim()){
      setErro("❕Por favor, digite uma cidade");
      return;
    }

    setCarregando(true);
    setErro("");

    try{

      const API_KEY = "50878f4678cd0841144b44b2fca0ccc0";
const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${API_KEY}&units=metric&lang=pt_br`;
console.log("URL da requisição", url);
const resposta = await fetch(url);

if(!resposta.ok){
  throw new Error("❌Cidade não encontrada")
}

const dados = await resposta.json();
setClima(dados);
    } catch (error) {
      setErro(error.message);
      setClima(null);
    } finally {
      setCarregando(false);
    }
  };

  const handleKeyPress = (e) =>{
    if (e.key === "Enter") {
      buscarClima();
    }
  };

  return (
    <>
      <div className="app-container">
        <div className="content-wrapper">
          <header>
            <h1>
            <CloudSun color="yellow" size={48} />
              Consulta de Clima
            </h1>
            <p>Exemplo de consumo de API com React</p>
          </header>

          <div className="busca-box">
            <div className="busca-container">
              <input 
              type="text"
              placeholder="Cidade..."
              value={cidade}
              onChange={(e) => setCidade(e.target.value)}
              onKeyDown={handleKeyPress}
              />
            <button
            onClick={buscarClima}
            disabled={carregando}
            >
              {carregando ? "Buscando...": "Buscar"}
              </button>
            </div>
            {erro && <p className="error-message">{erro}</p>}
          </div>

          {clima && (<>
          {/* Resultado do Clima */}
          <div className="card-resultado">
            <div className="info-cidade">
              <div className="nome-cidade">
              <MapPin color="yellow" size={48} />
               {clima.name}, {clima.sys.country}
              </div>
              <p className="desc-cidade">
                {clima.weather[0].description}
                </p>
            </div>
            {/* Temperatura Principal*/}
            <div className="temperatura-box">
              <div className="temperatura-valor">
                {Math.round(clima.main.temp)}ºC
              </div>
              <div className="sens-termica">
                sensação Térmica: {Math.round(clima.main.feels_like)}ºC
              </div>
            </div>

            {/*Informações Adicionais*/}
            <div className="detalhes-box">
              <div className="detal-item">
                <div className="detal-icone">
                <ThermometerSun style={{color: "yellow"}} size={32} />
                </div>
                <p className="detal-desc">
                  min/max
                </p>
                <p className="detal-valor">
                  {Math.round(clima.main.temp_max)}ºC/
                  {Math.round(clima.main.temp_min)}ººC
                </p>
              </div>

              <div className="detal-item">
                <div className="detal-icone">
                <Droplet style={{color: "blue"}} size={32} />
                </div>
                <p className="detal-desc">
                  Umidade
                </p>
                <p className="detal-valor">
                  {clima.main.humidity}%
                </p>
              </div>

              <div className="detal-item">
                <div className="detal-icone">
                <Wind style={{color: "gray"}} size={32}/>
                </div>
                <p className="detal-desc">
                  Vento
                </p>
                <p className="detal-valor">
                  {Math.round(clima.wind.speed * 3.6)} km/h
                </p>
              </div>

            </div>
         </div>{/* Fecha Resultado*/}
         </>)}
         </div>
      </div>
    </>
  )
}

export default App
