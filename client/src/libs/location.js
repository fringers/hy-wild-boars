export const getPosition = async () => {
  if (!navigator.geolocation) {
    console.error('Geolokalizacja nie jest obsługiwana przez to urządzenie');
    throw Error();
  }

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(resolve);
  });
};
