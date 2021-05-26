import React, { useState, useEffect } from 'react';
import Song from './Song';
import { useCont } from '../utilities/Context';

function SongList() {
	const [timer, setTimer] = useState(0);
	const { songs, updateSongList, checkIfOneInSongList, songsPlaying, songsWaiting } = useCont();

	useEffect(() => {
		if (timer === 8) {
			var repetition = setInterval(() => repeat(), 8000);
		}
		return () => {
			clearTimeout(repetition);
		};
	}, [timer]);

	const playPause = (index) => {
		const checkIfOnePlaying = checkIfOneInSongList(songsPlaying);
		const checkIfOneWaiting = checkIfOneInSongList(songsWaiting);
		console.log('is something playing', checkIfOnePlaying);
		if (!checkIfOnePlaying) {
			updateSongList(index, songsPlaying, true);
			songs[index].loop = true;
			songs[index].play();
			setTimer(8);
		} else {
			console.log('else', !songsPlaying[index]);
			if (!songsPlaying[index]) {
				console.log(index, 'waiting');
				songs[index].loop = true;
				updateSongList(index, songsWaiting, true);
			} else {
				updateSongList(index, songsWaiting, false);
				updateSongList(index, songsPlaying, false);
				songs[index].loop = false;
				songs[index].pause();
			}
		}
		if (checkIfOnePlaying && checkIfOneWaiting) {
			console.log('timer to 0', checkIfOnePlaying, checkIfOneWaiting);
			setTimer(0);
		}
	};

	const repeat = () => {
		for (let index = 0; index < songsWaiting.length; index++) {
			if (songsWaiting[index]) {
				console.log('repeat -', index);
				songs[index].play();
				updateSongList(index, songsWaiting, false);
				updateSongList(index, songsPlaying, true);
			}
		}
	};

	return (
		<>
			<div className='component c-songlist'>
				<div className='panal'></div>
				{songs.map((song, index) => {
					return <Song song={song} id={index} key={index} playPause={playPause} />;
				})}
			</div>
		</>
	);
}

export default SongList;
