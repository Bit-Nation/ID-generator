import React, { Component } from 'react';
import { Grid } from 'react-bootstrap';
import IDForm from './IDForm.jsx';
import IDHTML from './IDHTML.jsx';

class IDGeneratorApp extends Component {

  constructor() {
    super();
    this.state = {};
  }

  saveData(data) {
    this.setState({IDdata:data});
  }

  render() {
    
    let content = (this.state.IDdata) ? <IDHTML data={this.state.IDdata}/> : <IDForm saveData={this.saveData.bind(this)}/>;

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
