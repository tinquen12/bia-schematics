import * as from<%= classify(pluralName) %> from './<%= dasherize(pluralName) %>-reducers'
import {
  Action,
  combineReducers,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store'
import {storeKey} from '../<%= dasherize(name) %>.constants'

export interface <%= classify(pluralName) %>State {
  <%= dasherize(pluralName) %>: from<%= classify(pluralName) %>.State
}

/** Provide reducers with AoT-compilation compliance */
export function reducers(state: <%= classify(pluralName) %>State | undefined, action: Action) {
  return combineReducers({
    <%= dasherize(pluralName) %>: from<%= classify(pluralName) %>.<%= camelize(name) %>Reducers,
  })(state, action)
}

/**
 * The createFeatureSelector function selects a piece of state from the root of the state object.
 * This is used for selecting feature states that are loaded eagerly or lazily.
 */

export const get<%= classify(pluralName) %>State = createFeatureSelector<<%= classify(pluralName) %>State>(storeKey)

export const get<%= classify(pluralName) %>EntitiesState = createSelector(
  get<%= classify(pluralName) %>State,
  state => state.<%= dasherize(pluralName) %>,
)

export const get<%= classify(pluralName) %>TotalCount = createSelector(
  get<%= classify(pluralName) %>EntitiesState,
  state => state.totalCount,
)

export const getCurrent<%= classify(name) %> = createSelector(
  get<%= classify(pluralName) %>EntitiesState,
  state => state.current<%= classify(name) %>,
)

export const getLastLazyLoadEvent = createSelector(
  get<%= classify(pluralName) %>EntitiesState,
  state => state.lastLazyLoadEvent,
)

export const get<%= classify(name) %>LoadingGet = createSelector(
  get<%= classify(pluralName) %>EntitiesState,
  state => state.loadingGet,
)

export const get<%= classify(name) %>LoadingGetAll = createSelector(
  get<%= classify(pluralName) %>EntitiesState,
  state => state.loadingGetAll,
)

export const {selectAll: getAll<%= classify(pluralName) %>} = from<%= classify(pluralName) %>.<%= camelize(pluralName) %>Adapter.getSelectors(
  get<%= classify(pluralName) %>EntitiesState,
)

export const get<%= classify(name) %>ById = (id: number) =>
  createSelector(get<%= classify(pluralName) %>EntitiesState, from<%= classify(pluralName) %>.get<%= classify(name) %>ById(id))
