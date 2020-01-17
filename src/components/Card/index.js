import React from 'react';
import {Animated, Text} from 'react-native';
import {
  PanGestureHandler,
  State,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';

import {Container} from './styles';
import {primaryColor} from '../../shared/themes';
import Header from '../../components/Header';

const Card = React.memo(() => {
  let offset = 0;
  const translateY = new Animated.Value(0);

  const nativeEvent = Animated.event(
    [
      {
        nativeEvent: {
          translationY: translateY,
        },
      },
    ],
    {useNativeDriver: true},
  );

  function onHandlerStateChange({nativeEvent}) {
    if (nativeEvent.oldState === State.ACTIVE) {
      let opened = false;

      const {translationY} = nativeEvent;
      offset += translationY;

      translateY.setOffset(offset);
      translateY.setValue(0);

      if (translationY >= 20) {
        opened = true;
      } else {
        translateY.setValue(offset);
        translateY.setOffset(0);
        offset = 0;
      }

      Animated.timing(translateY, {
        toValue: opened ? 380 : 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        offset = opened ? 380 : 0;
        translateY.setOffset(offset);
        translateY.setValue(0);
      });
    }
  }

  return (
    <PanGestureHandler
      onGestureEvent={nativeEvent}
      onHandlerStateChange={onHandlerStateChange}>
      <Container
        style={{
          borderRadius: translateY.interpolate({
            inputRange: [0, 380],
            outputRange: [0, 200],
            extrapolate: 'clamp',
          }),
          transform: [
            {
              translateY: translateY.interpolate({
                inputRange: [-300, 0, 380],
                outputRange: [-10, 0, 380],
                extrapolate: 'clamp',
              }),
            },
          ],
        }}>
        <Header translateY={translateY} />

        <TextInput
          style={{
            borderBottomWidth: 1,
            borderBottomColor: 'lightgray',
            marginHorizontal: 50,
            padding: 10,
            marginTop: 150,
          }}
          placeholder="Email"
        />
        <TextInput
          style={{
            borderBottomWidth: 1,
            borderBottomColor: 'lightgray',
            marginHorizontal: 50,
            padding: 10,
          }}
          placeholder="Password"
          secureTextEntry={true}
        />
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 40,
            backgroundColor: primaryColor,
            marginHorizontal: 50,
            paddingVertical: 15,
            borderRadius: 5,
          }}>
          <Text style={{color: '#fff', fontSize: 18}}>Entrar</Text>
        </TouchableOpacity>
      </Container>
    </PanGestureHandler>
  );
});

export default Card;
