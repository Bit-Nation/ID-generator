import React, { Component } from 'react';
import { Grid, Row, Col, Image, Table, Glyphicon } from 'react-bootstrap';
import QRCode from 'react-qr';
import tweetnacl from 'tweetnacl';
require('../libs/pngSupport.min.js');

class IDHTML extends Component {

  constructor() {
    super();
    this.state = {
      keyPair: tweetnacl.sign.keyPair()
    };
  }

  generatePDF() {
    var IDasPDF = new jsPDF();

    IDasPDF.addHTML(document.body, () => {
      IDasPDF.save(this.props.data.name + ' - ID.pdf');
    });
  }

  render() {

    let certData = JSON.stringify({
      name: this.props.data.name,
      dateOfBirth: this.props.data.dob,
      height: this.props.data.height + 'cm',
      imageHash: tweetnacl.util.encodeBase64(tweetnacl.hash(tweetnacl.util.decodeBase64(this.props.data.image.split(',')[1])))
    });

    // console.log('message');
    // console.log(certData);

    let publicKey = tweetnacl.util.encodeBase64(this.state.keyPair.publicKey);
    // console.log('public key');
    // console.log(publicKey);

    let signedCertData = tweetnacl.util.encodeBase64(tweetnacl.sign(tweetnacl.util.decodeUTF8(certData), this.state.keyPair.secretKey));
    // console.log('signed cert data');
    // console.log(signedCertData);

    // let detachedData = tweetnacl.util.encodeBase64(tweetnacl.sign.detached(tweetnacl.util.decodeUTF8(certData), this.state.keyPair.secretKey));
    // console.log('detached key signature');
    // console.log(detachedData);

    let originalMessage = tweetnacl.sign.open(tweetnacl.util.decodeBase64(signedCertData), this.state.keyPair.publicKey);
    // console.log(tweetnacl.util.encodeBase64(originalMessage));
    // console.log(tweetnacl.util.encodeUTF8(originalMessage));

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
            <h3><small>JSON encoded data entered by user</small></h3>
            <QRCode text={certData} />
            <h3><small>Public key (encoded as Base64)</small></h3>
            <QRCode text={publicKey} />
            <h3><small>Signed cert data (encoded as Base64)</small></h3>
            <QRCode text={signedCertData} />
          </Col>
          <Col sm={6} className="certData">
            <h3><small>JSON encoded data entered by user</small></h3>
            {certData}
            <h3><small>Public key (encoded as Base64)</small></h3>
            {publicKey}
            <h3><small>Signed cert data (encoded as Base64)</small></h3>
            {signedCertData}
            <hr />
            <h2>DEBUG DATA</h2>
            <h3><small>Private/secret key (encoded as Base64)</small></h3>
            {tweetnacl.util.encodeBase64(this.state.keyPair.secretKey)}
            <h3><small>Decrypted message (encoded as UTF8)</small></h3>
            {tweetnacl.util.encodeUTF8(originalMessage)}
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default IDHTML;
