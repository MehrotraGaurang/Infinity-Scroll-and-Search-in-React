import React from "react";

export default class CardView extends React.Component {
	state = {
		color: ""
	};

	componentDidMount() {
		this.onStatusUpdate();
	}

	onStatusUpdate() {
		let today = new Date();
		if (this.props.trip.eta) {
			const etaTime = new Date(this.props.trip.eta.substr(0, 10));
			const status =
				today.getTime() > etaTime.getTime() &&
				this.props.trip.status === "Enroute"
					? "Delayed"
					: this.props.trip.status;
			if (status === "Ontime") {
				this.setState({
					color: "#5cb85c"
				});
			} else if (
				status === "Delayed" ||
				(this.props.trip.status === "Enroute" &&
					etaTime.getTime() < today.getTime())
			) {
				this.setState({ color: "#d9534f" });
			} else if (status === "Early") this.setState({ color: "#5bc0de" });
		}
	}

	// onGPSUpdate(){
	// 	 if ((@gps[trip.id].present) && (@gps[trip.id].signal_strength)){
	//             if (@gps[trip.id].signal_strength < 11){
	//               signal_color = '#f3f'
	//               signal_text = "Bad signal strength : #{@gps[trip.id].signal_strength}"

	//               signal_code = 0 }
	//             else if(@gps[trip.id].signal_strength > 19){
	//               signal_color = 'cyan'
	//               signal_text = 'Good signal strength' }
	//             else
	//               {signal_color = 'yellow'
	//               signal_text = 'Average signal strength'}}

	// }

	render() {
		const { trip } = this.props;
		const { color } = this.state;
		console.log(`Color is ${color} for vehicle_no ${trip.vehicle_no}`);

		const divStyle = {
			border: "1px solid black",
			borderRadius: "5px",
			marginTop: "4px",
			backgroundColor: color,
			textAlign: "center"
		};
		console.log(divStyle);

		return (
			<div className="container-fluid">
				<div
					className="row"
					style={{
						border: "2px solid black",
						marginTop: "20px",
						marginBottom: "20px",
						borderRadius: "7px"
					}}
				>
					<div className="col-sm-15">
						<div className="row" style={{ color: "#ffffff" }}>
							<div className="col-sm-12">
								<div
									className="col-sm-3"
									style={{
										borderBottom: "2px solid black",
										borderRight: "2px solid black",
										backgroundColor: "#37383c"
									}}
								>
									<strong>Vehicle No</strong>:{" "}
									{trip.vehicle_no}
								</div>
								<div
									className="col-sm-3"
									style={{
										borderBottom: "2px solid black",
										borderRight: "2px solid black",
										backgroundColor: "#37383c"
									}}
								>
									<strong>Invoice No</strong>:{" "}
									{trip.invoice_no}
								</div>
								<div
									className="col-sm-3"
									style={{
										borderBottom: "2px solid black",
										borderRight: "2px solid black",
										backgroundColor: "#37383c"
									}}
								>
									<strong>Driver</strong>:{" "}
								</div>
								<div
									className="col-sm-3"
									style={{
										borderBottom: "2px solid black",
										backgroundColor: "#37383c"
									}}
								>
									<strong>Phone No</strong>:{" "}
								</div>
							</div>
						</div>

						<div className="row">
							<div className="col-sm-12">
								<div className="col-sm-3">
									<div className="row">
										<div
											className="col-sm-3"
											style={{
												border: "1px solid black",
												width: "50%",
												marginTop: "15px"
											}}
										>
											Color
										</div>
										<div
											className="col-sm-3"
											style={{
												border: "1px solid black",
												width: "50%",
												marginTop: "15px"
											}}
										>
											GPS
										</div>
									</div>
								</div>
								<div
									className="col-sm-3"
									style={{
										marginTop: "15px",
										whiteSpace: "noWrap",
										textOverflow: "ellipsis",
										overflow: "hidden"
									}}
								>
									<strong>Unloading In</strong>:{" "}
									{trip.unloading_in_time}
								</div>
								<div
									className="col-sm-3"
									style={{
										marginTop: "15px",
										whiteSpace: "noWrap",
										textOverflow: "ellipsis",
										overflow: "hidden"
									}}
								>
									<strong>Landmark</strong>:{" "}
								</div>
								<div
									className="col-sm-3"
									style={{
										marginTop: "15px",
										whiteSpace: "noWrap",
										textOverflow: "ellipsis",
										overflow: "hidden"
									}}
								>
									<strong>Consigner</strong>:{" "}
									{trip.consigner_name}
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-sm-12">
								<div className="col-sm-3">
									<div className="row">
										<div
											className="col-sm-3"
											style={{
												border: "1px solid black",
												width: "50%",
												paddingBottom: "0px",
												marginBottom: "15px"
											}}
										>
											Battery
										</div>
										<div
											className="col-sm-3"
											style={{
												border: "1px solid black",
												width: "50%",
												paddingBottom: "0px",
												marginBottom: "15px"
											}}
										>
											Time
										</div>
									</div>
								</div>
								<div
									className="col-sm-3"
									style={{
										marginTop: "9px",
										whiteSpace: "noWrap",
										textOverflow: "ellipsis",
										overflow: "hidden"
									}}
								>
									<strong>Unloading Out</strong>:{" "}
									{trip.unloading_out_time}
								</div>
								<div
									className="col-sm-3"
									style={{
										marginTop: "9px",
										whiteSpace: "noWrap",
										textOverflow: "ellipsis",
										overflow: "hidden"
									}}
								>
									<strong>Transportation:</strong>
								</div>
								<div
									className="col-sm-3"
									style={{
										marginTop: "9px",
										whiteSpace: "noWrap",
										textOverflow: "ellipsis",
										overflow: "hidden"
									}}
								>
									<strong>Consignee</strong>:{" "}
									{trip.consignee_name}
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-sm-12">
								<div className="col-sm-3" style={divStyle}>
									<b>{trip.status ? trip.status : "N/A"}</b>
								</div>
								<div
									className="col-sm-3"
									style={{
										marginTop: "4px",
										whiteSpace: "noWrap",
										textOverflow: "ellipsis",
										overflow: "hidden"
									}}
								>
									<strong>ETA: </strong>
									{trip.eta}
								</div>
								<div className="col-sm-3" />
								<div
									className="col-sm-3"
									style={{ position: "relative" }}
								>
									<div
										className="col-sm-2"
										style={{
											float: "right",
											padding: "0px"
										}}
									>
										<button
											className="w3-button w3-white w3-medium w3-border w3-hover-orange w3-border-black w3-round"
											style={{
												paddingTop: "1px",
												paddingRight: "4px",
												paddingLeft: "3px",
												paddingBottom: "2px"
											}}
										>
											<b>History</b>
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
