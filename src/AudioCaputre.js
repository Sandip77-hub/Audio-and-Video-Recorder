import { useState, useRef } from "react";

const mimeType = "audio/webm";

const AudioRecorder = () => {
	const [permission, setPermission] = useState(false);

	const mediaRecorder = useRef(null);

	const [recordingStatus, setRecordingStatus] = useState("inactive");

	const [stream, setStream] = useState(null);

	const [audio, setAudio] = useState(null);

	const [audioChunks, setAudioChunks] = useState([]);

	const getMicrophonePermission = async () => {
		if ("MediaRecorder" in window) {
			try {
				const mediaStream = await navigator.mediaDevices.getUserMedia({
					audio: true,
					video: false,
				});
				setPermission(true);
				setStream(mediaStream);
			} catch (err) {
				alert(err.message);
			}
		} else {
			alert("The MediaRecorder API is not supported in your browser.");
		}
	};

	const startRecording = async () => {
		setRecordingStatus("recording");
		const media = new MediaRecorder(stream, { type: mimeType });

		mediaRecorder.current = media;

		mediaRecorder.current.start();

		let localAudioChunks = [];

		mediaRecorder.current.ondataavailable = (event) => {
			if (typeof event.data === "undefined") return;
			if (event.data.size === 0) return;
			localAudioChunks.push(event.data);
		};

		setAudioChunks(localAudioChunks);
	};

	const stopRecording = async () => {
		setRecordingStatus("inactive");
		mediaRecorder.current.stop();
		if (stream) {
			stream.getTracks().forEach(track => track.stop());
		}
	
		mediaRecorder.current.onstop = async () => {
			const audioBlob = new Blob(audioChunks, { type: mimeType });
			const audioUrl=URL.createObjectURL(audioBlob);
			const formData = new FormData();
        formData.append('audio', audioBlob);

        try {
            const response = await fetch('your-backend-api-endpoint', {
                method: 'POST',
                body: formData,
            });
            // Handle response from the backend if needed
        } catch (error) {
            console.error('Error sending audio data to backend:', error);
        }
			setAudio(audioUrl);
	
			setAudioChunks([]);
		};
	};
	
	return (
		<div>
			<h2>Audio Recorder</h2>
			<main>
				<div className="audio-controls">
					{!permission ? (
						<button onClick={getMicrophonePermission} type="button">
							Get Microphone
						</button>
					) : null}
					{permission && recordingStatus === "inactive" ? (
						<button onClick={startRecording} type="button">
							Start Recording
						</button>
					) : null}
					{recordingStatus === "recording" ? (
						<button onClick={stopRecording} type="button">
							Stop Recording
						</button>
					) : null}
				</div>
				{audio ? (
					<div className="audio-player">
						<audio src={audio} controls></audio>
						<a download href={audio}>
							Download Recording
						</a>
					</div>
				) : null}
			</main>
		</div>
	);
};

export default AudioRecorder;