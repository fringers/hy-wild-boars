import {Layout} from "../../components/Layout";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {addRequestMessage, getRequest, getRequestMessages, updateRequestStatus} from "../../firebase/db";
import {RequestDetails} from "../../components/RequestDetails";

export default function Request({user}) {
  const router = useRouter()

  const [request, setRequest] = useState(null)
  const [requestMessages, setRequestMessages] = useState([])
  const [title, setTitle] = useState('')

  useEffect(() => {
    if (!user || !router.query.id)
      return;

    const fetchRequest = async (id) => {
      const data = await getRequest(id)
      const messages = await getRequestMessages(id)
      setRequest(data)
      setRequestMessages(messages)
      setTitle(`Zgłoszenie z ${data.timestamp.toLocaleString("pl")}`)
    }

    fetchRequest(router.query.id)
  }, [user?.uid, router.query.id])

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
              onSendMessage={onSendMessage}
              onStatusUpdate={onStatusUpdate}
            />
          )
          : ""
      }
    </Layout>
  )
}
