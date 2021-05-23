import React from 'react';
import { useCont } from '../utilities/Context';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleLeft, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

function Song(props) {
	const { changeSongIndex, removeSong } = useCont();
	return (
		<div className='c-song' id={props.index}>
			<button className='move-btn' onClick={(e) => changeSongIndex(e, props.song.title, -1)}>
				<FontAwesomeIcon icon={faAngleLeft} />
			</button>
			<div className='songName'>{props.song.title}</div>
			<button className='move-btn' onClick={(e) => changeSongIndex(e, props.song.title, 1)}>
				<FontAwesomeIcon icon={faAngleRight} />
			</button>
			<button className='move-btn' onClick={(e) => removeSong(e, props.index)}>
				<FontAwesomeIcon icon={faTrashAlt} />
			</button>
		</div>
	);
}

export default Song;
