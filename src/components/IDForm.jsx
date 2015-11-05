import React, { Component } from 'react';
import { Grid, Col, Input, ButtonInput } from 'react-bootstrap';

import AvatarCropper from "react-avatar-cropper";

class IDForm extends Component {

  render() {

    return (
      <Grid>
        <h2>ID Generation</h2>
        <hr />
        <Col lg={6} lgOffset={3}>
          <Input
            type="text"
            ref="name"
            placeholder="Norma Jeane Mortenson"
            label="Your name"
            help="Format of name: first middle last"
            />
            <Input
              type="number"
              ref="height"
              label="Your height"
              help="In centimeters"
              />
              <Input
                type="text"
                ref="dob"
                label="Your date of birth"
                help="Format: YYYYMMDD"
                placeholder="19910823"
                />
            <ButtonInput className="center-block" type="submit" value="Generate ID" bsStyle="primary" bsSize="large"/>
        </Col>
      </Grid>
    );
  }
}

export default IDForm;
