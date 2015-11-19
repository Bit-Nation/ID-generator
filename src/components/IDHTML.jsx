import React, { Component } from 'react';
import { Grid, Row, Col, Image, Table, Glyphicon, Alert } from 'react-bootstrap';
import QRCode from 'react-qr';
import tweetnacl from 'tweetnacl';
import CryptoJS from 'crypto-js';
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
      witness1: this.props.data.witness1,
      witness2: this.props.data.witness2,
      imageHash: tweetnacl.util.encodeBase64(tweetnacl.hash(tweetnacl.util.decodeBase64(this.props.data.image.split(',')[1])))
    });

    let publicKey = tweetnacl.util.encodeBase64(this.state.keyPair.publicKey);

    let signature = tweetnacl.util.encodeBase64(tweetnacl.sign.detached(tweetnacl.util.decodeUTF8(certData), this.state.keyPair.secretKey));

    let verificationData = JSON.stringify({
      publicKey: publicKey,
      signature: signature,
      nhzTx: '123456789123487651234'
    });

    let secretKey = tweetnacl.util.encodeBase64(this.state.keyPair.secretKey);

    let encryptedSecretKey = CryptoJS.AES.encrypt(secretKey, this.props.data.password).toString();

    // verifying signature and encrypted key
    let signatureVerified = tweetnacl.sign.detached.verify(tweetnacl.util.decodeUTF8(certData), tweetnacl.util.decodeBase64(signature), tweetnacl.util.decodeBase64(publicKey));
    let encryptedKeyCheck = (CryptoJS.AES.decrypt(encryptedSecretKey, this.props.data.password).toString(CryptoJS.enc.Utf8) === secretKey);

    let verificationMessage = (signatureVerified && encryptedKeyCheck) ? 'Verified on generation' : 'Error in verification';

    return (
      <Grid className="IDHTML">
        <Row>
          <Col sm={6}>
            <h1>Bitnation<br/><small>Blockchain ID</small></h1>
          </Col>
          <Col sm={6}>
            <ul className="list-unstyled">
              <li><a href="#" onClick={this.generatePDF.bind(this)}><Glyphicon glyph="save" /> Save as PDF</a> (only works on large screens like laptops)</li>
              <li><a href="https://bitnation.co/" ><Glyphicon glyph="globe" /> https://bitnation.co/</a></li>
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
            <h3>Witnesses</h3>
            <Table striped bordered condensed>
              <tbody>
                <tr>
                  <td>1st witness</td><td>{this.props.data.witness1}</td>
                </tr>
                <tr>
                  <td>2nd witness</td><td>{this.props.data.witness2}</td>
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
            <h3><small>Verification data (encoded as Base64)</small></h3>
            <QRCode text={verificationData} />
            <h3><small>The encrypted secret key (encoded as Base64)</small></h3>
            <QRCode text={encryptedSecretKey} />
          </Col>
          <Col sm={6} className="certData">
            <h3><small>JSON encoded data entered by user</small></h3>
            {certData}
            <h3><small>Verification data (encoded as Base64)</small></h3>
            {verificationData}
            <h3><small>The encrypted secret key (encoded as Base64)</small></h3>
            {encryptedSecretKey}
            <hr />
            <h3><small>Checking signature and encrypted secret key</small></h3>
            <Alert bsStyle="info" className="text-center">
              {verificationMessage}
            </Alert>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default IDHTML;
