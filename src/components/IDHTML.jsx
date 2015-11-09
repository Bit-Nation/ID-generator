import React, { Component } from 'react';
import { Grid, Row, Col, Button, Glyphicon } from 'react-bootstrap';
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
      <Grid className="IDHTML">
        <Row>
          <Col md={6}>
            <h1>Bitnation<br/><small>Emergency Refugee ID</small></h1>
          </Col>
          <Col md={6}>
            <ul className="list-unstyled">
              <li><a href="#"><Glyphicon glyph="print" /> Print</a></li>
              <li><a href="#"><Glyphicon glyph="save" /> Download</a></li>
              <li><a href="#"><Glyphicon glyph="envelope" /> Contact</a></li>
            </ul>
          </Col>
        </Row>
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
