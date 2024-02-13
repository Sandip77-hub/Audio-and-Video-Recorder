import React, { useState } from 'react';

const ShowResult= () => {
  const [result, setResult] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch('YOUR_BACKEND_API_ENDPOINT');
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      console.error('No file selected.');
      return;
    }

    const formData = new FormData();
    formData.append('video', selectedFile);

    try {
      const response = await fetch('YOUR_UPLOAD_API_ENDPOINT', {
        method: 'POST',
        body: formData,
      });
      // Handle response from the backend if needed
    } catch (error) {
      console.error('Error uploading video:', error);
    }
  };

  return (
    <div>
      <h2>Display Result</h2>
      <button onClick={fetchData}>Show Result</button>
      <input type="file" onChange={handleFileChange} accept="video/*" />
      <button onClick={handleUpload}>Upload Video</button>
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
