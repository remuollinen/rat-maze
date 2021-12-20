import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Button, Grid, Paper, Box } from "@material-ui/core";
import Cell from "./Cell";
import Path from "./Path";
import rat from "../../src/rat.svg";
import cheese from "../../src/cheese.svg";

export default class Maze extends Component {
	matrix = [2];
	paths = [];
	idx = 0;
	numPaths = 0;
	pathIdx = 0;

	index = () => {
		this.idx += 1;
		return this.matrix[this.idx];
	};

	handleClick = (e) => {
		e.preventDefault();
		window.location.reload(false);
	};

	findColor = (path) => {
		this.pathIdx++;
		let result = path[this.pathIdx];
		if (this.pathIdx === 14) {
			this.pathIdx = 0;
		}
		return result;
	};

	generateMatrix = () => {
		for (let i = 0; i < 14; i++) {
			let val = Math.floor(Math.random() * 4);
			if (val === 0) {
				this.matrix.push(0);
			} else {
				this.matrix.push(2);
			}
		}
		this.matrix.push(2);
	};

	inMaze = (x, y, visited) => {
		return (
			x >= 0 &&
			x < 4 &&
			y >= 0 &&
			y < 4 &&
			this.matrix[x * 4 + y] > 0 &&
			visited[x * 4 + y] === 0
		);
	};

	calculatePaths = () => {
		let visited = [];
		for (let i = 0; i < 16; i++) {
			visited[i] = 0;
		}
		this.mazeUtil(visited, 0, 0, []);
		return this.paths;
	};

	mazeUtil = (visited, x, y, currentPath) => {
		if (x === 3 && y === 3) {
			this.numPaths++;
			this.paths.push([...currentPath]);
			visited[15] = 0;
			return;
		}
		if (!this.inMaze(x, y, visited)) {
			return;
		}
		visited[4 * x + y] = 1;

		currentPath.push([x + 1, y]);
		this.mazeUtil(visited, x + 1, y, currentPath);
		currentPath.pop();

		currentPath.push([x, y + 1]);
		this.mazeUtil(visited, x, y + 1, currentPath);
		currentPath.pop();

		visited[4 * x + y] = 0;
		return;
	};

	getNumPaths = () => {
		return (
			<div style={{ color: "black", marginBottom: "2rem" }}>
				<center>
					<b>Total Paths = {this.numPaths}</b>
				</center>
			</div>
		);
	};

	findPaths = () => {
		const displayNumPaths = <this.getNumPaths></this.getNumPaths>;
		ReactDOM.render(displayNumPaths, document.getElementById("count"));
		let grids = document.getElementById("routes");

		for (let i = 0; i < this.paths.length; i++) {
			const solution = (
				<Path currentPath={this.paths[i]} maze={this.matrix}></Path>
			);
			const id = Math.random();
			const d = document.createElement("span");
			d.id = id;
			const space = document.createElement("div");
			space.classList.add("break");
			grids.appendChild(d);
			grids.appendChild(space);
			ReactDOM.render(solution, document.getElementById(id));
		}
	};

	render() {
		this.matrix = new Array([]);
		this.matrix = [2];
		this.generateMatrix();
		this.calculatePaths();

		return (
			<div className="maze">
				<Grid
					container
					spacing={2}
					justifyContent="center"
					direction="column"
				></Grid>

				<Grid container spacing={1} justifyContent="center" direction="row">
					<Grid item>
						<Paper elevation={3}>
							<Box padding={2} height={50} width={50}>
								<img
									src={rat}
									alt="cheese"
									height={50}
									width={50}
									vertical-align="middle"
								/>
							</Box>
						</Paper>
					</Grid>
					<Cell N={this.index()} />
					<Cell N={this.index()} />
					<Cell N={this.index()} />
				</Grid>

				<Grid container spacing={1} justifyContent="center" direction="row">
					<Cell N={this.index()} />
					<Cell N={this.index()} />
					<Cell N={this.index()} />
					<Cell N={this.index()} />
				</Grid>

				<Grid container spacing={1} justifyContent="center" direction="row">
					<Cell N={this.index()} />
					<Cell N={this.index()} />
					<Cell N={this.index()} />
					<Cell N={this.index()} />
				</Grid>

				<Grid container spacing={1} justifyContent="center" direction="row">
					<Cell N={this.index()} />
					<Cell N={this.index()} />
					<Cell N={this.index()} />
					<Grid item>
						<Paper elevation={3}>
							<Box padding={2} height={50} width={50}>
								<img
									src={cheese}
									alt="cheese"
									height={50}
									width={50}
									vertical-align="middle"
								/>
							</Box>
						</Paper>
					</Grid>
				</Grid>

				<Button
					onClick={this.handleClick}
					style={{ margin: "1rem", backgroundColor: "lightgrey" }}
				>
					Generate new maze
				</Button>
				<Button
					onClick={this.findPaths}
					style={{ margin: "1rem", backgroundColor: "#80ed99" }}
				>
					Find the cheese
				</Button>
			</div>
		);
	}
}
