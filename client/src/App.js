import React, { useState } from 'react';
import axios from 'axios';

function App() {

  const [data, setData] = useState({
    name: '',
    number: ''
  });
  const [image, setImage] = useState('');

  const onChange = e => {
    const { name, value } = e.target;

    setData(prevData => {
      return {
        ...prevData,
        [name]: value
      }
    });
  };

  const onChangeImage = e => {
    setImage(e.target.files[0]);
  }

  const onSubmit = async e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('image', image);
    formData.append('name', data.name);
    formData.append('number', data.number);

    try {
      const res = await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      });

      const { fileName, name, number } = res.data;

      console.log(fileName);
      console.log(number);
      console.log(name);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" name="name" onChange={onChange} />
        <input type="text" name="number" onChange={onChange} />
        <input type="file" name="image" onChange={onChangeImage} />
        <input
          type='submit'
          value='Upload'
        />
      </form>

    </div>
  );
}

export default App;
