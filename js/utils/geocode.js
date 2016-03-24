function rec(resolve, reject, waiting, delay) {
  if (!window || !window.google || !window.google.maps) {
      if (waiting > 5000) {
        reject('Google maps API is not loading');
      } else {
        waiting += delay;
        setTimeout(() => rec(resolve, reject, waiting, delay), delay);
      }
    } else {
      resolve(window.google.maps);
    }
}

function getMaps() {
  return new Promise((resolve, reject) => {
    let waiting = 0;
    const delay = 50;
    rec(resolve, reject, waiting, delay);
  });
}

export default async function(address) {
  let maps = await getMaps();
  return new Promise((resolve, reject) => {
      let geocoder = new maps.Geocoder();
      geocoder.geocode({ address }, (result, status) => {
        if (status === 'OK') {
          resolve(result);
        } else {
          reject(status);
        }
      });
    });
}
