import React from 'react';
import { clickProps } from 'react-native-web/dist/cjs/modules/forwardedProps';

import styled from 'styled-components/native';
import More from '../screen/More';

const Container = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  padding: 25px 25px 0 25px;
  width: 100%;
`;

const Logo = styled.Image`
  width: 20px;
  height: 40px;
`;

const Menu = styled.Text`
  font-size: 18px;
  color: #000;
  letter-spacing: 0.1px;
`;

const Header = ({navigation}) => {
  return (
    <Container>
      <Logo resizeMode="contain" source={require('../assets/logo.png')} />
      <Menu>Séries</Menu>
      <Menu>Filmes</Menu>
      <Menu >Minha lista </Menu>
    </Container>
  );
};

export default Header;
