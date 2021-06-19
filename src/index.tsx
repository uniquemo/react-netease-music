import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import App from './pages/App'
import { GRAPHQL_SERVER } from 'constants/server'

import 'normalize.css/normalize.css'
import '@blueprintjs/core/lib/css/blueprint.css'
import './styles/global.module.css'

const client = new ApolloClient({
  uri: GRAPHQL_SERVER,
  cache: new InMemoryCache(),
})

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  )
}

const render = () => {
  ReactDOM.render(<Root />, document.getElementById('root'))
}

render()

if ((module as any).hot) {
  ;(module as any).hot.accept(['./pages/App.tsx'], () => render())
}
