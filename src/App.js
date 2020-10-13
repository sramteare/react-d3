import React from 'react';
import './App.css';
import {useChartData} from "./hooks/useChartData"
import LineChart from "./components/charts/CustomLineChart";
import data from "./data/data";


function App() {
  let chartData = useChartData(data);
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Percent Value Vs Category
        </p>
      </header>
      <section>
      <LineChart data={chartData} width={700} height={400}/>
      </section>
    </div>
  );
}

export default App;
