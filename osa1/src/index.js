import React from 'react';
import ReactDOM from 'react-dom';


const App = () => {
  const kurssi = {
    nimi: 'Half Stack -sovelluskehitys',
    osat: [
      {
        nimi: 'Reactin perusteet',
        tehtavia: 10
      },
      {
        nimi: 'Tiedonvälitys propseilla',
        tehtavia: 7
      },
      {
        nimi: 'Komponenttien tila',
        tehtavia: 14
      }
    ]
  }

  return (
    <div>
      <Otsikko kurssi={kurssi.nimi} />
      <Sisalto osat={kurssi.osat} />
      <Yhteensa osat={kurssi.osat} />
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
      <Osa osa={props.osat[0]} />
      <Osa osa={props.osat[1]} />
      <Osa osa={props.osat[2]} />
    </div>
  )
}

const Osa = (props) => {
  return (
    <div>
      <p>{props.osa.nimi} {props.osa.tehtavia}</p>
    </div>
  )
}

const Yhteensa = (props) => {
  return (
    <div>
      <p>Yhteensa {props.osat[0].tehtavia + props.osat[1].tehtavia + props.osat[2].tehtavia} tehtävää</p>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
