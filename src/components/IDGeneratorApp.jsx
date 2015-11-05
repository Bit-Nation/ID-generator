import React, { Component } from 'react';
import { Grid } from 'react-bootstrap';

// our ID form data
let IDdata = {
  name     : null,
  password : null,
  age      : null,
  colors   : []
}

class IDGeneratorApp extends Component {

  render() {
    return (
      <Grid>
        <h1>ID Generator App</h1>
      </Grid>
    );
  }
}

export default IDGeneratorApp;
