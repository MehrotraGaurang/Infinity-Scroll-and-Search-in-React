import React from "react";
import * as FontAwesome from "react-icons/lib/fa";

export default class CardView extends React.Component {
	state = {
		color: "",
		signal_color: "",
		signal_text: "",
		battery_icon: "",
		battery_text: ""
	};

	componentDidMount() {
		this.onStatusUpdate();
		this.onGPSsignal();
		this.onBatterySignal();
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

	onGPSsignal() {
		console.log("GPS IS DUDE:", this.props.gps);
		if (this.props.gps[this.props.trip.id]) {
			if (this.props.gps[this.props.trip.id].signal_strength) {
				if (this.props.gps[this.props.trip.id].signal_strength < 11) {
					this.setState({
						signal_color: "#f3f",
						signal_text: `Bad signal strength : ${
							this.props.gps[this.props.trip.id].signal_strength
						}`
					});

					// signal_code = 0;
				} else if (
					this.props.gps[this.props.trip.id].signal_strength > 19
				) {
					this.setState({
						signal_color: "cyan",
						signal_text: "Good signal strength"
					});
				} else {
					this.setState({
						signal_color: "yellow",
						signal_text: "Average signal strength"
					});
				}
			}
		} else {
			this.setState({
				signal_color: "#ffffff",
				signal_text: `N/A`
			});
		}
	}

	onBatterySignal() {
		if (this.props.gps[this.props.trip.id]) {
			if (
				this.props.gps[this.props.trip.id].battery_voltage < 3.2 &&
				this.props.gps[this.props.trip.id].battery_voltage
			) {
				this.setState({
					battery_icon: 0,
					battery_text: `Bad battery strength: ${
						this.props.gps[this.props.trip.id].battery_voltage
					} V`
				});
			} else if (
				this.props.gps[this.props.trip.id].battery_voltage >= 3.2 &&
				this.props.gps[this.props.trip.id].battery_voltage < 3.4
			) {
				this.setState({
					battery_icon: 1,
					battery_text: "Poor battery strength"
				});
			} else if (
				this.props.gps[this.props.trip.id].battery_voltage >= 3.4 &&
				this.props.gps[this.props.trip.id].battery_voltage < 4
			) {
				this.setState({
					battery_icon: 2,
					battery_text: "Average battery strength"
				});
			} else {
				this.setState({
					battery_icon: 3,
					battery_text: "Good battery strength"
				});
			}
		} else {
			this.setState({
				signal_color: "#ffffff",
				signal_text: `N/A`
			});
		}
	}
	render() {
		const { trip, gps } = this.props;
		const {
			color,
			signal_color,
			signal_text,
			battery_icon,
			battery_text
		} = this.state;

		const statusStyle = {
			border: "1px solid black",
			borderRadius: "5px",
			marginTop: "4px",
			backgroundColor: color,
			textAlign: "center"
		};
		const signalStatus = {
			border: "1px solid black",
			backgroundColor: signal_color,
			width: "50%",
			marginTop: "15px",
			textOverflow: "ellipsis",
			whiteSpace: "noWrap",
			overflow: "hidden"
		};

		console.log(`Battery icon : ${battery_icon}`);
		console.log(trip.id);

		const timeStamp = () => {
			if (gps[trip.id]) {
				return gps[trip.id].ist_timestamp;
			} else {
				return "N/A";
			}
		};

		const iconBattery = () => {
			if (battery_icon === 0) return <FontAwesome.FaBattery0 />;
			else if (battery_icon === 1) return <FontAwesome.FaBattery1 />;
			else if (battery_icon === 2) return <FontAwesome.FaBattery3 />;
			else if (battery_icon === 3) return <FontAwesome.FaBattery4 />;
		};

		console.log(iconBattery);

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
											style={signalStatus}
										>
											{signal_text}
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
											{iconBattery()}
										</div>
										<div
											className="col-sm-3"
											style={{
												border: "1px solid black",
												width: "50%",
												paddingBottom: "0px",
												marginBottom: "15px",
												whiteSpace: "noWrap",
												overflow: "hidden",
												textOverflow: "ellipsis"
											}}
										>
											{timeStamp()}
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
								<div className="col-sm-3" style={statusStyle}>
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
