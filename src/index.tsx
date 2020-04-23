import React from 'react'
import ReactDOM from 'react-dom'
import App from './pages/App'

import 'normalize.css/normalize.css'
import '@blueprintjs/icons/lib/css/blueprint-icons.css'
import '@blueprintjs/core/lib/css/blueprint.css'

const Root = () => {
  return (
    <div>
      Hello world
      <App />
    </div>
  )
}

ReactDOM.render(<Root />, document.getElementById('root'))
