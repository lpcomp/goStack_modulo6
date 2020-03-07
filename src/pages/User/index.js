/* eslint-disable react/static-property-placement */
/* eslint-disable react/state-in-constructor */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import api from '../../services/api';

import {
  Container,
  Header,
  Name,
  Avatar,
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
} from './styles';

export default class User extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('user').name,
  });

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
    }).isRequired,
  };

  state = {
    stars: [],
    pagina: 1,
    refreshing: false,
    loading: false,
  };

  async componentDidMount() {
    const { navigation } = this.props;
    const user = navigation.getParam('user');

    this.setState({ loading: true });

    // console.tron.log(user);

    const response = await api.get(`/users/${user.login}/starred`);

    // console.tron.log(response);

    this.setState({ stars: response.data, loading: false });
  }

  refreshList = () => {
    console.log('dando refresh');
    this.setState({ refreshing: true, stars: [] }, () =>
      this.loadMore('refresh')
    );
  };

  loadMore = async tipo => {
    const { navigation } = this.props;
    const user = navigation.getParam('user');
    let { pagina } = this.state;
    const { stars } = this.state;

    pagina += 1;
    console.log(tipo);
    if (tipo === 'refresh') pagina = 1;

    const response = await api.get(
      `/users/${user.login}/starred?page=${pagina}`
    );

    if (response.data.length <= 0) return;
    // stars.push(response.data);
    console.log(stars);
    console.log(response.data);

    this.setState({
      stars: [...stars, ...response.data],
      pagina,
      refreshing: false,
    });
    console.log(this.state.stars);
  };

  render() {
    const { navigation } = this.props;
    const { stars, loading, refreshing } = this.state;

    const user = navigation.getParam('user');

    return (
      <Container>
        <Header>
          <Avatar source={{ uri: user.avatar }} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>

        {loading ? (
          <ActivityIndicator color="#7159c1" style={{ marginTop: '5%' }} />
        ) : (
          <Stars
            data={stars}
            onEndReachedThreshold={0.2}
            onEndReached={this.loadMore}
            onRefresh={this.refreshList}
            refreshing={refreshing}
            keyExtractor={star => String(star.id)}
            renderItem={({ item }) => (
              <Starred>
                <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
                <Info>
                  <Title>{item.name}</Title>
                  <Author>{item.owner.login}</Author>
                </Info>
              </Starred>
            )}
          />
        )}
      </Container>
    );
  }
}
