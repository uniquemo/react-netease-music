import React from 'react'
import ReactDOM from 'react-dom'
import App from './pages/App'

import 'normalize.css/normalize.css'
import '@blueprintjs/core/lib/css/blueprint.css'
import './styles/global.module.css'

const Root = () => {
  return (
    <div>
      <App />
    </div>
  )
}

const render = () => {
  ReactDOM.render(<Root />, document.getElementById('root'))
}

render()

if ((module as any).hot) {
  ;(module as any).hot.accept(['./pages/App.tsx'], () => render())
}
