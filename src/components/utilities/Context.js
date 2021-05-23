import React, { useState, useContext, useEffect } from 'react';

const Context = React.createContext();

export function useCont() {
	return useContext(Context);
}

const MUSIC = [
	{ title: 'Stutter Breakbeats', src: '/music/120stutterbreakbeats16.mp3' },
	{ title: 'Futur Funk', src: '/music/120futurefunkbeats25.mp3' },
	{ title: 'Bass Warwick', src: '/music/BassWarwickheavyfunkgrooveonE120BPM.mp3' },
	{ title: 'Electric Guitar', src: '/music/electricguitarcoutryslide120bpmB.mp3' },
	{ title: 'Stompy Slosh', src: '/music/FUD120StompySlosh.mp3' },
	{ title: 'Groove 1', src: '/music/GrooveB120bpmTanggu.mp3' },
	{ title: 'Maze Politics', src: '/music/MazePolitics120Perc.mp3' },
	{ title: 'Groove 2', src: '/music/PAS3GROOVE1.03B.mp3' },
	{ title: 'Organ Synth', src: '/music/SilentStar120EmOrganSynth.mp3' },
];

export function ContextProvider({ children }) {
	const [songs, setSongs] = useState(MUSIC);
	const [currentSongIndex, setCurrentSongIndex] = useState(0);
	const [nextSongIndex, setNextSongIndex] = useState(0);
	const [saveLists, setSaveLists] = useState(MUSIC);

	useEffect(() => {
		setNextSongIndex(() => {
			if (currentSongIndex + 1 > songs.length - 1) {
				return 0;
			} else {
				return currentSongIndex + 1;
			}
		});
	}, [currentSongIndex, songs.length]);

	useEffect(() => {
		const userSongsList = JSON.parse(localStorage.getItem('userSongsList'));
		if (userSongsList) {
			setSongs(userSongsList);
			setSaveLists(userSongsList);
		} else {
			setSongs(MUSIC);
			setSaveLists(MUSIC);
		}
	}, []);

	const saveLocalStorage = (e) => {
		e.preventDefault();
		localStorage.setItem('userSongsList', JSON.stringify(saveLists));
	};

	const resetSongsList = (e) => {
		e.preventDefault();
		setSaveLists(MUSIC);
	};
	const removeSong = (e, indexForDelete) => {
		e.preventDefault();
		const arr = saveLists.filter((item, index) => index !== indexForDelete);
		setSaveLists(arr);
	};

	const changeSongIndex = (e, title, position) => {
		e.preventDefault();
		const old_index = saveLists.findIndex((song) => song.title === title);
		const new_index = old_index + position;

		if (new_index >= 0 && new_index <= songs.length - 1) {
			const song = saveLists.filter((item, index) => index === old_index)[0];
			const arr = saveLists.filter((item, index) => index !== old_index);
			arr.splice(new_index, 0, song);
			setSaveLists(arr);
		}
	};

	const value = {
		songs,
		setSongs,
		currentSongIndex,
		setCurrentSongIndex,
		nextSongIndex,
		saveLists,
		changeSongIndex,
		removeSong,
		resetSongsList,
		saveLocalStorage,
	};
	return <Context.Provider value={value}>{children}</Context.Provider>;
}
