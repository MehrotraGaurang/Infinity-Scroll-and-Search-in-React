import React from "react";
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';


const styles = theme => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: `${theme.spacing.unit * 3}px`,
  },
  paper: {
    padding: theme.spacing.unit,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    marginBottom: theme.spacing.unit,
  },
  
});

export default class CardView1 extends React.Component {
	// onStatusUpdate() {
	// 	const status =
	// 		DateTime.now.to_time > this.props.trip.eta.to_time && this.props.trip.status == "Enroute"
	// 			? "Delayed"
	// 			: this.props.trip.status;
	// 	let color = "";
	// 	if (status === "Ontime") {
	// 		color = "bg-success text-dipper";
	// 	} else if (
	// 		status === "Delayed" ||
	// 		(this.props.trip.status == "Enroute" &&
	// 			this.props.trip.eta.strftime("%d-%m-%y").to_s <
	// 				ist(Time.now).strftime("%d-%m-%y").to_s)
	// 	)
	// 		color = "bg-danger text-dipper";
	// 	else if (status === "Early") color = "bg-info text-dipper";

	// 	return color;
	// }

	// onGPSUpdate(){
	// 	<% if @gps[trip.id].present? && @gps[trip.id].signal_strength%>
	//            <% if @gps[trip.id].signal_strength < 11 %>
	//              <% signal_color = '#f3f' %>
	//              <% signal_text = "Bad signal strength : #{@gps[trip.id].signal_strength}" %>

	//              <% signal_code = 0 %>
	//            <% elsif @gps[trip.id].signal_strength > 19 %>
	//              <% signal_color = 'cyan' %>
	//              <% signal_text = 'Good signal strength' %>
	//            <% else %>
	//              <% signal_color = 'yellow' %>
	//              <% signal_text = 'Average signal strength' %>

	// }

	render() {
		const { item } = this.props;
		return (
			<div className="row" style={{ border: "1px solid black", margin: 10 }}>
				<Grid container spacing={12}>
					<Grid item xs={3}>
          				<Paper className='paper'>Vehicle No:</Paper>
        			</Grid>
        			<Grid item xs={3}>
          				<Paper className='paper'>Invoice No:</Paper>
        			</Grid>
        			<Grid item xs={3}>
          				<Paper className='paper'>Driver:</Paper>
        			</Grid>
        			<Grid item xs={3}>
          				<Paper className='paper'>Phone No:</Paper>
        			</Grid>
        		</Grid>	
        		<Grid container spacing={8}>
        			<Grid item xs={1}>
          				<Paper className='paper'>Status Colour</Paper>
        			</Grid>
        			<Grid item xs={1}>
          				<Paper className='paper'>Signal Col</Paper>
        			</Grid>
        		
        			<Grid item xs={2}>
          				<Paper className='paper'>Loading In:</Paper>
        			</Grid>
        			<Grid item xs={2}>
          				<Paper className='paper'>Landmark</Paper>
        			</Grid>
        			<Grid item xs={2}>
          				<Paper className='paper'>Consigner</Paper>
        			</Grid>
        		</Grid>
        		<Grid container spacing={8}>	
        			<Grid item xs={1}>
          				<Paper className='paper'>Battery Col</Paper>
        			</Grid>
        			<Grid item xs={1}>
          				<Paper className='paper'>TimeStamp</Paper>
        			</Grid>
        			
        			<Grid item xs={2}>
          				<Paper className='paper'>Loading Out</Paper>
        			</Grid>
        			<Grid item xs={2}>
          				<Paper className='paper'>Status</Paper>
        			</Grid>
        			<Grid item xs={2}>
          				<Paper className='paper'>Consignee</Paper>
        			</Grid>
        		</Grid>
        		<Grid container spacing={12}>	
       				<Grid item xs={3}>
          				<Paper className='paper'>Delayed</Paper>
        			</Grid>
        			<Grid item xs={3}>
          				<Paper className='paper'>ETA</Paper>
        			</Grid>
        			<Grid item xs={3}>
          				<Paper className='paper'></Paper>
        			</Grid>
        			<Grid item xs={3}>
          				<Paper className='paper'>Transpoter</Paper>
        			</Grid>
				</Grid>
			</div>
		);
	}
}
