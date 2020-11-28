import {Layout} from "../../components/Layout";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {addRequestMessage, getRequest, getRequestMessages, updateRequestStatus} from "../../firebase/db";
import {RequestDetails} from "../../components/RequestDetails";
import {NominatimJS} from 'nominatim-search'

export default function Request({user}) {
  const router = useRouter()

  const [request, setRequest] = useState(null)
  const [requestMessages, setRequestMessages] = useState([])
  const [geoInfo, setGeoInfo] = useState(null)
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

  useEffect(() => {
    if (!user || !router.query.id)
      return;

    const fetchRequest = async (id) => {
      const messages = await getRequestMessages(id)
      setRequestMessages(messages)
    }

    fetchRequest(router.query.id)
  }, [user?.uid, router.query.id])

  useEffect(() => {
    if (!request)
      return;

    const fetchRequest = async (lat, lng) => {
      const result = await NominatimJS.reverse({
        lat: lat,
        lon: lng,
        accept_language: 'pl',
      })
      console.log(result)
      setGeoInfo(result)
    }

    fetchRequest(request.location.latitude, request.location.longitude)
  }, [request])

  const onSendMessage = async (message) => {
    const id = router.query.id
    await addRequestMessage(id, message)
    const messages = await getRequestMessages(id)
    setRequestMessages(messages)
  }

  const onStatusUpdate = async (status) => {
    const id = router.query.id
    await updateRequestStatus(id, status)
    const data = await getRequest(id)
    setRequest(data)
  }

  return (
    <Layout user={user} title={title}>
      {
        (user && request)
          ? (
            <RequestDetails
              request={request}
              messages={requestMessages}
              geoInfo={geoInfo}
              onSendMessage={onSendMessage}
              onStatusUpdate={onStatusUpdate}
            />
          )
          : ""
      }
    </Layout>
  )
}
