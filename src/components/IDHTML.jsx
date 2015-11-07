import React, { Component } from 'react';
import { Grid, Button } from 'react-bootstrap';
require('../libs/pngSupport.min.js');

class IDHTML extends Component {

  generatePDF() {
    var IDasPDF = new jsPDF('p','pt','a4');

    IDasPDF.addHTML(document.body, () => {
      IDasPDF.save(this.props.data.name + ' - ID.pdf');
    });
  }

  render() {

    return (
      <Grid>
        <h1>Details for {this.props.data.name}</h1>
        <img src={this.props.data.image} />
        <p>Born: {this.props.data.dob}</p>
        <p>Height: {this.props.data.height}cm</p>
        <Button bsStyle="success" onClick={this.generatePDF.bind(this)}>Generate PDF</Button>
      </Grid>
    );
  }
}

export default IDHTML;
