import { combineReducers } from 'redux'

const rootReducer = combineReducers({ 
	status,
	chats,
	orders,
	groups
});

function status (state={user: 'Tester', showingGroup: 'q23o4ucm23op', showing: 'groups'}, action) {
	switch (action.type) 
	{
		case 'CHANGE_USER':
			return {
				...state,
				user: action.name
			}

		case 'CHANGE_GROUP_ID':
			return {
				...state,
				showingGroup: action.groupId
			}

		case 'CHANGE_SHOWING':
			return {
				...state,
				showing: action.showing
			}

		default:
			return state;
	}
}

function chats (state=[], action) {
	switch (action.type) 
	{
		case 'ADD_SENTENCE':
			return [
				...state,
				{ id: action.groupId, speaker: action.speaker, 
				  sentence: action.sentence, time: action.time }
			]
		default:
			return state;
	}
}

function orders (state=[], action) {
	switch (action.type) 
	{
		case 'ADD_ORDER':
			return [
				...state,
				{ id: action.groupId, person: action.person, drink: action.drink,
				  number: action.number, request: action.request, price: action.price }
			]

		case 'EDIT_ORDER':
			let change = {	drink: action.drink, number: action.number, 
							request: action.request, price: action.price};
			
			return (
				state.map((val, idx) => {
					if( idx == action.idx ){
						return Object.assign({}, val, change)
					}
					return val;
				})
			);

		default:
			return state;
	}
}

function groups (state=[], action) {
	switch (action.type) 
	{
		case 'ADD_GROUP':
			return [
				...state,
				{	
					id: action.groupId, 
					name: action.name, 
					status: action.status, 
					website: action.website, 
					due: action.due, 
					money: action.money,
					owner: action.owner
				}
			]

		default:
			return state;
	}
}

export default rootReducer;