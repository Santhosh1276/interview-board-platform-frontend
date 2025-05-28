import React, { useState } from "react";
// import axios from "axios";
import { imageToURl } from "../api/add_images_bucket"
const ImageUploader = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select an image");

    const formData = new FormData();
    formData.append("file", file);

    try {
      // const res = await axios.post(
      //   "https://add-images-bucket.onrender.com/upload",
      //   formData,
      //   {
      //     headers: {
      //       "Content-Type": "multipart/form-data",
      //     },
      //   }
      // );
      const res = await imageToURl(formData);
      setImageUrl(res.data.url);
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>

      {imageUrl && (
        <div style={{ marginTop: 20 }}>
          <p>Uploaded Image:</p>
          <img src={imageUrl} alt="Uploaded" width={200} />
       
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
