import React from 'react';
import ReactDOM from 'react-dom';


const App = () => {
  const kurssi = 'Half Stack -sovelluskehitys'
  const osa1 = 'Reactin perusteet'
  const tehtavia1 = 10
  const osa2 = 'Tiedonvälitys propseilla'
  const tehtavia2 = 7
  const osa3 = 'Komponenttien tila'
  const tehtavia3 = 14

  return (
    <div>
      <Otsikko kurssi={kurssi} />
      <Sisalto osa1={osa1} osa2={osa2} osa3={osa3} teht1={tehtavia1} teht2={tehtavia2} teht3={tehtavia3} />
      <Yhteensa tehtavat={tehtavia1 + tehtavia2 + tehtavia3} />
    </div>
  )
}

const Otsikko = (props) => {
  return(
    <div>
      <h1>{props.kurssi}</h1>
    </div>
  )
}

const Sisalto = (props) => {
  return (
    <div>
      <Osa osa={props.osa1} teht={props.teht1} />
      <Osa osa={props.osa2} teht={props.teht2} />
      <Osa osa={props.osa3} teht={props.teht3} />
    </div>
  )
}

const Osa = (props) => {
  return (
    <div>
      <p>{props.osa} {props.teht}</p>
    </div>
  )
}

const Yhteensa = (props) => {
  return (
    <div>
      <p>Yhteensa {props.tehtavat} tehtävää</p>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
