import React from "react";
import ReactDOM from "react-dom";
import queryString from "query-string";
import Trips from "./List.js";

let URL = `https://jsl.usedipper.com/api/v1/consigner/eta?is_active=true`;

class Infinite_Scroll extends React.Component {
	state = {
		trips: [],
		gps: {},
		percentageDistanceCovered: {},
		page: 1,
		isLoading: false,
		inputValue: "",
		onPressed: false,
		currentState: []
	};

	fetchStories = () => {
		console.log(`Fetching  ${this.state.isLoading}`);
		this.setState({ isLoading: true });
		fetch(URL, {
			headers: {
				Authorization:
					"eyJ0eXAiOiJKV1QiLCJhbGciOiJub25lIn0.eyJ1c2VyX2lkIjozNjMsIm5hbWUiOiJCaHVwZW4iLCJlbWFpbCI6ImxvZ2lzdGljc0BleGltbG9naXN0aWNzLmluIn0"
			}
		})
			.then(response => response.json())
			.then(result => {
				this.onSetResult(result);
			});
	};

	onSetResult = result => {
		const tripsValues = Object.values(result.trips);
		if (tripsValues) {
			this.setState({
				trips: [...this.state.trips, ...tripsValues],
				gps:  {...this.state.gps, 	...result.gps},
				percentageDistanceCovered: { ...result.percentageDistanceCovered, ...this.state.percentageDistanceCovered},
				isLoading: false,
				page: this.state.page + 1
			});
		}
	};

	onContinuedLoading = e => {
		const para = queryString.parseUrl(URL);
		para.query.page_number = this.state.page;
		let stringify = queryString.stringify(para.query);
		URL = para.url + "?" + stringify;
		this.fetchStories();
	};

	onInitialSetup = e => {
		const para = queryString.parseUrl(URL);
		para.query.page_number = 1;
		let stringify = queryString.stringify(para.query);
		URL = para.url + "?" + stringify;
		this.fetchStories();
		this.setState({
			onPressed: true
		});
	};

	onUpdate(evt) {
		this.setState({
			inputValue: evt.target.value
		});

		if (this.state.inputValue.length === 2) {
			this.setState({
				currentState: [...this.state.trips]
			});
		}
		if (this.state.inputValue.length > 2) {
			const para = queryString.parseUrl(URL);
			para.query.search = this.state.inputValue;
			para.query.page_number = 1;
			let stringify = queryString.stringify(para.query);
			URL = para.url + "?" + stringify;
			this.fetchStories();
		} else {
			this.setState({
				trips: [...this.state.currentState]
			});
		}
	}

	render() {
		const {
			trips,
			gps,
			percentageDistanceCovered,
			isLoading,
			page
		} = this.state;
		console.log(gps);
		return (
			<div className="page">
				<div className="interactions">
					<button type="button" onClick={this.onInitialSetup}>
						Show All
					</button>
				</div>
				<input type="text" onChange={evt => this.onUpdate(evt)} />

				{this.state.onPressed && (
					<Trips
						trips={trips}
						gps={gps}
						percentageDistanceCovered={percentageDistanceCovered}
						page={page}
						onContinuedLoading={this.onContinuedLoading}
						isLoading={isLoading}
					/>
				)}
			</div>
		);
	}
}

ReactDOM.render(<Infinite_Scroll />, document.getElementById("root"));
