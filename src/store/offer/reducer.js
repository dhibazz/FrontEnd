import {
  GET_OFFERS_SUCCESS,
  GET_OFFERS_FAIL,
  ADD_OFFER_SUCCESS,
  ADD_OFFER_FAIL,
  UPDATE_OFFER_SUCCESS,
  UPDATE_OFFER_FAIL,
  DELETE_OFFER_SUCCESS,
  DELETE_OFFER_FAIL,
} from "./actionTypes"

const INIT_STATE = {
  offers: [],
  error: {},
}

const Offer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_OFFERS_SUCCESS:
      return {
        ...state,
        offers: action.payload,
      }

    case GET_OFFERS_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case ADD_OFFER_SUCCESS:
      return {
        ...state,
        offers: [...state.offers, action.payload],
      }

    case ADD_OFFER_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case UPDATE_OFFER_SUCCESS:
      return {
        ...state,
        offers: state.offers.map(offer =>
          offer.id.toString() === action.payload.id.toString()
            ? { offer, ...action.payload }
            : offer
        ),
      }

    case UPDATE_OFFER_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case DELETE_OFFER_SUCCESS:
      return {
        ...state,
        offers: state.offers.filter(
          offer => offer.id.toString() !== action.payload.id.toString()
        ),
      }

    case DELETE_OFFER_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}

export default Offer
