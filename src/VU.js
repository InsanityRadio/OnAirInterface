import React, { Component } from 'react';

class VU extends Component {

	state = {
		left: 100,
		right: 100
	}

	componentDidMount () {
		this.ws = new WebSocket('ws://10.32.0.224:8080/');
		this.ws.addEventListener('message', (a) => {
			let data = JSON.parse(a.data)
			data[0] += 10;
			data[1] += 10;

			console.log(data)

			this.setState({
				left: this.pixel(data[0]),
				right: this.pixel(data[1])
			})

		})
	}

	pixel (db) {

		let perc = 0;
		db *= -1;

		// 0 = 0; -20 = (4/7); -80 = (7/7)
		if(db < 20) {
			perc = (db / 20) * (4/7)
		} else {
			perc = ((db-20) / 40) * (3/7) + (4/7)
		}

		return ((perc * 100) | 0);

	}

	componentWillUnmount () {
		this.ws && this.ws.close();
	}

	render () {


		return (
			<div className="inner">
				<div className="channel">
					<div className="channelInner" style={{ height: this.state.left + '%' }}></div>
				</div>
				<div className="channel">
					<div className="channelInner" style={{ height: this.state.right + '%' }}></div>
				</div>
			</div>
		)

	}

}

export default VU;