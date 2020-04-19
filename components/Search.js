import * as React from 'react';
import { TextInput,Text, View, StyleSheet, Image, Button, FlatList, ActivityIndicator } from 'react-native';
import films from '../Helpers/FilmsData';
import FilmItem from './FilmItem';
import {getFilmsFromApiWithSearchedText} from '../API/TMDBApi';


class Search extends React.Component {

 constructor(props){
   super(props)
   this.searchedText="";
   this.state = {
     films : [],
     isLoading:false
    }
   this.page = 0;
   this.total_pages= 0;

 }
  
  _loadFilms(){
    console.log(this.state.isLoading)
    this.setState({isLoading:true})
    if (this.searchedText.length > 0){
     getFilmsFromApiWithSearchedText(this.searchedText,this.page+1).then(data => {
       this.page = data.page;
       this.total_pages = data.total_pages;
       this.setState({
         films : [...this.state.films, ...data.results],  // concaténer les anciennes données + les nouvelles
         isLoading: false
        });
     })
    }
    console.log(this.state.isLoading)
  }

  searchFilms(){
    this.page = 0;
    this.total_pages = 0;
    this.setState({
      films : []  //state a 0
    }, () => {
      this._loadFilms() //Callback Du SetState
    })
    
  }

  _handleChangeText(text){
    this.searchedText=text;
  }
  /*componentDidMount(){
    this._loadFilms("the Grudge");
  }des que le component est monté éxécute le code*/

  _displayLoading(){
    if(this.state.isLoading){
      return(
        <View style={styles.loadingContainer}>
            <ActivityIndicator size="large"/>
        </View>
      )
    }
  }

  
  
  render() {
    console.log('RENDER');
    console.log(this.searchedText);
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          WELCOME TO MOVIES AND ME
        </Text>
        <Image style={styles.logo} source={require('../assets/movie_logo.png')} />
        <TextInput placeholder='Mon Film' 
                  onChangeText={(text) => this._handleChangeText(text)} 
                  onSubmitEditing={()=> this._searchFilms()}
                  />
        <Button title="Rechercher" onPress={()=> this._searchFilms()}></Button>
        <FlatList
        data={this.state.films} //on passe des props l'objet film
        keyExtractor= {(item) => item.id.toString() }
        renderItem={ ({item}) => <FilmItem film={item}/>}// film est notre item 
        onEndReached={() => {
          if(this.page < this.total_pages){
              this._loadFilms(); // on reload les films en plus
          }
        }}
        />
        {this._displayLoading()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  paragraph: {
    margin: 24,
    marginTop: 0,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logo: {
    height: 128,
    width: 128,
  },
  loadingContainer :{
    position:"absolute",
    top:350
  }
});


export default Search;