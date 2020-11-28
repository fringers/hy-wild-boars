import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { getRequestById } from '../../firebase/db';
import AppBar from '../AppBar';

const NotificationDetails = () => {
  const { id } = useParams();
  const [request, setRequest] = useState({});

  useEffect(async () => {
    const response = await getRequestById(id);
    setRequest(response);
  }, []);

  return (
    <>
      <AppBar />
      <p>{JSON.stringify(request)}</p>
    </>
  );
};

export default NotificationDetails;
