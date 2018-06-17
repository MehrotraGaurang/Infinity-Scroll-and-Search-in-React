import React from 'react';

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
				<div className="container">
					{list.map((item, index) => (
						<div key={index} style={{ border: "1px solid black" }}>
							<div className="row">
								<h4 className="text-center">
									<strong className="text-dipper">
										{item.origin}
									</strong>
									<small className="text-muted">
										&nbsp;to&nbsp;
									</small>
									<strong className="text-dipper">
										{item.destination}
									</strong>
								</h4>
								<h5 className="text-center">
									<small>
										<strong className="text-dipper">
											{item.vehicle_no}
										</strong>
										<br />
										<strong className="text-dipper">
											ETA:&nbsp;
											{item.start_date}
										</strong>
									</small>
								</h5>
							</div>
						</div>
					))}
				</div>
				{this.props.isLoading&&<h6>Loading...</h6>}
			</div>
		);
	}
}
