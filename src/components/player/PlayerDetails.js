import React from 'react';

function PlayerDetails(props) {
	return (
		<div className='c-player--details'>
			{/* <div className='details-loop'>
				<div className='details-img'>dddd</div>
			</div> */}
			<h3 className='details-title'>{props.song.title}</h3>
		</div>
	);
}

export default PlayerDetails;
