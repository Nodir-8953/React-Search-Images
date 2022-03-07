import React, {useState} from 'react';
import axios from 'axios';
import {SRLWrapper} from 'simple-react-lightbox';
import {LazyLoadImage} from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import './App.css';

function App() {
  const [image, setImage] = useState("");
  const [result, setResult] = useState([]);
  const ACCES_KEY = "1Z83DJJBHy9nbeL59-DUF409EH4Au7Y1OpATQkyJ0kQ";//Unsplash ACCES;

  const getValue = (event)=>{
    setImage(event.target.value);
  }
  const getImages = ()=>{
    const urlAPI = "https://api.unsplash.com/search/photos?page=1&query=" + image + "&client_id=" + ACCES_KEY;
    axios.get(urlAPI).then((response)=>{
      setResult(response.data.results);
      console.log(response)
    })
  }
  return (
    <SRLWrapper>
      <>
        <h1 className='title'>📸 React Image Search with Unsplash API</h1>
        <div className="formSection">
          <input 
            type="text" 
            name="image" 
            placeholder="Search images..."
            onChange={getValue} 
          />  
          <button 
            onClick={getImages} 
            type="submit"
          >
            Search            
          </button>
        </div>
        <div className="result">
          {result.map((image,id)=>(
            <div className="card" key={image.id}>
                <a>
                  <LazyLoadImage
                    className="resultImage"
                    src={image.urls.full}
                    effect="blur"
                    delayTime="300"
                  />
                  < p className="username">Photo by {image.user.name}📹</p>
                </a>
              </div>
            ))}   
        </div>
      </>
    </SRLWrapper>
  );
}

export default App;
