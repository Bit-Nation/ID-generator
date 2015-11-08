import React, { Component } from 'react';
import { Grid, Row, Col, Input, Image, ButtonInput } from 'react-bootstrap';

import AvatarEditor from "react-avatar-cropper";

class IDForm extends Component {

  constructor() {
    super();
    this.state = {
      cropperOpen: false
    };
  }

  handleSubmit(e) {
    e.preventDefault();

    var IDdata = {
      name: this.refs.name.getValue(),
      height: this.refs.height.getValue(),
      dob: this.refs.dob.getValue(),
      image: this.state.croppedImage
    }

    this.props.saveData(IDdata);

  }

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

  render() {

    return (
      <Grid>
        <h2>ID Generation<br/><small>Please enter your details</small></h2>
        <hr />
        <Col md={10} mdOffset={1}>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <Row>
              <Col sm={6}>
                { this.state.croppedImage && <Image src={this.state.croppedImage} responsive thumbnail /> }
                <Input
                  type="file"
                  label="Upload your photo"
                  type="file"
                  accept="image/*"
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
            <Col sm={6}>
              <Input
                type="text"
                ref="name"
                placeholder="Norma Jeane Mortenson"
                label="Your name"
                help="Format: First Middle Last"
                required
                />
              <Input
                type="number"
                ref="height"
                label="Your height"
                help="In centimeters"
                required
                placeholder="177"
                />
              <Input
                type="number"
                ref="dob"
                label="Your date of birth"
                help="Format: YYYYMMDD"
                placeholder="19910823"
                required
                />
              <ButtonInput className="center-block" type="submit" value="Generate ID" bsStyle="primary" bsSize="large"/>
            </Col>
          </Row>
        </form>
      </Col>
    </Grid>
  );
}
}

export default IDForm;
