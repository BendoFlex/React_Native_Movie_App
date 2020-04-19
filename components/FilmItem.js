// Components/FilmItem.js

import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import {getImageFromApi} from '../API/TMDBApi'

export default class FilmItem extends React.Component {
  render() {
    const film = this.props.film;// introduction des props
    return (
      <View style={styles.main_container}>
        <Image style={styles.image} source={{uri: getImageFromApi(film.poster_path)}} />
        <View style= {styles.desc_film}>
            <Text style={styles.title_text}>{film.title}</Text>
            <Text style={styles.desc_text} numberOfLines={6}>{film.overview}</Text>
        </View>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    height:190,// créé un espace ou stocker les infos du film!
  },
  title_text: {
    fontSize:20,
  },
  image : {
    width :50,
    height : 50
  },
  desc_film : {
    justifyContent :'space-between'
  },
  desc_text: {
    fontSize:15,
  }
});

