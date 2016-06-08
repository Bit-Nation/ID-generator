import React, { Component } from 'react';
import { Grid, Row, Col, Image, Table, Glyphicon, Alert } from 'react-bootstrap';
import QRCode from 'react-qr';
import { saveAs } from 'file-saver';
import bitnationId from '../modules/BitnationId';

class IDHTML extends Component {

  constructor() {
    super();
    this.state = {
      bitnationIdGenerated: false
    };

    this.generateJSON = this.generateJSON.bind(this);
  }

  componentDidMount() {
    const bitnationJsonId = {};
    console.log('User submitted information', this.props.data);
    const certData = bitnationId.getCertData(this.props.data);
    bitnationJsonId.userData = certData;
    bitnationJsonId.image = 'todo';
    console.log('created certData');
    const keyPair = bitnationId.generateKeypair();
    console.log('created keypair');
    const signature = bitnationId.signUserData(certData, keyPair.secretKey);
    console.log('created signature');

    let verificationMessage;

    bitnationId.encryptSecretKey(keyPair.secretKey, this.props.data.password)
    .then((encryptedSecretKeyBundle) => {
      console.log('created encryptedSecretKeyBundle');
      bitnationJsonId.crypto = {
        encryptedSecretKey: bitnationId.toBase64(encryptedSecretKeyBundle.encryptedSecretKey),
        salt: bitnationId.toBase64(encryptedSecretKeyBundle.salt),
        nonce: bitnationId.toBase64(encryptedSecretKeyBundle.nonce),
        logN: encryptedSecretKeyBundle.logN,
        blockSize: encryptedSecretKeyBundle.blockSize,
        publicKey: bitnationId.toBase64(keyPair.publicKey)
      };
      return bitnationId.checkEncryptedSecretKey(encryptedSecretKeyBundle, keyPair.secretKey, this.props.data.password);
    })
    .then((encryptedSecretKeyCheck) => {
      if (encryptedSecretKeyCheck && bitnationId.verifySignature(certData, signature, keyPair.publicKey)) {
        verificationMessage = 'Verified on generation';
      } else {
        verificationMessage = 'Error in verification';
      }

      // console.log(verificationMessage);

      return bitnationId.createHorizonTransaction(keyPair.publicKey, signature);
    })
    .then((horizonTx) => {
      bitnationJsonId.hztx = horizonTx;
      console.log(`pub key and signature written to Horizon. Returned transaction ID: ${horizonTx}`);

      const verificationData = JSON.stringify({
        publicKey: bitnationId.toBase64(keyPair.publicKey),
        signature: bitnationId.toBase64(signature),
        nhzTx: horizonTx
      });

      console.log('verificationData', verificationData);

      this.setState({
        certData,
        verificationData,
        verificationMessage,
        bitnationJsonId,
        bitnationIdGenerated: true
      });
    })
    .catch((error) => {
      this.setState({
        error: error.toString()
      });
      console.log(error);
    });
  }

  generateJSON() {
    console.log('generating a JSON...');
    console.log(this.state.bitnationJsonId);
    console.log(JSON.stringify(this.state.bitnationJsonId, null, 2));
    const blob = new Blob([JSON.stringify(this.state.bitnationJsonId)], { type: 'application/json' });
    saveAs(blob, 'bitnation-id.json');
  }

  render() {
    let content;

    if (this.state.error) {
      content = (
        <Alert bsStyle="danger" className="text-center">
          <h1><Glyphicon glyph="alert" /> Oops... we have a problem.</h1>
          <h2>{this.state.error}</h2>
          <p>To get support, email <a href="mailto:support@andrewgolightly.com">Andrew Golightly</a>.</p>
        </Alert>
      );
    } else if (!this.state.bitnationIdGenerated) {
      content = <h3 className="text-center"><i className="fa fa-spin fa-3x fa-cog"></i><br />Generating ID...</h3>;
    } else {
      content = (<Grid className="IDHTML">
        <Row>
          <Col sm={6}>
            <h1>Bitnation<br /><small>Blockchain ID</small></h1>
          </Col>
          <Col sm={6}>
            <ul className="list-unstyled">
              <li><a href="#" onClick={this.generateJSON}><Glyphicon glyph="save" /> Save your Bitnation ID</a></li>
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
            <QRCode text={JSON.stringify(this.state.certData)} />
            <h3><small>Verification data (encoded as Base64)</small></h3>
            <QRCode text={this.state.verificationData} />
          </Col>
          <Col sm={6} className="certData">
            <h3><small>JSON encoded data entered by user</small></h3>
            {JSON.stringify(this.state.certData)}
            <h3><small>Verification data (encoded as Base64)</small></h3>
            {this.state.verificationData}
            <hr />
            <h3><small>Checking signature and encrypted secret key</small></h3>
            <Alert bsStyle="info" className="text-center">
              {this.state.verificationMessage}
            </Alert>
          </Col>
        </Row>
      </Grid>);
    }

    return (
      <div>
        {content}
      </div>
    );
  }
}

IDHTML.propTypes = {
  data: React.PropTypes.object.isRequired
};

export default IDHTML;
