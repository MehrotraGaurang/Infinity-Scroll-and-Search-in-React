import React from "react";
import CardView from "./CardView.js";

export default class List extends React.Component {
	state = {
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
				document.body.offsetHeight - 500 &&
			this.props.list.length &&
			this.props.page <= 469
		) {
			this.props.onContinuedLoading();
		}
	};

	render() {
		const { list } = this.props;
		const { element } = this.state;

		return (
			<div className="list w3-animate-left">
				<div
					className="container"
					style={{
						padding: "0px",
					}}
				>
					{list.map((item, index) => (
						<div key={index}>
							<CardView trip={item} />
						</div>
					))}
				</div>
				{this.props.isLoading && <h6>Loading...</h6>}
			</div>
		);
	}
}
