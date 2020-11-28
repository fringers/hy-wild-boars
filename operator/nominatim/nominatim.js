import {NominatimJS} from "nominatim-search";

export const reverseSearch = async ({lat, lng}) => {
  return await NominatimJS.reverse({
    lat: lat,
    lon: lng,
    accept_language: 'pl',
  })
}

const stateShortener = (state) => {
  return state.replace('województwo', 'woj.')
}

export const toShortAddress = (geo) => {
  const address = geo.address;

  if (address.village)
    return address.village + ", " + address.county + ", " + stateShortener(address.state)

  return address.city + ", " + stateShortener(address.state)
}