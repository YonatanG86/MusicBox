import React, { useState, useRef, useEffect } from 'react';
import PlayerDetails from './PlayerDetails';
import PlayerControls from './PlayerControls';
import { useCont } from '../utilities/Context';

function Player(props) {
	const { songs, setCurrentSongIndex, currentSongIndex, nextSongIndex } = useCont();
	const audioElement = useRef(null);
	const [isPlaying, setIsPlaying] = useState(false);

	useEffect(() => {
		if (isPlaying) {
			audioElement.current.play();
		} else {
			audioElement.current.pause();
		}
	});

	const SkipSong = (forwards = true) => {
		if (forwards) {
			setCurrentSongIndex(() => {
				let temp = currentSongIndex;
				temp++;

				if (temp > songs.length - 1) {
					temp = 0;
				}

				return temp;
			});
		} else {
			props.setCurrentSongIndex(() => {
				let temp = currentSongIndex;
				temp--;

				if (temp < 0) {
					temp = songs.length - 1;
				}

				return temp;
			});
		}
	};

	return (
		<div className='c-player'>
			<audio src={songs[currentSongIndex].src} ref={audioElement} onEnded={SkipSong}></audio>
			<h4>Playing now</h4>
			<PlayerDetails song={songs[currentSongIndex]} />
			<PlayerControls isPlaying={isPlaying} setIsPlaying={setIsPlaying} SkipSong={SkipSong} />
			<p>
				<strong>Next up: </strong>
				{songs[nextSongIndex].title}
			</p>
		</div>
	);
}

export default Player;
