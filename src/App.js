import React, { useState } from "react";
import AWS from "aws-sdk";
import './App.css';

const S3Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  // Set up AWS credentials and S3 bucket info
  AWS.config.update({ // todo
    accessKeyId: "AKIAQFC27RAX32J67Q5G",  // Replace with your access key
    secretAccessKey: "zxtlQ+8ifCYHzfPPD6QqdwKeSmJJ9WNCDLS1XTj0", // Replace with your secret key
    region: "eu-west-2" // Replace with your S3 bucket region and something and 
  });

  const s3 = new AWS.S3();

  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!selectedFile) {
      alert("Please select a file to upload");
      return;
    }

    const params = {
      Bucket: "s3-general-purpose-bkt", // Replace with your S3 bucket name
      Key: `documents/${selectedFile.name}`, // File name you want to save as in S3
      Body: selectedFile,
      ContentType: selectedFile.type
    };

    s3.upload(params, (err, data) => {
      if (err) {
        console.error("Error uploading file:", err);
        alert("There was an error uploading your file.",err);
        return;
      }
      alert("File uploaded successfully!");
      console.log("File uploaded successfully:", data.Location);
    });
  };

  return (
   <div className="App">
    <header className="App-header">
      <p>
        Welcome to test page
      </p>
      <input type="file" onChange={handleFileInput} />
      <button onClick={handleUpload}>Upload to S3</button>
    </header>
  </div>
  );
};

export default S3Upload;