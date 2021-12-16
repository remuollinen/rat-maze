import React, { Component } from "react";
import Cell from "./Cell";
import { Grid, Paper, Box } from "@material-ui/core";
import rat from "../../src/rat.svg";
import cheese from "../../src/cheese.svg";

class Path extends Component {
	pathIdx = 0;
	foundPath = [];

	createFoundPath = () => {
		for (let i = 0; i < 16; i++) {
			this.foundPath.push(0);
		}
		for (let j = 0; j < 16; j++) {
			if (this.props.maze[j] === 0) {
				this.foundPath[j] = 2;
			}
		}

		for (let k = 0; k < this.props.currentPath.length; k++) {
			let x = this.props.currentPath[k][0];
			let y = this.props.currentPath[k][1];

			this.foundPath[4 * x + y] = 1;
		}
	};

	findColor = () => {
		this.pathIdx++;
		let result = this.foundPath[this.pathIdx];
		if (result === 2) {
			result = 0;
		} else if (result === 0) {
			result = 2;
		}
		if (this.pathIdx === 14) {
			this.pathIdx = 0;
		}
		return result;
	};
	// loop for 16
	// this.foundPath.push(0)
	// loop for j with value 16
	// if this.props.maze[j] == 0
	// this.foundPath[j] == 2
	// loop to the currentPath

	render() {
		this.createFoundPath();
		return (
			<span className="path">
				<br></br>
				<Grid
					container
					spacing={2}
					justifyContent="center"
					direction="column"
				></Grid>
				<Grid container spacing={1} justifyContent="center" direction="row">
					<Grid item>
						<Paper style={{ background: "#4CAF50" }} elevation={3}>
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
					<Cell N={this.findColor()}></Cell>
					<Cell N={this.findColor()}></Cell>
					<Cell N={this.findColor()}></Cell>
				</Grid>
				<Grid container spacing={1} justifyContent="center" direction="row">
					<Cell N={this.findColor()}></Cell>
					<Cell N={this.findColor()}></Cell>
					<Cell N={this.findColor()}></Cell>
					<Cell N={this.findColor()}></Cell>
				</Grid>
				<Grid container spacing={1} justifyContent="center" direction="row">
					<Cell N={this.findColor()}></Cell>
					<Cell N={this.findColor()}></Cell>
					<Cell N={this.findColor()}></Cell>
					<Cell N={this.findColor()}></Cell>
				</Grid>
				<Grid container spacing={1} justifyContent="center" direction="row">
					<Cell N={this.findColor()}></Cell>
					<Cell N={this.findColor()}></Cell>
					<Cell N={this.findColor()}></Cell>
					<Grid item>
						<Paper style={{ background: "#4CAF50" }} elevation={3}>
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
			</span>
		);
	}
}

export default Path;
