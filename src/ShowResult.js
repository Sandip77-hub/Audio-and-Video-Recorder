import React, { useState } from 'react';
import './ShowResult.css';

const ShowResult= () => {
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
      <h2>Display Result</h2>
      <button onClick={fetchData}>Show Result</button>
      {result && (
        <div>
          {typeof result === 'string' ? (
            <p>{result}</p>
          ) : (
            <img src={result.imageUrl} alt="Result" />
          )}
        </div>
      )}
    </div>
  );
};

export default ShowResult;
