const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const schema = require('./schema/schema');
const keys = require('./config/keys');
const cors = require('cors');

const mongoParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
}
mongoose.connect(keys.mongoURI, mongoParams, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log('Database connected successfully');
});

const app = express();

app.use(cors());
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});