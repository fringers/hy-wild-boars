import React, {useState, useEffect} from "react";
import {Layout} from "../components/Layout";
import {Dashboard} from "../components/Dashboard";
import {watchLatestRequests} from "../firebase/db";

export default function Home({user}) {
  const [key, setKet] = useState((new Date()).getTime())

  const [latestRequest, setLatestRequests] = useState([])
  const [statuses, setStatuses] = useState(['NEW', 'ACCEPTED'])


  useEffect(() => {
    if (!user)
      return;

    const onNewRequests = (data) => {
      setLatestRequests(data)
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
              onStatusesChange={statusesChangeHandler}
            />
          : ""
      }
    </Layout>
  )
}
