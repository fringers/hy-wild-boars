import React, {useEffect, useState} from "react";
import {Layout} from "../components/Layout";
import {Chart} from "../components/Chart";
import {getLastRequestsByDate} from "../firebase/db";

export default function Charts({user}) {
  const [requests, setRequests] = useState([])

  useEffect(() => {
    if (!user)
      return;

    const fetchData = async () => {
      const data = await getLastRequestsByDate(30);
      setRequests(data)
    }

    fetchData()
  }, [user?.uid])


  return (
    <Layout user={user} title="Statystyki">
      <Chart requests={requests}/>
    </Layout>
  )
}
