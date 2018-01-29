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

  render() {
    const keskiarvo = () => (this.state.hyvä - this.state.huono) / this.state.yhteensa
    const positiiviset = () => (this.state.hyvä / this.state.yhteensa) * 100
    return (
      <div>
        <h1>Anna palautetta</h1>
        <button onClick={this.arvioHyva}>Hyvä</button>
        <button onClick={this.arvioNeut}>Neutraali</button>
        <button onClick={this.arvioHuono}>Huono</button>

        <h1>Statistiikka</h1>
        <p>Hyvä {this.state.hyvä}</p>
        <p>Neutraali {this.state.neutraali}</p>
        <p>Huono {this.state.huono}</p>
        <p>Keskiarvo {keskiarvo()}</p>
        <p>Positiivisia {positiiviset()} %</p>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)




