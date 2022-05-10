import React, { useEffect, useState } from 'react';
import { Dimensions, StatusBar } from 'react-native';
import styled from 'styled-components/native';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Movies from '../components/Movies';
import { filterByCountry, getGeolocation } from '../services/MovieFilter';


const api = require('../assets/movies.json')

const Container = styled.ScrollView`
  flex: 1;
  background-color: #000;
`;

const Poster = styled.ImageBackground`
  width: 100%;
  height: ${(Dimensions.get('window').height * 81) / 100}px;
`;

const Home = ({ navigation }) => {
  const [position, setPosition] = useState(null);
  const [nationalMovies, setNationalMoveis] = useState([]);


  useEffect(() => {
    const obtainLocation = async () => {
      try {
        const currentPosition = await getGeolocation();
        setPosition(currentPosition);
      } catch (error) {
        console.log('Obtain location error', error);
      }
    }
    obtainLocation();
  }, [])


  useEffect(() => {
    const loadingNationalMovies = async () => {
        const allMovies = require('../assets/movies.json')
        let filteredMovies = [];

        if(position){
          filteredMovies = await filterByCountry(allMovies, position);
          setNationalMoveis(filteredMovies)
        }
    }


    loadingNationalMovies();
  }, [position])

  //console.log('location', position)
  console.log('nationalMovies', nationalMovies)

  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <Container>
        <Poster source={require('../assets/poster.jpg')}>
          <Header navigation={navigation} />
          <Hero />
        </Poster>
        <Movies label="Recomendados" item={nationalMovies} />
        <Movies label="Top 10" item={nationalMovies} />
      </Container>
    </>
  );
};

export default Home;
