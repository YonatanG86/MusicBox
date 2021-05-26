import React, { useEffect } from 'react';
import Recording from './Recording';
import { useCont } from '../utilities/Context';

function SavedRecordings(props) {
	const { recordings, setRecordings } = useCont();
	useEffect(() => {}, [recordings]);

	return (
		<div className='component c-savedRecordings'>
			<div className='recordingHeader'>Recordings: {recordings.length}</div>
			<div className='panal'></div>
			{recordings.map((recording, index) => {
				return (
					<Recording
						name={recording.name}
						index={index}
						key={recording.name + index}
						song={recording.song}
						setRecordings={setRecordings}
					/>
				);
			})}
		</div>
	);
}

export default SavedRecordings;
