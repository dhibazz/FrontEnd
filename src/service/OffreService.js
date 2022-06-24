// import axios from 'axios';

const OFFRE_API_BASE_URL = "http://localhost:8080/api/Offre";

const options = { method: 'GET', headers: { 'Accept': 'application/json' }, url: `${OFFRE_API_BASE_URL}/getAllOffres/`, validateStatus: false }


export const getOffers = async () => {
    const data = await fetch('http://localhost:8080/api/Offre/getAllOffres');
    const  offers = await data.json();
    return offers
}

export const addNewOffer = async (offer) => {
    // debugger
    await fetch('http://localhost:8080/api/Offre/addOffre', {
        method: 'POST',
        body: JSON.stringify(offer),
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        } 
    }); 
    return offer
}

export const updateOffer = async (offer) => {
    // debugger
    await fetch(`http://localhost:8080/api/Offre/updateOffre/${offer.id}`, {
        method: 'PUT',
        body: JSON.stringify(offer),
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        } 
    });
    return offer
}

export const deleteOffer = async (offer) => {
    await fetch(`http://localhost:8080/api/Offre/deleteOffre/${offer.id}`, {
        method: 'DELETE'
    });
    return offer
}
