import React, { useState } from 'react';

const ShowResult = () => {
  const [result, setResult] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch('YOUR_BACKEND_API_ENDPOINT');
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <h1>Display Results from Backend</h1>
      <button onClick={fetchData}>Show Result</button>
      {result && (
        <div>
          <h2>Result:</h2>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default ShowResult;
