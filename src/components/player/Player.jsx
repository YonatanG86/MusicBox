import React, { useState, useCallback } from 'react';
import useRecorder from 'react-hook-recorder';
import SavedRecordings from '../savedRecordings/SavedRecordings';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophoneAlt, faPause, faSave } from '@fortawesome/free-solid-svg-icons';

import { useCont } from '../utilities/Context';

function Player() {
	const [url, setUrl] = useState('');
	const [message, setMessage] = useState('');
	const onStop = useCallback((blob, blobUrl) => {
		setUrl(blobUrl);
	}, []);
	const { startRecording, stopRecording, register, status } = useRecorder();
	const { recordings, saveLocalStorage, setRecordings } = useCont();

	const saveBlob = () => {
		const timeStamp = new Date().toUTCString();
		let name = prompt('Please enter a name:', new Date().toUTCString());
		if (name === null || name === '') {
			setMessage('The file was not saved');
		} else {
			if (url) {
				const newSave = { name: name, song: url };
				const arr = recordings;
				arr.push(newSave);
				setRecordings(arr);
				saveLocalStorage();
				setMessage(name + ' was saved!');
			}
		}
	};

	const btn_clicked = (state) => {
		return state ? 'red' : '';
	};

	return (
		<>
			<div className='component c-recorder'>
				<audio ref={register} autoPlay muted playsInline />
				{url && <audio className='c-recorder-audio' controls src={url} />}
				{status !== 'init' && (
					<div className='player-controls'>
						<button
							className={'player-btn left-btn ' + btn_clicked(status === 'recording')}
							onClick={startRecording}
							disabled={status === 'recording'}
						>
							<FontAwesomeIcon icon={faMicrophoneAlt} />
						</button>
						<button
							className='player-btn mid-btn'
							onClick={stopRecording(onStop)}
							disabled={status !== 'recording'}
						>
							<FontAwesomeIcon icon={faPause} />
						</button>
						<button className='player-btn right-btn' onClick={saveBlob}>
							<FontAwesomeIcon icon={faSave} />
						</button>
					</div>
				)}
				<div className='alert'>{message}</div>
			</div>
			<SavedRecordings />
		</>
	);
}

export default Player;
