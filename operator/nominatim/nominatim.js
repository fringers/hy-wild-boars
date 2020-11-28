import {NominatimJS} from "nominatim-search";

export const reverseSearch = async ({lat, lng}) => {
  return await NominatimJS.reverse({
    lat: lat,
    lon: lng,
    accept_language: 'pl',
  })
}

export const geoSearch = async (query) => {
  return await NominatimJS.search({
    q: query,
    accept_language: 'pl',
    countrycodes: 'pl',
  })
}

const stateShortener = (state) => {
  return state.replace('województwo', 'woj.')
}

export const toShortAddress = (geo) => {
  const address = geo.address;

  if (address.village)
    return address.village + ", " + address.county + ", " + stateShortener(address.state)

  if (address.city)
    return address.city + ", " + stateShortener(address.state)

  if (address.administrative)
    return address.administrative + ", " + stateShortener(address.state)

  return stateShortener(address.state)
}