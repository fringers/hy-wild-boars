import React, {useState} from "react";
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import {geoSearch} from "../nominatim/nominatim";

export const GeoSearchInput = ({onChange}) => {
  const [isLoading, setLoading] = useState(false)
  const [options, setOptions] = useState([])

  const onSearch = async (query) => {
    setLoading(true)
    try {
      const result = await geoSearch(query)
      setOptions(result)
    } catch (e) {
      console.error(e)
    }
    setLoading(false)
  }

  return (
    <AsyncTypeahead
      id="Search"
      isLoading={isLoading}
      labelKey={option => `${option.display_name}`}
      options={options}
      onSearch={onSearch}
      onChange={onChange}
    />
  )
}