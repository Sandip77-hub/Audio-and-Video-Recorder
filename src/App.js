import "./App.css";
import { useState } from "react";
import VideoCapture from "./VideoCapture";
import AudioCapture from "./AudioCaputre";
import ShowResult from "./ShowResult";

const App = () => {
	let [recordOption, setRecordOption] = useState("video");

	const toggleRecordOption = (type) => {
		return () => {
			setRecordOption(type);
		};
	};

	return (
		<div>
			<h1>Wildlife Survillance</h1>
			<div className="button-flex">
				<button onClick={toggleRecordOption("video")}>Record Video</button>
				<button onClick={toggleRecordOption("audio")}>Record Audio</button>
			</div>
			<div>
				{recordOption === "video" ? <VideoCapture/> : <AudioCapture />}
				
			</div>
			<ShowResult/>
		</div>
	);
};

export default App;