import express from 'express'

const app = express()

app.use(express.static('dist'))

app.get('*', (req, res) => {
  const content = '<div>response</div>'
  res.send(content)
})

app.listen(4003, () => {
  console.log('Server is listening on port: 4003')
})
