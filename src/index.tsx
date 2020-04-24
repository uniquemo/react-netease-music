import React from 'react'
import ReactDOM from 'react-dom'
import App from './pages/App'

import 'normalize.css/normalize.css'
import '@blueprintjs/icons/lib/css/blueprint-icons.css'
import '@blueprintjs/core/lib/css/blueprint.css'
import './styles/global.module.css'

const Root = () => {
  return (
    <div>
      <App />
    </div>
  )
}

ReactDOM.render(<Root />, document.getElementById('root'))
