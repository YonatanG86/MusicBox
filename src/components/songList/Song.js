import React, { useState, useRef } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';

function Song(props) {
	const [isPlaying, setIsPlaying] = useState(false);
	const audioElement = useRef(null);

	const playPause = () => {
		setIsPlaying(() => !isPlaying);
		props.playPause(props.id);
	};

	const btn_shake = (state) => {
		return state ? 'shake' : '';
	};
	return (
		<div className='c-song'>
			<div className='c-song-name' id={props.id}>
				<audio src={props.song.src} ref={audioElement} type='audio/mpeg'></audio>
				<div className='songName'>{props.song.title}</div>
			</div>
			<button className={'play-btn ' + btn_shake(isPlaying)} onClick={playPause}>
				<FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
			</button>
		</div>
	);
}

export default Song;
