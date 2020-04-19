const initialState = {favoriteFilms : []};

function toggleFavorite (state = initialState, action) {
    let nextState;
    switch(action.type) {
        case 'TOGGLE_FAVORITE' : 

            const favoriteFilmIndex = state.favoriteFilms.findIndex(item => item.id === action.value.id);
            
            if(favoriteFilmIndex != -1){ //on retrouve l'item dans les favoris
                 nextState = {
                    ...state,
                    favoriteFilms : state.favoriteFilms.filter((item, index) => index !== favoriteFilmIndex) 
                }
            }
            else {
                 nextState = { // on ne retrouve pas l'item du coup on rajoute dans la liste
                    ...state,
                    favoriteFilms : [...state.favoriteFilm, action.value]
                }
            }
            return nextState || state;
        
        default :
            return state;
    }

}


export default toggleFavorite;