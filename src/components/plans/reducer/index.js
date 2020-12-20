import {
    ALL_PLANS_LISTS,
    PLANS_LISTS,
    PLANS_CREATE_MODEL
} from '../action';

export function allPlansList(state = {}, action) {
    if (action.type === ALL_PLANS_LISTS) {
        return action.payload;
    }
    return state;
}

export function plansList(state = {}, action) {
    if (action.type === PLANS_LISTS) {
        return action.payload;
    }
    return state;
}

export function planCreateModal(state = {}, action) {
    if (action.type === PLANS_CREATE_MODEL) {
        return action.payload;
    }
    return state;
}