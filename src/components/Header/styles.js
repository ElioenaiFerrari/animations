import {Animated} from 'react-native';
import styled from 'styled-components/native';
import {logoURL} from '../../shared/themes';

export const Container = styled(Animated.View)`
  padding-top: 20px;
  justify-content: center;
  align-items: center;
  height: 80px;
`;

export const Logo = styled.Image.attrs({
  source: {uri: logoURL},
  resizeMode: 'contain',
})`
  width: 200px;
  height: 200px;
`;
