import React, { Component } from 'react';
import { Grid, Button } from 'react-bootstrap';
require('../libs/pngSupport.min.js');

class IDHTML extends Component {

  generatePDF() {
    var doc = new jsPDF();
    doc.setFontSize(44);
    doc.text(20, 20, this.props.data.name);
    doc.addImage(this.props.data.image, 'JPEG', 20, 50, 100, 100);
    doc.setFontSize(22);
    doc.text(20, 30, 'Date of birth: ' + this.props.data.dob);
    doc.text(20, 40, 'Height: ' + this.props.data.height + 'cm');
    doc.save(this.props.data.name + ' - ID.pdf');
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
