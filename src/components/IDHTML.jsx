import React, { Component } from 'react';
import { Grid } from 'react-bootstrap';

class IDHTML extends Component {

  render() {

    return (
      <Grid>
        <h1>Details for {this.props.data.name}</h1>
        <img src={this.props.data.image} />
        <p>Born: {this.props.data.dob}</p>
        <p>Height: {this.props.data.height}cm</p>
      </Grid>
    );
  }
}

export default IDHTML;
