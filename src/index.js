import React from 'react';
import {StatusBar} from 'react-native';

import {primaryColor} from './shared/themes';
import Routes from './routes';

const App = () => (
  <>
    <StatusBar barStyle="light-content" backgroundColor={primaryColor} />
    <Routes />
  </>
);

export default App;
