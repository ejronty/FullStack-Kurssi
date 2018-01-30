import React from 'react';
import ReactDOM from 'react-dom';


class App extends React.Component {
  constructor() {
    super()
    this.state = {
      hyvä: 0,
      neutraali: 0,
      huono: 0,
      yhteensa: 0
    }
  }

  arvioHyva = () => {
    this.setState({
      hyvä: this.state.hyvä + 1,
      yhteensa: this.state.yhteensa +1
    })
  }

  arvioHuono = () => {
    this.setState({
      huono: this.state.huono + 1,
      yhteensa: this.state.yhteensa + 1
    })
  }

  arvioNeut = () => {
    this.setState({
      neutraali: this.state.neutraali +1,
      yhteensa: this.state.yhteensa + 1
    })
  }

  arvioi = (arvio) => {
    if (arvio === 'Hyvä') {
      return () => {this.arvioHyva()}
    }else if (arvio === 'Huono') {
      return () => {this.arvioHuono()}
    }else if (arvio === 'Neutraali') {
      return () => {this.arvioNeut()}
    }
  }

  render() {
    return (
      <div>
        <h1>Anna palautetta</h1>
        <Button handleClick={this.arvioi('Hyvä')} text="Hyvä" />
        <Button handleClick={this.arvioi('Neutraali')} text="Neutraali" />
        <Button handleClick={this.arvioi('Huono')} text="Huono" />

        <Statistics tiedot={this.state} />
      </div>
    )
  }
}

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistic = (props) => {
  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  if (props.tiedot.yhteensa === 0) {
    return (
      <div>
        <h1>Statistiikka</h1>
        <p>Ei yhtään palautetta annettu</p>
      </div>
    )
  }
  return (
    <div>
      <h1>Statistiikka</h1>
      <table>
        <tbody>
          <Statistic name='Hyvä' value={props.tiedot.hyvä} />
          <Statistic name='Neutraali' value={props.tiedot.neutraali} />
          <Statistic name='Huono' value={props.tiedot.huono} />
          <Statistic name='Keskiarvo' value={Keskiarvo(props.tiedot)} />
          <Statistic name='Positiivisia' value={Positiiviset(props.tiedot)} />
        </tbody>
      </table>
    </div>
  )
}

const Keskiarvo = (props) => {
  return ((props.hyvä - props.huono) / props.yhteensa)
}

const Positiiviset = (props) => {
  return (props.hyvä / props.yhteensa *100)
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)




