import {Layout} from "../../components/Layout";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {getRequest} from "../../firebase/db";
import dynamic from "next/dynamic";

const MapWithNoSSR = dynamic(() => import('../../components/Map'), {
  ssr: false
});

export default function Request({user}) {
  const router = useRouter()

  const [request, setRequest] = useState(null)
  const [title, setTitle] = useState('')

  useEffect(() => {
    if (!user || !router.query.id)
      return;

    const fetchRequest = async (id) => {
      const data = await getRequest(id)
      setRequest(data)
      setTitle(`Zgłoszenie z ${data.timestamp.toLocaleString("pl")}`)
    }

    fetchRequest(router.query.id)
  }, [user?.uid, router.query.id])

  return (
    <Layout user={user} title={title}>
      {
        (user && request)
          ? <MapWithNoSSR
            requests={[request]}
            center={[request.location.latitude, request.location.longitude]}
            zoom={10}
          />
          : ""
      }
    </Layout>
  )
}
