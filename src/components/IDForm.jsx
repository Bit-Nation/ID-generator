import React, { Component } from 'react';
import { Grid, Row, Col, FormControl, Image, ButtonInput } from 'react-bootstrap';
import { Form, ValidatedInput } from 'react-bootstrap-validation';
import AvatarEditor from 'react-avatar-cropper';

class IDForm extends Component {

  /* Initialise */
  /* ---------- */

  constructor() {
    super();
    this.state = {
      cropperOpen: false
    };

    this.handleValidSubmit = this.handleValidSubmit.bind(this);
    this.handleInvalidSubmit = this.handleInvalidSubmit.bind(this);
    this.handleFile = this.handleFile.bind(this);
    this.handleRequestHide = this.handleRequestHide.bind(this);
    this.handleCrop = this.handleCrop.bind(this);
  }

  /* Handle the form submission */
  /* -------------------------- */

  handleValidSubmit(values) {
    const IDdata = {
      name: values.name,
      height: values.height,
      dob: values.dob,
      password: values.password,
      image: this.state.croppedImage,
      witness1: values.witness1,
      witness2: values.witness2
    };

    this.props.saveData(IDdata);
  }

  handleInvalidSubmit(errors, values) {
    console.log('errors', errors);
    console.log('values', values);
  }

  /* Process the uploaded image */
  /* -------------------------- */

  handleFile(e) {
    const reader = new FileReader();
    const file = e.target.files[0];

    if (!file) return;

    //useful for debugging base64 to images http://codebeautify.org/base64-to-image-converter
    reader.onload = function () {
      this.setState({
        cropperOpen: true,
        uploadedImage: reader.result
      });
    }.bind(this);
    reader.readAsDataURL(file);
  }

  handleCrop(dataURI) {
    this.setState({
      cropperOpen: false,
      croppedImage: dataURI
    });
  }

  handleRequestHide() {
    this.setState({
      cropperOpen: false
    });
  }

  /* Render the form */
  /* --------------- */

  render() {
    return (
      <Grid>
        <h2>ID Generation<br /><small>Please enter your details</small></h2>
        <hr />
        <Form
          onValidSubmit={this.handleValidSubmit}
          onInvalidSubmit={this.handleInvalidSubmit}
        >
          <Row>
            <Col sm={4}>
              {this.state.croppedImage && <Image src={this.state.croppedImage} responsive thumbnail />}
              <FormControl
                type="file"
                label="Upload your photo"
                accept="image/*"
                onChange={this.handleFile}
                required
              />
              {this.state.cropperOpen && <AvatarEditor
                onRequestHide={this.handleRequestHide}
                cropperOpen={this.state.cropperOpen}
                onCrop={this.handleCrop}
                image={this.state.uploadedImage}
                width={350}
                height={450}
                                         />
              }
            </Col>
            <Col sm={4}>
              <ValidatedInput
                type="text"
                placeholder="Norma Jeane Mortenson"
                help="Format: First Middle Last"
                label="Your name"
                name="name"
                validate="required"
                errorHelp="Please enter your name"
              />

              <ValidatedInput
                type="number"
                name="height"
                label="Your height"
                help="In centimeters"
                placeholder="177"
                validate="required,isInt,isLength:2:3"
                errorHelp="Please enter a valid height in centimeters"
              />

              <ValidatedInput
                type="number"
                name="dob"
                label="Your date of birth"
                help="Format: YYYYMMDD"
                placeholder="19910823"
                validate="required,isInt,isLength:8:8"
                errorHelp="Please enter a valid date of birth: YYYYMMDD"
              />

              <ValidatedInput
                type="password"
                name="password"
                label="Password"
                help="Used to encrypt your private key."
                validate="required,isLength:6"
                errorHelp="Please specify a password with minimum 6 characters"
              />

              <ValidatedInput
                type="password"
                name="password-confirm"
                label="Confirm Password"
                validate={(val, context) => val === context.password}
                errorHelp="Passwords do not match"
              />
            </Col>
            <Col sm={4}>
              <p>To add credibility to this ID, please have a couple of people witness you filling out this form.</p>
              <ValidatedInput
                type="text"
                placeholder="Elvis Aaron Presley"
                help="Format: First Middle Last"
                label="1st witness"
                name="witness1"
                validate="required"
                errorHelp="Have a witness enter their name"
              />
              <ValidatedInput
                type="text"
                placeholder="Leonardo Wilhelm DiCaprio"
                help="Format: First Middle Last"
                label="2nd witness"
                name="witness2"
                validate="required"
                errorHelp="Have another witness enter their name"
              />
            </Col>
          </Row>
          <ButtonInput className="center-block" type="submit" value="Generate ID" bsStyle="primary" bsSize="large" />
        </Form>
      </Grid>
    );
  }
}

IDForm.propTypes = {
  saveData: React.PropTypes.func.isRequired
};

export default IDForm;
