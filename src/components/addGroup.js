import React from 'react'

import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

import { connect } from 'react-redux'
import { addGroup } from './../actions/actions'

// groupId, name, status, website, due, money, owner

class AddGroup extends React.Component{

	handleChange (field, e) {
		switch (field) 
		{
			case 'name':
				this.setState({name: e.target.value});
				break;

			case 'website':
				this.setState({website: e.target.value});
				break;

			case 'due':
				this.setState({due: e.target.value});
				break;

			case 'money':
				this.setState({money: e.target.value});
				break;

			default:
		}
	}

	handleSubmit () {
		let { dispatch, user } = this.props;
		dispatch( addGroup( Math.random().toString(36).substr(2, 12),
							this.state.name,
							'going',
							this.state.website,
							this.state.due,
							this.state.money,
							user
		) );
	}

	render () {
		return (
			<div className='AddGroup'>
				<TextField id='form-name' 
						   floatingLabelText='Name'
						   onChange={this.handleChange.bind(this, 'name')} />

				<TextField id='form-website' 
					   	   floatingLabelText='Website'
					       onChange={this.handleChange.bind(this, 'website')} />
				<TextField id='form-due' 
					   	   floatingLabelText='Due Time'
					   	   onChange={this.handleChange.bind(this, 'due')} />

				<TextField id='form-money' 
					   	   floatingLabelText='Target Money'
					   	   onChange={this.handleChange.bind(this, 'money')} />

				<RaisedButton label="Send" 
							  fullWidth={true}
							  onTouchTap={this.handleSubmit.bind(this)} />
			</div>
		);
	}
}

function getUser (state) {
	return {
		user: state.status.user
	};
}

export default connect(getUser)(AddGroup);