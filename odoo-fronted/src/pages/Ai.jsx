import React, { useState, useRef } from 'react';

import axios from 'axios';



const CLOUDINARY_UPLOAD_PRESET = 'YOUR_UPLOAD_PRESET';

const CLOUDINARY_CLOUD_NAME = 'dusmxhunj';

const IDM_VTON_ENDPOINT = 'https://api.segmind.com/v1/idm-vton';

CLOUDINARY_CLOUD_NAME=dusmxhunj
CLOUDINARY_API_KEY=658277216316749
CLOUDINARY_API_SECRET=UIfE1cDhGLACqVVcNcEdGJA_W-k

const Trial = () => {

  const [humanImg, setHumanImg] = useState(null);

  const [garmImg, setGarmImg] = useState(null);

  const [humanPreview, setHumanPreview] = useState(null);

  const [garmPreview, setGarmPreview] = useState(null);

  const [outputUrl, setOutputUrl] = useState('');

  const [apiKey, setApiKey] = useState('');



  const humanInputRef = useRef(null);

  const garmInputRef = useRef(null);



  const apiKeys = [

    { id: '1', name: 'API Key 1', value: 'SG_8c09a3f411a9c983' },

    { id: '2', name: 'API Key 2', value: 'SG_f3c1ebec51b36293' },

  ];



  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);



  const handleFileChange = (type, e) => {

    const file = e.target.files[0];

    if (!file) return;



    if (type === 'human') {

      setHumanImg(file);

      setHumanPreview(URL.createObjectURL(file));

    } else {

      setGarmImg(file);

      setGarmPreview(URL.createObjectURL(file));

    }

  };



  const uploadToCloudinary = async (file) => {

    const formData = new FormData();

    formData.append('file', file);

    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    formData.append('cloud_name', CLOUDINARY_CLOUD_NAME);



    const response = await axios.post("https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload", formData);

    return response.data.secure_url;

  };



  const handleProcess = async () => {

    setError(null);

    if (!humanImg || !garmImg || !apiKey) {

      setError('All fields required.');

      return;

    }



    setLoading(true);



    try {

      const [humanUrl, garmUrl] = await Promise.all([

        uploadToCloudinary(humanImg),

        uploadToCloudinary(garmImg)

      ]);



      const response = await axios.post(

        IDM_VTON_ENDPOINT,

        { human_img: humanUrl, garm_img: garmUrl },

        {

          headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey },

          responseType: 'arraybuffer'

        }

      );



      const blob = new Blob([response.data], {

        type: response.headers['content-type'] || 'image/jpeg'

      });



      setOutputUrl(URL.createObjectURL(blob));

    } catch (err) {

      console.error(err);

      setError('Something went wrong while processing.');

    } finally {

      setLoading(false);

    }

  };



  return (

    <div style={{ padding: '20px', maxWidth: 800, margin: '0 auto' }}>

      <h2>Virtual Try-On</h2>



      <div style={{ marginBottom: 10 }}>

        <label>API Key:</label>

        <select value={apiKey} onChange={(e) => setApiKey(e.target.value)}>

          <option value="">Select API Key</option>

          {apiKeys.map((k) => (

            <option key={k.id} value={k.value}>{k.name}</option>

          ))}

        </select>

      </div>



      <div>

        <label>Upload Human Image:</label><br />

        <input type="file" accept="image/*" ref={humanInputRef} onChange={(e) => handleFileChange('human', e)} />

        {humanPreview && <img src={humanPreview} alt="Human" style={{ width: 200, marginTop: 10 }} />}

      </div>



      <div>

        <label>Upload Garment Image:</label><br />

        <input type="file" accept="image/*" ref={garmInputRef} onChange={(e) => handleFileChange('garment', e)} />

        {garmPreview && <img src={garmPreview} alt="Garment" style={{ width: 200, marginTop: 10 }} />}

      </div>



      <button onClick={handleProcess} disabled={loading} style={{ marginTop: 20 }}>

        {loading ? 'Processing...' : 'Try It On'}

      </button>



      {error && <p style={{ color: 'red' }}>{error}</p>}



      {outputUrl && (

        <div style={{ marginTop: 20 }}>

          <img src={outputUrl} alt="Result" style={{ width: '100%' }} />

          <a href={outputUrl} download style={{ display: 'block', marginTop: 10 }}>

            Download Result

          </a>

        </div>

      )}

    </div>

  );

};



export default Trial;