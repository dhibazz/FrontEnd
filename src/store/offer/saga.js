import { takeEvery, put, call } from "redux-saga/effects"

// Calender Redux States
import {
  ADD_NEW_OFFER,
  DELETE_OFFER,
  GET_OFFERS,
  UPDATE_OFFER,
} from "./actionTypes"

import {
  getOffersSuccess,
  getOffersFail,
  addOfferFail,
  addOfferSuccess,
  updateOfferSuccess,
  updateOfferFail,
  deleteOfferSuccess,
  deleteOfferFail,
} from "./actions"

//Include Both Helper File with needed methods
import {
  getOffers,
  addNewOffer,
  updateOffer,
  deleteOffer,
} from "../../service/OffreService"

function* fetchOffers() {
  try {
    const response = yield call(getOffers)
    yield put(getOffersSuccess(response))
  } catch (error) {
    yield put(getOffersFail(error))
  }
}

function* onAddNewOffer({ payload: offer }) {
  try {
    // debugger
    const response = yield call(addNewOffer, offer)
    yield put(addOfferSuccess(response))
  } catch (error) {
    yield put(addOfferFail(error))
  }
}

function* onUpdateOffer({ payload: offer }) {
  try {
    const response = yield call(updateOffer, offer)
    yield put(updateOfferSuccess(response))
  } catch (error) {
    yield put(updateOfferFail(error))
  }
}

function* onDeleteOffer({ payload: offer }) {
  // debugger;
  try {
    const response = yield call(deleteOffer, offer)
    yield put(deleteOfferSuccess(response))
  } catch (error) {
    yield put(deleteOfferFail(error))
  }
}

function* OfferSaga() {
  yield takeEvery(GET_OFFERS, fetchOffers)
  yield takeEvery(ADD_NEW_OFFER, onAddNewOffer)
  yield takeEvery(UPDATE_OFFER, onUpdateOffer)
  yield takeEvery(DELETE_OFFER, onDeleteOffer)
}

export default OfferSaga
