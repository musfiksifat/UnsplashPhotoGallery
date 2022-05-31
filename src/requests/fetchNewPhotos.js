const CLIENT_ID = 'JsVtVO7gV4bxRgqzBjlnv-Kr0184raGk5tSzs3-F65M';

export const fetchNewPhotos = async pageNo => {
  const url = `https://api.unsplash.com/photos/?page=${pageNo}&client_id=${CLIENT_ID}&per_page=24`;
  const response = await fetch(url, {method: 'get'});
  return response.json();
};
