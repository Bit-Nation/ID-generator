import React, { Component } from 'react';
import { Grid, Col, Input, ButtonInput } from 'react-bootstrap';

import AvatarEditor from "react-avatar-editor";

class IDForm extends Component {

  handleSubmit(e) {
    e.preventDefault();

    var IDdata = {
      name: this.refs.name.getValue(),
      height: this.refs.height.getValue(),
      dob: this.refs.dob.getValue(),
      image: this.refs.avatar.getImage()
    }

    this.props.saveData(IDdata);

  }

  render() {

    return (
      <Grid>
        <h2>ID Generation</h2>
        <hr />
        <Col md={6} mdOffset={3}>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <AvatarEditor
              ref="avatar"
              image="https://unsplash.it/500/500?image=823"
              width={300}
              height={300}
              border={50}
              color={[255, 255, 255, 0.6]}
              scale={1.2}
              />
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
