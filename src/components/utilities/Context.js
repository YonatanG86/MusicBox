import React, { useState, useContext, useEffect } from 'react';
import musicFiles from './MusicFiles';

const Context = React.createContext();

export function useCont() {
	return useContext(Context);
}

export function ContextProvider({ children }) {
	const [songs, setSongs] = useState(musicFiles);
	const [songsPlaying, setSongsPlaying] = useState([false, false, false, false, false, false, false, false, false]);
	const [songsWaiting, setSongsWaiting] = useState([false, false, false, false, false, false, false, false, false]);
	const [recordings, setRecordings] = useState([]);

	useEffect(() => {
		loadFromLocalStorage();
	}, []);

	const updateSongList = (index, state, change) => {
		let arr = state;
		arr[index] = change;
		if ((state = songsPlaying)) {
			setSongsPlaying(arr);
		} else {
			setSongsWaiting(arr);
		}
	};

	const checkIfOneInSongList = (state) => {
		return !state.every((song) => song === false);
	};
	const removeRecording = (index) => {
		const arr = recordings;
		arr.splice(index, 1);
		setRecordings(arr);
		saveLocalStorage();
	};

	const saveLocalStorage = () => {
		localStorage.setItem('userRecordings', JSON.stringify(recordings));
		console.log('saving');
		loadFromLocalStorage();
	};

	const loadFromLocalStorage = () => {
		const userRecordings = JSON.parse(localStorage.getItem('userRecordings'));
		if (userRecordings) {
			setRecordings(userRecordings);
		}
	};

	const value = {
		songs,
		setSongs,
		songsPlaying,
		setSongsPlaying,
		updateSongList,
		checkIfOneInSongList,
		songsWaiting,
		setSongsWaiting,
		recordings,
		setRecordings,
		removeRecording,
		saveLocalStorage,
		loadFromLocalStorage,
	};
	return <Context.Provider value={value}>{children}</Context.Provider>;
}
