export function changeUser (name) {
	return {
		type: 'CHANGE_USER',
		name
	};
}
export function changeGroupId (groupId) {
	return {
		type: 'CHANGE_GROUP_ID',
		groupId
	};
}
export function changeShowing (showing) {
	return {
		type: 'CHANGE_SHOWING',
		showing
	};
}

export function addSentence (groupId, speaker, sentence, time) {
	return {
		type: 'ADD_SENTENCE',
		groupId,
		speaker,
		sentence,
		time
	};
}

export function addOrder (groupId, person, drink, number, request, price) {
	return {
		type: 'ADD_ORDER',
		groupId,
		person,
		drink,
		number,
		request,
		price
	};
}
export function editOrder (idx, drink, number, request, price) {
	return {
		type: 'EDIT_ORDER',
		idx,
		drink,
		number,
		request,
		price
	};
}

export function addGroup (groupId, name, status, website, due, money, owner) {
	return {
		type: 'ADD_GROUP',
		groupId, 
		name, 
		status, 
		website, 
		due, 
		money,
		owner
	};
}