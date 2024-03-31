import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import axios from "axios";

function App() {
  const initalValue = {
    videoURL: "",
    isValidURL: true,
    isLoading: false,
    error: false,
    thumbnailURL: "",
    videoResponse: "",
    videoQuality: "",
    videoDownloadURL: "",
  };

  const [videoData, setVideoData] = useState(initalValue);

  const {
    videoURL,
    isValidURL,
    isLoading,
    error,
    thumbnailURL,
    videoResponse,
    videoQuality,
    videoDownloadURL,
  } = videoData;
  console.log("videoURL", videoURL);
  const handleReset = () => {
    setVideoData(initalValue);
  };
  const handleDownload = async () => {
    console.log("videoURL", videoURL);
    setVideoData({
      ...videoData,
      isLoading: true,
    });
    if (!isValidURL) {
      alert("Enter valid url.");
      return;
    }

    const options = {
      method: "GET",
      url: "https://social-media-video-downloader.p.rapidapi.com/smvd/get/all",
      params: {
        url: videoURL,
        filename: "Test video",
      },
      headers: {
        "X-RapidAPI-Key": "27df549828mshe3e52b918dea95bp1e7786jsn295e818f421d",
        "X-RapidAPI-Host": "social-media-video-downloader.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      const [{ quality, link }] = response.data.links;
      setVideoData({
        ...videoData,
        videoResponse: response?.data ?? null,
        thumbnailURL: response?.data?.picture ?? "",
        videoQuality: quality,
        videoDownloadURL: link,
        isLoading: false,
        error: false,
      });
    } catch (error) {
      console.error(error);
      setVideoData({
        ...videoData,
        error: true,
      });
    }
  };
  const handleChange = (e) => {
    console.log("videoURL", e.target.value);
    const url = e.target.value;
    const isvalidURL = urlPatternValidation(url);
    setVideoData({
      ...videoData,
      isValidURL: isvalidURL,
      videoURL: e.target.value,
    });
    if (!isvalidURL) {
      console.log("isvalidURL ", isvalidURL);
      return;
    }
  };
  const urlPatternValidation = (URL) => {
    const regex = new RegExp(
      "(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?"
    );
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
              <input
                type="url"
                className="input__class"
                value={videoURL}
                placeholder="add valid video url"
                onChange={(e) => handleChange(e)}
              />
              {!isValidURL ? (
                <div style={{ color: "#F61C04" }}>URL is not valid.</div>
              ) : (
                ""
              )}
            </Card.Text>
            <Button variant="primary" className="download-button" onClick={() => handleDownload()}>
              Download video
            </Button>
            <Button variant="primary" className="reset-button" onClick={() => handleReset()}>
              Reset
            </Button>
          </Card.Body>
          <Card.Footer className="text-muted"></Card.Footer>
        </Card>
        {isLoading ? <div>Loading...</div> : ""}
        {videoResponse && !error ? (
         <div className="video__display">
         <div className="overlay">
           <h3>{videoQuality}</h3>
           <a href={videoDownloadURL} target="_blank" rel="noopener noreferrer">
             Download
           </a>
         </div>
         <img
           src={thumbnailURL}
           alt=""
           srcSet=""
           className="image__display"
         />
       </div>
        ) : (
          ""
        )}
        {!isLoading && error ? <div>Something went worng</div> : ""}
      </div>
    </div>
  );
}

export default App;
