import React, { useState, useRef, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faTrashAlt, faRedoAlt } from '@fortawesome/free-solid-svg-icons';

import { useCont } from '../utilities/Context';

function Recording(props) {
	const audioElement = useRef(null);
	const { removeRecording } = useCont();
	const [isPlaying, setIsPlaying] = useState(false);
	const [isLoop, setIsLoop] = useState(false);

	useEffect(() => {
		if (isPlaying) {
			audioElement.current.play();
		} else {
			audioElement.current.pause();
		}
	}, [isPlaying]);

	const playPause = () => {
		setIsPlaying(() => !isPlaying);
	};
	const playRecordingInLoop = () => {
		setIsLoop(() => !isLoop);
		audioElement.current.loop = isLoop;
	};

	const repeat = () => {
		setIsPlaying(() => !isPlaying);
	};

	const btn_clicked = (state) => {
		return state ? 'red' : '';
	};

	return (
		<div className='c-recording'>
			{props.name}
			<div>
				<audio src={props.song} ref={audioElement} onEnded={repeat}></audio>
				<button className={'recording-btn left-btn ' + btn_clicked(isPlaying)} onClick={playPause}>
					<FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
				</button>
				<button className={'recording-btn mid-btn  ' + btn_clicked(isLoop)} onClick={playRecordingInLoop}>
					<FontAwesomeIcon icon={faRedoAlt} />
				</button>
				<button className='recording-btn right-btn ' onClick={() => removeRecording(props.index)}>
					<FontAwesomeIcon icon={faTrashAlt} />
				</button>
			</div>
		</div>
	);
}

export default Recording;
