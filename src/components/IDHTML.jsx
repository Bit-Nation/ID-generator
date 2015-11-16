import React, { Component } from 'react';
import { Grid, Row, Col, Image, Table, Glyphicon } from 'react-bootstrap';
import QRCode from 'react-qr';
import tweetnacl from 'tweetnacl';
require('../libs/pngSupport.min.js');

class IDHTML extends Component {

  generatePDF() {
    var IDasPDF = new jsPDF();

    IDasPDF.addHTML(document.body, () => {
      IDasPDF.save(this.props.data.name + ' - ID.pdf');
    });
  }

  componentWillMount() {
    console.log(this.props.data);
    // componentWillMount() {
    //   let keyPair = tweetnacl.sign.keyPair();
    //   console.log('Public key...');
    //   let publicKey = keyPair.publicKey;
    //   console.log(publicKey);
    //   console.log(tweetnacl.util.encodeBase64(publicKey));
    //
    //   console.log('signing a string...')
    //   let message = tweetnacl.util.decodeUTF8("Hello Andrew");
    //   let signedMessage = tweetnacl.sign(message, keyPair.secretKey);
    //   console.log(signedMessage);
    //   let base64SignedMessage = tweetnacl.util.encodeBase64(signedMessage);
    //   console.log(base64SignedMessage);
    //   console.log(tweetnacl.util.encodeUTF8(tweetnacl.sign.open(tweetnacl.util.decodeBase64(base64SignedMessage), keyPair.publicKey)));
    //
    //   console.log(tweetnacl.util.encodeBase64(tweetnacl.hash(message)));
    // }
  }

  render() {

    let certData = {
      name: this.props.data.name,
      dateOfBirth: this.props.data.dob,
      height: this.props.data.height + 'cm'
    };

    return (
      <Grid className="IDHTML">
        <Row>
          <Col sm={6}>
            <h1>Bitnation<br/><small>Emergency Refugee ID</small></h1>
          </Col>
          <Col sm={6}>
            <ul className="list-unstyled">
              <li><a href="#" onClick={this.generatePDF.bind(this)}><Glyphicon glyph="save" /> Save as PDF</a> (only works on large screens like laptops)</li>
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
            <QRCode text={JSON.stringify(certData)} />
          </Col>
          <Col sm={6}>
            {JSON.stringify(certData)}
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default IDHTML;
