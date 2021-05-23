import Player from './components/player/Player';
import SongList from './components/songList/SongList';
import { ContextProvider } from './components/utilities/Context';

function App() {
	return (
		<div className='App'>
			<ContextProvider>
				<Player />
				<SongList />
			</ContextProvider>
		</div>
	);
}

export default App;
