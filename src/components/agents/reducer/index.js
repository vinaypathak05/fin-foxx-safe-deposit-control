import {
    AGENTS_LISTS,
    AGENTS_CREATE_MODEL,
} from '../action';

export function agentsList(state = {}, action) {
    if (action.type === AGENTS_LISTS) {
        return action.payload;
    }
    return state;
}

export function agentCreateModal(state = {}, action) {
    if (action.type === AGENTS_CREATE_MODEL) {
        return action.payload;
    }
    return state;
}