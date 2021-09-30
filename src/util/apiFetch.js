const getData = async (url) => {
  const data = await fetch(url, {
    method: 'Get',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',//eslint-disable-line
    },
  });
  return data;
};

export default getData;
