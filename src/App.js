import "./App.css";
import Maze from "./components/Maze";

function App() {
	return (
		<div className="App">
			<h1>Rat in a Maze</h1>
			<p>
				<small>
					&copy;{" "}
					<a
						href="http://github.com/remuollinen"
						target="_blank"
						rel="noreferrer"
					>
						Remu Ollinen
					</a>{" "}
					2021
				</small>
			</p>
			<p>
				Help the rat find the cheese! Scroll down to see how the rat can reach
				the cheese.
			</p>
			<br></br>
			<Maze />
		</div>
	);
}

export default App;
