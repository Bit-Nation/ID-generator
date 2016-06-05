import React, { Component } from 'react';
import { Grid } from 'react-bootstrap';
import IDForm from './IDForm.jsx';
import IdHtml from './IDHTML.jsx';

class IDGeneratorApp extends Component {

  constructor() {
    super();
    this.state = {};
    this.saveData = this.saveData.bind(this);
  }

  saveData(data) {
    this.setState({ IDdata: data });
  }

  render() {
    let content = (this.state.IDdata) ? <IdHtml data={this.state.IDdata} /> : <IDForm saveData={this.saveData} />;

    return (
      <Grid>
        {content}
        <hr />
        <p className="text-center">App created by <a href="https://bitnation.co/">Bitnation</a></p>
      </Grid>
    );
  }
}

export default IDGeneratorApp;
