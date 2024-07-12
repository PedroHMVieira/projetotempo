import "./App.css";
import { useState } from "react";
import { Chart } from "react-google-charts";

function App() {
  const [city, setCity] = useState("");
  const [forecast, setForecast] = useState(null);

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  //função chamar APIs

  const handleSearch = () => {
    fetch(`http://api.weatherapi.com/v1/current.json?key=eb447988c0254e96ac8231259240807&q=${city}&lang=pt`)
    fetch(`http://api.weatherapi.com/v1/forecast.json?key=eb447988c0254e96ac8231259240807&q=${city}&lang=pt&alerts=yes`)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((data) => {
        console.log(data);
        setForecast(data);
      });
  };

  //código main com o return

  return (
    <div className="Fundo">
      <header className="Header">
        <h1 className="Titulo">
          NewsHub
        </h1>
      </header>
      <main className="main">


        <div>
          <h1>Verifique a previsão na cidade escolhida!</h1>
          <div>
            <div>
              <input onChange={handleChange} className="Input" value={city} />
            </div>
          </div>
        </div>
        <div>
          <button onClick={handleSearch} className="Button">
            Pesquisar
          </button>
        </div>

        {
          forecast ? (
            <div >
              <div>
                <div>
                  <img src={forecast.current.condition.icon} />
                </div>
                <h1>
                  Cidade: {forecast.location.name}<br />
                </h1>
                <div className="Texto">
                  País: {forecast.location.country}<br /> Estado: {forecast.location.region} <br />
                  Hoje: {forecast.current.condition.text}!<br /> Umidade atual: {forecast.current.humidity}%<br />
                  Maxima: {forecast.forecast.forecastday[0].day.maxtemp_c}<br /> Minima: {forecast.forecast.forecastday[0].day.mintemp_c} <br />

                </div>
                <section className="Texto2">
                  {
                    forecast ? (<div>
                      Precipitação: {forecast.current.precip_in}<br />Nuvens: {forecast.current.cloud}%<br />
                      UV: {forecast.current.uv}<br /> Temperatura atual: {forecast.current.temp_c} c°<br />
                      Nascer do sol: {forecast.forecast.forecastday[0].astro.sunrise}<br />Pôr do sol: {forecast.forecast.forecastday[0].astro.sunset}<br />
                    </div>) : null
                  }</section>

              </div>
            </div>
          ) : null
        }
      </main >

      <main>

      </main>

      <section className="Section">
        <h1 >Gráfico</h1>
        <div className="Grafico">
          <Chart
            chartType="Line"
            data={[["Temperatura"], [4, 5.5], [8, 12]]}
            width="100%"
            height="400px"
            legendToggle
          />
        </div>

      </section>

    </div >
  );
}

export default App;
