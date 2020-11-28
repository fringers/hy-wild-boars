import React, {useState, useEffect} from "react";
import {Layout} from "../components/Layout";
import {Dashboard} from "../components/Dashboard";
import {getGeoInfo, updateRequestGeoInfo, watchLatestRequests} from "../firebase/db";
import {reverseSearch} from "../nominatim/nominatim";

export default function Home({user}) {
  const [key, setKet] = useState((new Date()).getTime())

  const [latestRequest, setLatestRequests] = useState([])
  const [geoInfo, setGeoInfo] = useState({})
  const [statuses, setStatuses] = useState(['NEW', 'ACCEPTED'])
  const [geoSearch, setGeoSearch] = useState(null)

  useEffect(() => {
    if (!user)
      return;

    const onNewRequests = async (data) => {
      setLatestRequests(data)
      const geoData = await getGeoInfo(data)
      setGeoInfo(geoData);
    }

    return watchLatestRequests(10, statuses, geoSearch, onNewRequests);
  }, [user?.uid, key])

  const statusesChangeHandler = (statuses) => {
    setStatuses(statuses)
    setKet((new Date()).getTime())
  }

  const searchChangeHandler = (search) => {
    setGeoSearch(search)
    setKet((new Date()).getTime())
  }

  return (
    <Layout user={user} title="Ostatnie zgłoszenia">
      {
        user
          ? <Dashboard
              latestRequest={latestRequest}
              statuses={statuses}
              geoInfo={geoInfo}
              onStatusesChange={statusesChangeHandler}
              onSearchChange={searchChangeHandler}
            />
          : ""
      }
    </Layout>
  )
}
