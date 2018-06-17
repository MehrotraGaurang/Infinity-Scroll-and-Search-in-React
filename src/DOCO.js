import React from "react";
import ReactDOM from "react-dom";

const applyUpdateResult = (result, page) => ({
	hits: result,
	isLoading: false,
	page: page
});

const URL = page =>
	`https://jsonplaceholder.typicode.com/users?page=${page}&per_page=100`;

class Infinite_Scroll extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			hits: [],
			page: null,
			isLoading: false
		};
	}

	fetchStories = page => {
		console.log(`Fetching ${page} ${this.state.isLoading}`);
		this.setState({ isLoading: true });
		fetch(URL(page))
			.then(response => response.json())
			.then(result => {
				console.log(result);
				return this.onSetResult(result, page);
			});
	};

	onSetResult = (result, page) => {
		result.push.apply(result, this.state.hits);
		console.log(result);
		this.setState(applyUpdateResult(result, page));
		console.log(`Hits are ${this.state.hits}`);
	};

	onPaginatedSearch = e => this.fetchStories(this.state.page + 1);

	onInitialSearch = e => this.fetchStories(0);

	render() {
		return (
			<div className="page">
				<div className="interactions">
					<button type="button" onClick={this.onInitialSearch}>
						Show
					</button>
				</div>

				<List
					list={this.state.hits}
					page={this.state.page}
					onPaginatedSearch={this.onPaginatedSearch}
					isLoading={this.state.isLoading}
				/>
			</div>
		);
	}
}

class List extends React.Component {
	

		state = {
			onEnlarge: false,
			element: ""
		};
	

	componentDidMount() {
		window.addEventListener("scroll", this.onScroll, false);
	}

	componentWillUnmount() {
		window.removeEventListener("scroll", this.onScroll, false);
	}

	onScroll = () => {
		if (
			window.innerHeight + window.scrollY >=
				document.body.offsetHeight - 100 &&
			this.props.list.length
		) {
			this.props.onPaginatedSearch();
		}
	};

	handleClickTrue(itemId) {
		this.setState({
			onEnlarge: true,
			element: itemId
		});
	}

	handleClickFalse() {
		this.setState({
			onEnlarge: false
		});
		console.log("Final state of onEnlarge: ${this.state.onEnlarge}");
	}

	render() {
		const { list } = this.props;
		const { element, onEnlarge } = this.state;
		console.log(`Enlarge is ${list}`);

		return (
			<div>
				{onEnlarge ? (
					<div className="EnlargedView w3-animate-bottom" style={{ border: 1 + "px solid black" }}>
						<p>ID is {element}</p>
						<p>Name is {list[element].name}</p>
						<p>Username is {list[element].username}</p>
						<p>Email {list[element].email}</p>
						<p>City is {list[element].address.city}</p>
						<button onClick={() => this.handleClickFalse()}>
							Go Back
						</button>
					</div>
				) : (
					<div className="list w3-animate-left">
						<div className="container">
							{list.map((item, index) => (
								<div
									key={index}
									style={{ border: 1 + "px solid black" }}>
									<h4>
										<b>{item.name}</b>
									</h4>
									<button
										onClick={() =>
											this.handleClickTrue(item.id)
										}
									>
										Show Information
									</button>
								</div>
							))}
						</div>
					</div>
				)}
			</div>
		);
	}
}

ReactDOM.render(<Infinite_Scroll />, document.getElementById("root"));
