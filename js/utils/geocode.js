function rec(resolve, reject, waiting, delay) {
  if (!window || !window.google || !window.google.maps) {
    if (waiting > 5000) {
      reject('Google maps API is not loading');
    } else {
      setTimeout(() => rec(resolve, reject, waiting + delay, delay), delay);
    }
  } else {
    resolve(window.google.maps);
  }
}

function getMaps() {
  return new Promise((resolve, reject) => {
    const waiting = 0;
    const delay = 50;
    rec(resolve, reject, waiting, delay);
  });
}

export default async function(address) {
  const maps = await getMaps();
  return new Promise((resolve, reject) => {
    const geocoder = new maps.Geocoder();
    geocoder.geocode({ address }, (result, status) => {
      if (status === 'OK') {
        resolve(result);
      } else {
        reject(status);
      }
    });
  });
}
