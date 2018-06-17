import React from "react";
import ReactDOM from "react-dom";
import queryString from "query-string";
import List from "./List.js";

const applyUpdateResult = (result, page) => ({
	hits: result,
	isLoading: false,
	page: page
});

let URL = `https://jsl.usedipper.com/api/v1/trucker/bookings/consigner_bookings/`;

class Infinite_Scroll extends React.Component {
	state = {
		hits: [],
		page: 1,
		isLoading: false,
		inputValue: "",
		onPressed: false,
		valueState: []
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
		const data = result.data.consigner_trips;
		if (data !== undefined) {
			const listResponse = Object.values(data);
			this.state.hits.push.apply(this.state.hits, listResponse);
		}
		this.setState(applyUpdateResult(this.state.hits, this.state.page + 1));
		console.log(`Hits are ${this.state.hits}`);
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
				valueState: [...this.state.hits]
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
				hits: [...this.state.valueState]
			});
		}
	}

	render() {
		return (
			<div className="page">
				<div className="interactions">
					<button type="button" onClick={this.onInitialSetup}>
						Show All
					</button>
				</div>
				<input type="text" onChange={evt => this.onUpdate(evt)} />

				{this.state.onPressed && (
					<List
						list={this.state.hits}
						page={this.state.page}
						onContinuedLoading={this.onContinuedLoading}
						isLoading={this.state.isLoading}
					/>
				)}
			</div>
		);
	}
}

ReactDOM.render(<Infinite_Scroll />, document.getElementById("root"));
