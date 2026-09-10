exports.handler = async (event) => {
  const city = event.queryStringParameters.city;
  const API_KEY = process.env.WEATHER_API_KEY;

  if (!city) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Magaalada lama sheegin' })
    };
  }

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    const data = await res.json();

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Khalad ayaa dhacay' })
    };
  }
};
