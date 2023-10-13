import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

const URL =
  'https://api.freecurrencyapi.com/v1/latest?base_currency=EUR'; //API avain poistettu osoitteesta

function App() {
  const [eur, setEur] = useState(0);
  const [gbp, setGbp] = useState(0);
  const [rate, setRate] = useState(0);

  const convert = (e) => {
    e.preventDefault();
    axios
      .get(URL)
      .then((response) => {
        const json = response.data;
        setRate(json.data.GBP);
        setGbp(eur * json.data.GBP);
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <div id="container">
      <form onSubmit={convert} className="currency-converter">
        <div className="input-container">
          <label htmlFor="eur">EUR</label>
          <input
            type="number"
            step="0.01"
            id="eur"
            value={eur}
            onChange={(e) => setEur(e.target.value)}
          />
          <output>{rate}</output>
        </div>
        <div className="output-container">
          <label htmlFor="gbp">GBP</label>
          <output id="gbp">{gbp.toFixed(2)}</output>
        </div>
        <div className="button-container">
          <button type="button" onClick={convert}>
            Calculate
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;


