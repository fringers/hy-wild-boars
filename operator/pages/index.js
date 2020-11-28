import React, {useState, useEffect} from "react";
import {Layout} from "../components/Layout";
import {Dashboard} from "../components/Dashboard";
import {watchLatestRequests} from "../firebase/db";
import {reverseSearch} from "../nominatim/nominatim";

export default function Home({user}) {
  const [key, setKet] = useState((new Date()).getTime())

  const [latestRequest, setLatestRequests] = useState([])
  const [geoInfo, setGeoInfo] = useState({})
  const [statuses, setStatuses] = useState(['NEW', 'ACCEPTED'])

  const getGeoInfo = async (requests) => {
    const promises = requests.map(async (r) => {
      const data = await reverseSearch({
        lat: r.location.latitude,
        lng: r.location.longitude,
      });
      return [
        r.id,
        data,
      ]
    });

    const resolved = await Promise.all(promises);
    setGeoInfo(Object.fromEntries(resolved));
  }

  useEffect(() => {
    if (!user)
      return;

    const onNewRequests = (data) => {
      setLatestRequests(data)
      getGeoInfo(data)
    }

    return watchLatestRequests(10, statuses, onNewRequests);
  }, [user?.uid, key])

  const statusesChangeHandler = (statuses) => {
    setKet((new Date()).getTime())
    setStatuses(statuses)
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
            />
          : ""
      }
    </Layout>
  )
}
