import React from 'react'

import TextField from 'material-ui/TextField'
import IconButton from 'material-ui/IconButton'
import RaisedButton from 'material-ui/RaisedButton'
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit'
import Done from 'material-ui/svg-icons/action/done'
import { Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'

import { connect } from 'react-redux'
import { addOrder, editOrder } from './../actions/actions'

//--------------
// orders = [{id: groupId, person: person, drink: drink, 
//			  number: number, request: request, price: price}, {},...]
//--------------

const ediable = (user, person) => {
	if( user == person ){
		return true;
	}
	return false;
};

class Order extends React.Component{

	constructor (props) {
		super(props);

		this.state = {
			changeCell: null,
			edit: true,
			addOrderForm: false,
			drink: '',
			number: '',
			request: '',
			price: ''
		};

		// let {dispatch, showingGroup, user} = this.props;
		// dispatch( addOrder(showingGroup, user, 'Milk Tea', 2, 'no ice', 60) );
		// dispatch( addOrder(showingGroup, 'Robot', 'Milk Tea', 2, 'no ice', 60) );
		// dispatch( addOrder(showingGroup, user, 'Green Tea', 1, 'no ice', 20) );
	}

	handleEdit (idx) {
		let { orders } = this.props;

		this.setState({
			edit: false,
			changeCell: idx,
			drink: orders[idx].drink,
			number: orders[idx].number,
			request: orders[idx].request,
			price: orders[idx].price
		});

	}

	handleDone (idx) {
		let { showingGroup, dispatch } = this.props;

		this.setState({
			edit: true,
			changeCell: null,
			drink: '',
			number: '',
			request: '',
			price: ''
		});
		dispatch( editOrder(idx, this.state.drink, this.state.number, 
							this.state.request, this.state.price ));
	}

	handleAddOrder (isAdd) {
		let { drink, number, request, price } = this.state;
		let { showingGroup, dispatch, user } = this.props;

		if( isAdd ){
			if( (drink!='') && (number!='') && (price!='') ){
				dispatch( addOrder(showingGroup, user, drink, number, request, price) );
			}
		}
		this.setState({
			addOrderForm: !this.state.addOrderForm,
			drink: '',
			number: '',
			request: '',
			price: ''
		});
	}

	handleChange (field, e) {
		switch (field) 
		{
			case 'drink':
				this.setState({drink: e.target.value});
				break;

			case 'number':
				this.setState({number: e.target.value});
				break;

			case 'request':
				this.setState({request: e.target.value});
				break;

			case 'price':
				this.setState({price: e.target.value});
				break;

			default:
		}
	}

	render () {
		let { orders, user } = this.props;

		const editButton = (idx) => {
			if( (this.state.edit) || (this.state.changeCell != idx) ){
				return (
					<IconButton>
						<ModeEdit onTouchTap={this.handleEdit.bind(this, idx)} />
					</IconButton>
				);
			}else{
				return (
					<IconButton>
						<Done onTouchTap={this.handleDone.bind(this, idx)} />
				 	</IconButton>
				);
			}
		};

		return (
			<div className='Order'>
				<Table height={'200px'}>
				<TableHeader displaySelectAll={false}
							 displaySelectAll={false}
							 adjustForCheckbox={false}>
					<TableRow>
						<TableHeaderColumn></TableHeaderColumn>
						<TableHeaderColumn>Person</TableHeaderColumn>
						<TableHeaderColumn>Drink</TableHeaderColumn>
						<TableHeaderColumn>Number</TableHeaderColumn>
						<TableHeaderColumn>request</TableHeaderColumn>
						<TableHeaderColumn>Price</TableHeaderColumn>
					</TableRow>
				</TableHeader>
				<TableBody displayRowCheckbox={false}>
					{orders.map((val, idx) => {
						return (
							ediable(user, val.person) ? 
							(	<TableRow key={idx}
										  selectable={false}>
									<TableRowColumn>{editButton(idx)}</TableRowColumn>
									<TableRowColumn>
								  		{ val.person }
							  		</TableRowColumn>
							  		<TableRowColumn>
								  	{ 
								  		(this.state.changeCell == idx) ? 
										(<TextField id='edit-drink'
													value={this.state.drink}
													onChange={this.handleChange.bind(this, 'drink')} />) 
										: val.drink 
									}
							  		</TableRowColumn>
							  		<TableRowColumn>
								  	{ 
								  		(this.state.changeCell == idx) ? 
										(<TextField id='edit-number'
													value={this.state.number}
													onChange={this.handleChange.bind(this, 'number')} />) 
										: val.number 
									}
							  		</TableRowColumn>
							  		<TableRowColumn>
								  	{ 
								  		(this.state.changeCell == idx) ? 
										(<TextField id='edit-request'
													value={this.state.request}
													onChange={this.handleChange.bind(this, 'request')} />) 
										: val.request 
									}
							  		</TableRowColumn>
							  		<TableRowColumn>
								  	{ 
								  		(this.state.changeCell == idx) ? 
										(<TextField id='edit-price'
													value={this.state.price}
													onChange={this.handleChange.bind(this, 'price')} />) 
										: val.price 
									}
							  		</TableRowColumn>
								</TableRow>
							)
							:
							(	<TableRow key={idx}
										  selectable={false}>
									<TableRowColumn></TableRowColumn>
								  	<TableRowColumn>{val.person}</TableRowColumn>
								  	<TableRowColumn>{val.drink}</TableRowColumn>
								  	<TableRowColumn>{val.number}</TableRowColumn>
								  	<TableRowColumn>{val.request}</TableRowColumn>
								  	<TableRowColumn>{val.price}</TableRowColumn>
								</TableRow>
							)
						);
					})}
					{
						this.state.addOrderForm ? 
						(	<TableRow selectable={false}>
								<TableRowColumn></TableRowColumn>
								<TableRowColumn>{this.props.user}</TableRowColumn>
								<TableRowColumn>
							  		<TextField id='add-drink'
											   value={this.state.drink}
											   onChange={this.handleChange.bind(this, 'drink')} />
						  		</TableRowColumn>
						  		<TableRowColumn>
							  		<TextField id='add-number'
											   value={this.state.number}
											   onChange={this.handleChange.bind(this, 'number')} />
						  		</TableRowColumn>
						  		<TableRowColumn>
							  		<TextField id='add-request'
											   value={this.state.request}
											   onChange={this.handleChange.bind(this, 'request')} />
						  		</TableRowColumn>
						  		<TableRowColumn>
							  		<TextField id='add-price'
											   value={this.state.price}
											   onChange={this.handleChange.bind(this, 'price')} />
						  		</TableRowColumn>
							</TableRow>
						)
						:('')
					}
				</TableBody>
				<TableFooter>
					<TableRow>
					<TableRowColumn colSpan="5" style={{textAligh: 'center'}}>
						<RaisedButton label={this.state.addOrderForm?'Done':'Add Order'}
									  fullWidth={true} 
									  onTouchTap={this.handleAddOrder.bind(this, this.state.addOrderForm)} />
					</TableRowColumn>
					</TableRow>
				</TableFooter>
				</Table>
			</div>
		);
	}
}

function getOrders (state) {
	let id = state.status.showingGroup;
	let orders = [];

	state.orders.map((val) => {
		if( val.id == id ){
			orders.push(val);
		}
	});

	return {
		user: state.status.user,
		showingGroup: id,
		orders: orders
	}
}

export default connect(getOrders)(Order);