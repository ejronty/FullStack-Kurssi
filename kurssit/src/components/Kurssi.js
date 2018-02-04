import React from 'react'

const Kurssi = ({kurssi}) => {
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

export default Kurssi