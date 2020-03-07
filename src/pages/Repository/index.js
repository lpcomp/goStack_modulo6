import React, { Component } from 'react';
import { Text } from 'react-native';
import { WebView } from 'react-native-webview';

export default class Repository extends Component {
  static navigationOptions = {
    title: 'Repositório',
  };

  render() {
    const { navigation } = this.props;

    return (
      <WebView
        source={{ uri: navigation.getParam('html_url') }}
        style={{ flex: 1 }}
      />
    );
  }
}
