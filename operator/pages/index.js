import React, {useState, useEffect} from "react";
import {Layout} from "../components/Layout";
import {Dashboard} from "../components/Dashboard";
import {watchLatestRequests} from "../firebase/db";

export default function Home({user}) {
  const [latestRequest, setLatestRequests] = useState([])

  useEffect(() => {
    if (!user)
      return;

    const onNewRequests = (data) => {
      console.log(data)
      setLatestRequests(data)
    }

    return watchLatestRequests(5, onNewRequests);
  }, [user?.uid])

  return (
    <Layout user={user}>
      {
        user
          ? <Dashboard latestRequest={latestRequest}/>
          : ""
      }
    </Layout>
  )
}
