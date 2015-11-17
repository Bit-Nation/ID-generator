import React, { Component } from 'react';
import { Grid, Row, Col, Input, Image, ButtonInput } from 'react-bootstrap';
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
  }

  /* Handle the form submission */
  /* -------------------------- */

  handleValidSubmit(values) {

    var IDdata = {
      name: values.name,
      height: values.height,
      dob: values.dob,
      password: values.password,
      image: this.state.croppedImage,
      familyMember1: values.familyMember1,
      familyMember2: values.familyMember2
    }

    this.props.saveData(IDdata);

  }

  handleInvalidSubmit(errors, values) {

    console.log(errors)
  }

  /* Process the uploaded image */
  /* -------------------------- */

  handleFile(e) {
    var reader = new FileReader();
    var file = e.target.files[0];

    if (!file) return;

    reader.onload = function(img) {
      this.setState({
        cropperOpen: true,
        uploadedImage: img.target.result
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
        <h2>ID Generation<br/><small>Please enter your details</small></h2>
        <hr />
        <Form
          onValidSubmit={this.handleValidSubmit.bind(this)}
          onInvalidSubmit={this.handleInvalidSubmit.bind(this)}>
          <Row>
            <Col sm={4}>
              { this.state.croppedImage && <Image src={this.state.croppedImage} responsive thumbnail /> }
              <Input
                type='file'
                label='Upload your photo'
                accept='image/*'
                onChange={this.handleFile.bind(this)}
                required
                />
              { this.state.cropperOpen && <AvatarEditor
                onRequestHide={this.handleRequestHide.bind(this)}
                cropperOpen={this.state.cropperOpen}
                onCrop={this.handleCrop.bind(this)}
                image={this.state.uploadedImage}
                width={350}
                height={450}
                />
            }
          </Col>
          <Col sm={4}>
            <ValidatedInput
              type='text'
              placeholder='Norma Jeane Mortenson'
              help='Format: First Middle Last'
              label='Your name'
              name='name'
              validate='required'
              errorHelp='Please enter your name'
              />

            <ValidatedInput
              type='number'
              name='height'
              label='Your height'
              help='In centimeters'
              placeholder='177'
              validate='required,isInt'
              errorHelp='Please enter your height'
              />

            <ValidatedInput
              type='number'
              name='dob'
              label='Your date of birth'
              help='Format: YYYYMMDD'
              placeholder='19910823'
              validate='required,isInt,isLength:8:8'
              errorHelp='Please enter a valid date of birth: YYYYMMDD'
              />

            <ValidatedInput
              type='password'
              name='password'
              label='Password'
              help='Used to encrypt your private key.'
              validate='required'
              errorHelp='Please specify a password'
              />

            <ValidatedInput
              type='password'
              name='password-confirm'
              label='Confirm Password'
              validate={(val, context) => val === context.password}
              errorHelp='Passwords do not match'
              />

            <ButtonInput className='center-block' type='submit' value='Generate ID' bsStyle='primary' bsSize='large'/>
          </Col>
          <Col sm={4}>
            <p>To add credibility to this ID, please have a couple of family members witness you filling out this form.</p>
            <ValidatedInput
              type='text'
              placeholder='Elvis Aaron Presley'
              help='Format: First Middle Last'
              label='1st Family member'
              name='familyMember1'
              validate='required'
              errorHelp='Have a family member enter their name'
              />
            <ValidatedInput
              type='text'
              placeholder='Leonardo Wilhelm DiCaprio'
              help='Format: First Middle Last'
              label='2nd Family member'
              name='familyMember2'
              validate='required'
              errorHelp='Have another family member enter their name'
              />
          </Col>
        </Row>
      </Form>
    </Grid>
  );
}
}

export default IDForm;
