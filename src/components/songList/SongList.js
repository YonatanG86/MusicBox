import React, { useEffect } from 'react';
import Song from './Song';
import { useCont } from '../utilities/Context';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHistory, faArrowUp, faSave } from '@fortawesome/free-solid-svg-icons';

function SongList() {
	const { saveLists, resetSongsList, setSongs, saveLocalStorage } = useCont();

	useEffect(() => {}, [saveLists]);

	return (
		<div className='c-songlist'>
			<div className='panal'>
				<button className='panal-btn' onClick={(e) => resetSongsList(e)}>
					<FontAwesomeIcon icon={faHistory} />
				</button>
				<button className='panal-btn' onClick={() => setSongs(saveLists)}>
					<FontAwesomeIcon icon={faArrowUp} />
				</button>
				<button className='panal-btn' onClick={(e) => saveLocalStorage(e)}>
					<FontAwesomeIcon icon={faSave} />
				</button>
			</div>
			{saveLists.map((song, index) => {
				return <Song song={song} id={index} />;
			})}
		</div>
	);
}

export default SongList;
