import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import axios from 'axios';

function App() {
   // const [videoURL, setVideoURL] = useState();
   // const [isValidURL, setIsValidURL] = useState(true);
   // const [isLoading, setIsLoading] = useState(false);
   // const [error, setError] = useState(false);
   // const [thumnailURL, setThumnailURL] = useState();
   // const [videoResponse, setVideoResponse] = useState();
   // const [videoQuality, setVideoQuality] = useState('');
   // const [videoDownloadURL, setVideoDownloadURL] = useState('');
   const initalValue = {
     videoURL: '',
     isValidURL: true,
     isLoading: false,
     error: false,
     thumbnailURL: '',
     videoResponse: '',
     videoQuality: '',
     videoDownloadURL: ''
   };

   const [videoData, setVideoData] = useState(initalValue);
   
   // Destructuring state for easier access
   const {
     videoURL,
     isValidURL,
     isLoading,
     error,
     thumbnailURL,
     videoResponse,
     videoQuality,
     videoDownloadURL
   } = videoData;
   console.log("videoURL", videoURL);
   const handleReset = () => {
     setVideoData(initalValue);
   };
   const handleDownload = async ()=>{
    console.log("videoURL", videoURL);
    // setIsLoading(true);
    setVideoData({
      ...videoData,
      isLoading: true,
    });
    if(!isValidURL){
        alert('Enter valid url.');
        return;
    }

    // const options = {
    //   // method: 'GET',
    //   // url: 'https://instagram-reels-downloader2.p.rapidapi.com/.netlify/functions/api/getLink',
    //   // params: {
    //   //   url: videoURL,
    //   //   filename: 'download',
    //   // },
    //   // headers: {
    //   //   'X-RapidAPI-Key': '591e378c89msh29d206ab36ab114p19d74djsn91f6c071bd37',
    //   //   'X-RapidAPI-Host': 'instagram-reels-downloader2.p.rapidapi.com'
    //   // }

    //   // const options = {
    //     method: 'GET',
    //     url: 'https://social-media-video-downloader.p.rapidapi.com/smvd/get/all',
    //     params: {
    //       url: videoURL,
    //       filename: 'download'
    //     },
    //     headers: {
    //       'X-RapidAPI-Key': '591e378c89msh29d206ab36ab114p19d74djsn91f6c071bd37',
    //       'X-RapidAPI-Host': 'social-media-video-downloader.p.rapidapi.com'
    //     }
    //   // };
  
    // };

    const options = {
      method: 'GET',
      url: 'https://social-media-video-downloader.p.rapidapi.com/smvd/get/all',
      params: {
        url: videoURL,
        filename: 'Test video'
      },
      headers: {
        'X-RapidAPI-Key': '27df549828mshe3e52b918dea95bp1e7786jsn295e818f421d',
        'X-RapidAPI-Host': 'social-media-video-downloader.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      // setVideoResponse(response?.data ?? null);
      // setThumnailURL(response?.data?.picture ?? '');
      console.log(response.data);
      const [{ quality, link }] = response.data.links;
      // setVideoQuality(quality);
      // setVideoDownloadURL(link);
      setVideoData({
         ...videoData, videoResponse: response?.data ?? null, 
        thumbnailURL: response?.data?.picture ?? '', 
        videoQuality: quality,
        videoDownloadURL: link,
        isLoading: false,
        error: false,
      });
      // setIsLoading(false);
      // setError(false);
    } catch (error) {
      console.error(error);
      // setError(true);
       setVideoData({
        ...videoData,
        error: true,
      });
    }
   }
   const handleChange =(e)=>{
    console.log("videoURL", e.target.value);
    const url = e.target.value;
    const isvalidURL= urlPatternValidation(url);
    // setIsValidURL(isvalidURL);
    // setVideoURL(e.target.value);
    setVideoData({
      ...videoData,
      isValidURL: isvalidURL,
      videoURL: e.target.value,
    });
    if(!isvalidURL){
      console.log("isvalidURL ",isvalidURL);
      return;
    }
   
   }
   const urlPatternValidation = URL => {
    const regex = new RegExp('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?');    
    return regex.test(URL);
  };
  return (
    <div className="App">
    <div className="home">
    <Card className="text-center card-bg">
      <Card.Header>Download video</Card.Header>
      <Card.Body>
        <Card.Title>Input social video url</Card.Title>
        <Card.Text>
        <Form>
      {/* <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Control type="url" value={videoURL} placeholder='add valid video url' onChange={(e)=>handleChange(e)}/>
      </Form.Group> */}
      
      {/* <Button variant="primary" type="submit" full>
        Download video
      </Button> */}
      
    </Form>
    <label></label>
    <input type='url' className='input__class' value={videoURL} placeholder='add valid video url' onChange={(e)=>handleChange(e)}/>
    {!isValidURL ? (
            <div style={{ color: "#F61C04" }}>URL is not valid.</div>
          ):""}
        </Card.Text>
        <Button variant="primary" onClick={()=>handleDownload()}>Download video</Button>
        <Button variant="primary" onClick={()=>handleReset()}>Reset</Button>
      </Card.Body>
      <Card.Footer className="text-muted"></Card.Footer>
    </Card>
    {isLoading ? <div>Loading...</div>: ''}
    {videoResponse && !error ? <div className='video__display'>
      <img src={thumbnailURL} alt="" srcset="" className='image__display'/>
      <h3>{videoQuality}</h3>
      <a href={videoDownloadURL} target="blank" rel="noreferer" >Download</a>
    </div>:''}
    {error ? <div>Something went worng</div>: ''}
    </div>
    </div>
  );
}

export default App;
