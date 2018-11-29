import React, { Component } from 'react';

import axios from 'axios';

class App extends Component {
  state = {
    data: ''
  };

  async componentDidMount() {
    const { data } = await axios.get('/api/getTestData');

    this.setState({ data });
  }

  render() {
    const { data } = this.state;

    return <p>{data}</p>;
  }
}

export default App;
