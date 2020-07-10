import { ADD_PLACE, SET_PLACES } from './places-action';
import Place from '../models/place';

const initialState = {
    places: []
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_PLACES:
            return {
                places: payload.map(place => {
                    const { id, title, imageUri, address, lat, lng } = place;
                    return new Place(id.toString(), title, imageUri, address, lat, lng)
                })
            }
        case ADD_PLACE:
            const { id, title, image, address, coords } = payload;
            const newPlace = new Place(id.toString(), title, image, address, coords.lat, coords.lng);
            return {
                places: state.places.concat(newPlace)
            }
        default:
            return state;
    }
};