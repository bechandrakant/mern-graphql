const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')
const mongoose = require('mongoose')
const cors = require('cors')

mongoose.connect('mongodb+srv://gql:<password>@cluster0-ix8rr.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    console.log('Connected to database')
  })
  .catch(err => console.log(err));

const app = express()

// Allow cross origin requests
app.use(cors())

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}))

app.listen(5000, () => console.log("App listening on port 5000"))