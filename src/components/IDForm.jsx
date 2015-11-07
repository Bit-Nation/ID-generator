import React, { Component } from 'react';
import { Grid, Col, Input, ButtonInput } from 'react-bootstrap';

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
        <h2>ID Generation</h2>
        <hr />
        <Col md={6} mdOffset={3}>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <Input
              type="file"
              label="Upload your photo"
              ref="filename"
              type="file"
              accept="image/*"
              onChange={this.handleFile.bind(this)}
              />
            <img src={this.state.croppedImage} />
            { this.state.cropperOpen && <AvatarEditor
              onRequestHide={this.handleRequestHide.bind(this)}
              cropperOpen={this.state.cropperOpen}
              onCrop={this.handleCrop.bind(this)}
              image={this.state.uploadedImage}
              width={400}
              height={400}
              />
          }
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
          </form>
        </Col>
      </Grid>
    );
  }
}

export default IDForm;
