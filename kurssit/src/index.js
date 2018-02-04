import React from 'react';
import ReactDOM from 'react-dom';


const App = () => {
  const kurssit = [
    {
      nimi: 'Half Stack -sovelluskehitys',
      id: 1,
      osat: [
        {
          nimi: 'Reactin perusteet',
          tehtavia: 10,
          id: 1
        },
        {
          nimi: 'Tiedonvälitys propseilla',
          tehtavia: 7,
          id: 2
        },
        {
          nimi: 'Komponenttien tila',
          tehtavia: 14,
          id: 3
        }
      ]
    },
    {
      nimi: 'Node.js',
      id: 2,
      osat: [
        {
          nimi: 'Routing',
          tehtavia: 3,
          id: 1
        },
        {
          nimi: 'Middlewaret',
          tehtavia: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <h1>Opetusohjelma</h1>
      {kurssit.map(kurssi => <Kurssi key={kurssi.id} kurssi={kurssi} />)}
    </div>
  )
}

const Kurssi = (props) => {
  return (
    <div>
      <Otsikko kurssi={props.kurssi.nimi} />
      <Sisalto osat={props.kurssi.osat} />
      <Yhteensa osat={props.kurssi.osat} />
    </div>
  )
}

const Otsikko = (props) => {
  return(
    <div>
      <h2>{props.kurssi}</h2>
    </div>
  )
}

const Sisalto = (props) => {
  return (
    <div>
      {props.osat.map(osa => <Osa key={osa.id} nimi={osa.nimi} teht={osa.tehtavia} />)}
    </div>
  )
}

const Osa = (props) => {
  return (
    <div>
      <p>{props.nimi} {props.teht}</p>
    </div>
  )
}

const Yhteensa = (props) => {
  const tehtavat = props.osat.map(osa => osa.tehtavia)
  const reducer = (accumulator, currentValue) => accumulator + currentValue
  return (
    <div>
      <p>Yhteensa {tehtavat.reduce(reducer)} tehtävää</p>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));