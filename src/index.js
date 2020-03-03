/* eslint-disable react/prefer-stateless-function */
/* eslint-disable no-use-before-define */
import React, { Component } from 'react';
import { StatusBar } from 'react-native';

import './config/ReactotronConfig';
import Routes from './routes';

export default class App extends Component {
  render() {
    return (
      <>
        <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
        <Routes />
      </>
    );
  }
}
