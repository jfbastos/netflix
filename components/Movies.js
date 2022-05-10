import React, {useState} from 'react';
import {Dimensions, TouchableNativeFeedback} from 'react-native';
import {animated, useSpring} from '@react-spring/native';

import styled from 'styled-components/native';

const Container = styled.View`
  padding: 20px 0;
`;

const Label = styled.Text`
  color: #fff;
  font-size: 16px;
  margin: 0 0 5px 10px;
`;
const MovieScroll = styled.ScrollView`
  padding-left: 10px;
`;

const MoviePoster = styled.Image`
  width: ${Math.round((Dimensions.get('window').width * 28) / 100)}px;
  height: 150px;
`;

const AnimatedMoviePoster = animated(MoviePoster);

const MovieCard = styled.View`
  padding-right: 9px;
`;

const Movies = ({label, item}) => {
  const [pressing, setPressedIn] = useState({pressed: false});

  const translate = useSpring({to: {scale: 1.1}, from: {scale: 1}, config: {tension: 100}});

  return (
    <Container>
      <Label>{label}</Label>
      <MovieScroll horizontal>
        {item.map((movie, index) => {
          return (
            <MovieCard key={String(index)}>
              <TouchableNativeFeedback
                onPressIn={() => {
                  setPressedIn({pressed: true, index: index});
                  
                }}
                onPressOut={() => {
                  setPressedIn({pressed: false});

                }}>
                <AnimatedMoviePoster
                  style={
                    index === pressing.index ? {transform: [translate]} : null
                  }
                  resizeMode="cover"
                  source={{uri: movie.Poster}}
                />
              </TouchableNativeFeedback>
            </MovieCard>
          );
        })}
      </MovieScroll>
    </Container>
  );
};

export default Movies;
