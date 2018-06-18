import React from "react";
import CardView from "./CardView.js";

export default class Trips extends React.Component {
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
			this.props.trips.length &&
			this.props.page <= 469
		) {
			this.props.onContinuedLoading();
		}
	};

	render() {
		const { trips, gps, percentageDistanceCovered } = this.props;
		const { element } = this.state;
		console.log(gps);
		return (
			<div className="trips w3-animate-left">
				<div
					className="container"
					style={{
						padding: "0px"
					}}
				>
					{trips.map((item, index) => (
						<div key={index}>
							<CardView trip={item} gps={gps} percentageDistanceCovered={percentageDistanceCovered} />
						</div>
					))}
				</div>
				{this.props.isLoading && <h6>Loading...</h6>}
			</div>
		);
	}
}
