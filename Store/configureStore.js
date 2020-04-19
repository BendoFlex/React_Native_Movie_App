import {createStore} from 'redux'
import toggleFavorite from './reducers/toggleFavorite'


export default createStore(toggleFavorite) // export pour utilisation de notre store

