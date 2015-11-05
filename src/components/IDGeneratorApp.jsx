import React, { Component } from 'react';
import { Grid } from 'react-bootstrap';
import IDForm from './IDForm.jsx';
import IDHTML from './IDHTML.jsx';

// our ID form data
let IDdata = {
}

class IDGeneratorApp extends Component {

  render() {

    let content = (IDdata.name) ? <IDHTML /> : <IDForm />;

  return (
    <Grid>
      { content }
      <hr />
      <p className="text-center">App created by <a href="https://bitnation.co/">Bitnation</a></p>
    </Grid>
  );
}
}

export default IDGeneratorApp;
