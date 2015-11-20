import React, { Component } from 'react';
import { Grid, Row, Col, Image, Table, Glyphicon, Alert } from 'react-bootstrap';
import QRCode from 'react-qr';
import tweetnacl from 'tweetnacl';
import CryptoJS from 'crypto-js';
import $ from 'jquery';
require('../libs/pngSupport.min.js');

class IDHTML extends Component {

  constructor() {
    super();
    this.state = {
      dataSentToHZ: false
    };
  }

  componentDidMount() {

    // get user entered details
    let certData = JSON.stringify({
      name: this.props.data.name,
      dateOfBirth: this.props.data.dob,
      height: this.props.data.height + 'cm',
      witness1: this.props.data.witness1,
      witness2: this.props.data.witness2,
      imageHash: tweetnacl.util.encodeBase64(tweetnacl.hash(tweetnacl.util.decodeBase64(this.props.data.image.split(',')[1])))
    });

    // do the encryption
    let keyPair = tweetnacl.sign.keyPair();
    let publicKey = tweetnacl.util.encodeBase64(keyPair.publicKey);
    let signature = tweetnacl.util.encodeBase64(tweetnacl.sign.detached(tweetnacl.util.decodeUTF8(certData), keyPair.secretKey));
    let secretKey = tweetnacl.util.encodeBase64(keyPair.secretKey);
    let encryptedSecretKey = CryptoJS.AES.encrypt(secretKey, this.props.data.password).toString();

    // verifying signature and encrypted key
    let signatureVerified = tweetnacl.sign.detached.verify(tweetnacl.util.decodeUTF8(certData), tweetnacl.util.decodeBase64(signature), tweetnacl.util.decodeBase64(publicKey));
    let encryptedKeyCheck = (CryptoJS.AES.decrypt(encryptedSecretKey, this.props.data.password).toString(CryptoJS.enc.Utf8) === secretKey);
    let verificationMessage = (signatureVerified && encryptedKeyCheck) ? 'Verified on generation' : 'Error in verification';

    // send data to HZ
    $.post( "https://refugees.bitnation.co/ref/server-req.php", { message: encodeURIComponent(`${signature}:${publicKey}`) }, function( data ) {

      console.log('Receiving data from HZ..');
      console.log(data);

      let verificationData = JSON.stringify({
        publicKey: publicKey,
        signature: signature,
        nhzTx: data.transaction
      });

      this.setState({
        certData: certData,
        verificationData: verificationData,
        encryptedSecretKey: encryptedSecretKey,
        verificationMessage: verificationMessage,
        dataSentToHZ: true
      });
    }.bind(this), 'json');

  }

  generatePDF() {
    var IDasPDF = new jsPDF();

    IDasPDF.addHTML(document.body, () => {
      IDasPDF.save(this.props.data.name + ' - ID.pdf');
    });
  }

  render() {

    var content;

    if(!this.state.dataSentToHZ) {
      content = <h3 className="text-center"><i className="fa fa-spin fa-3x fa-cog"></i><br/>Generating ID...</h3>;
      }
      else {
        content = <Grid className="IDHTML">
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
              <QRCode text={this.state.certData} />
              <h3><small>Verification data (encoded as Base64)</small></h3>
              <QRCode text={this.state.verificationData} />
              <h3><small>The encrypted secret key (encoded as Base64)</small></h3>
              <QRCode text={this.state.encryptedSecretKey} />
            </Col>
            <Col sm={6} className="certData">
              <h3><small>JSON encoded data entered by user</small></h3>
              {this.state.certData}
              <h3><small>Verification data (encoded as Base64)</small></h3>
              {this.state.verificationData}
              <h3><small>The encrypted secret key (encoded as Base64)</small></h3>
              {this.state.encryptedSecretKey}
              <hr />
              <h3><small>Checking signature and encrypted secret key</small></h3>
              <Alert bsStyle="info" className="text-center">
                {this.state.verificationMessage}
              </Alert>
            </Col>
          </Row>
        </Grid>;
      }

      return (
        <div>
          { content }
        </div>
      );
    }
  }

  export default IDHTML;
