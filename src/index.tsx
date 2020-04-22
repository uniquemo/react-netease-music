import React from 'react'
import ReactDOM from 'react-dom'
import App from './pages/App'

const Root = () => {
  return (
    <div>
      Hello world
      <App />
    </div>
  )
}

ReactDOM.render(<Root />, document.getElementById('root'))
