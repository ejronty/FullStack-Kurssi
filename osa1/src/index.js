import React from 'react';
import ReactDOM from 'react-dom';


class App extends React.Component {
  constructor() {
    super()
    this.state = {
      hyvä: 0,
      neutraali: 0,
      huono: 0
    }
  }

  arvioHyva = () => {
    this.setState({
      hyvä: this.state.hyvä + 1
    })
  }

  arvioHuono = () => {
    this.setState({
      huono: this.state.huono + 1
    })
  }

  arvioNeut = () => {
    this.setState({
      neutraali: this.state.neutraali +1
    })
  }

  render() {
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
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)




