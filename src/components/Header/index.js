import React from 'react';

import {Container, Logo} from './styles';

const Header = React.memo(({translateY}) => {
  return (
    <Container
      style={{
        opacity: translateY.interpolate({
          inputRange: [0, 250],
          outputRange: [1, 0],
        }),
      }}>
      <Logo />
    </Container>
  );
});

export default Header;
