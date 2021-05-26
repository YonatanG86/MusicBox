import Player from './components/player/Player.jsx';
import SongList from './components/songList/SongList';
import { ContextProvider } from './components/utilities/Context';

function App() {
	return (
		<div className='App'>
			<ContextProvider>
				<SongList />
				<Player />
			</ContextProvider>
		</div>
	);
}

export default App;
