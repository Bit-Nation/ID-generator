import React, { Component } from 'react';
import { Grid, Row, Col, Image, Table, Glyphicon } from 'react-bootstrap';
require('../libs/pngSupport.min.js');

class IDHTML extends Component {

  generatePDF() {
    var IDasPDF = new jsPDF('p','pt','a4');

    IDasPDF.addHTML(document.body, { pagesplit: true }, () => {
      IDasPDF.save(this.props.data.name + ' - ID.pdf');
    });
  }

  componentWillMount() {
    console.log(this.props.data);
  }

  render() {



    return (
      <Grid className="IDHTML">
        <Row>
          <Col sm={6}>
            <h1>Bitnation<br/><small>Emergency Refugee ID</small></h1>
          </Col>
          <Col sm={6}>
            <ul className="list-unstyled">
              <li><a href="#" onClick={this.generatePDF.bind(this)}><Glyphicon glyph="save" /> Save as PDF</a></li>
              <li><a href="https://bitnation.co/" ><Glyphicon glyph="envelope" /> Contact Us</a></li>
            </ul>
          </Col>
        </Row>
        <Row>
          <Col sm={6}>
            <h2>Photo</h2>
            <Image src={this.props.data.image} responsive thumbnail />
          </Col>
          <Col sm={6}>
            <h2>Identity data</h2>
            <Table striped bordered condensed>
              <tbody>
                <tr>
                  <td>Name</td><td>{this.props.data.name}</td>
                </tr>
                <tr>
                  <td>Date of Birth</td><td>{this.props.data.dob}</td>
                </tr>
                <tr>
                  <td>Height</td><td>{this.props.data.height}cm</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col sm={6}>
            <h2>QR codes</h2>
          </Col>
          <Col sm={6}>
            {JSON.stringify(this.props.data)}
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default IDHTML;
