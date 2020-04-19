const API_TOKEN = 'a94c399ed0c44e1f2ecfa629e045ab14';

export function getFilmsFromApiWithSearchedText(text,page){
  const url = 'https://api.themoviedb.org/3/search/movie?api_key='+API_TOKEN+'&language=fr&query='+text+'&page='+page;

  return fetch(url)
   .then((response)=> response.json()) // Response.json() = promise ... on la chaine après en l'appelant
   .catch((error)=> console.error(error));

}


export function getImageFromApi (name) {
  return 'https://image.tmdb.org/t/p/w300' + name
}