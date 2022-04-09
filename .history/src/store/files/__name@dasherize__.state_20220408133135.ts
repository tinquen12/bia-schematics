import * as from<%= classify(pluralName) %> from './<%= dasherize(pluralName) %>-reducer'
import {
  Action,
  combineReducers,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store'
import {storeKey} from '../<%= dasherize(name) %>.constants'

export interface PlanesState {
  planes: fromPlanes.State
}

/** Provide reducers with AoT-compilation compliance */
export function reducers(state: <%= classify(pluralName) %>State | undefined, action: Action) {
  return combineReducers({
    <%= dasherize(pluralName) %>: from<%= classify(pluralName) %>.<%= classify(pluralName) %>Reducers,
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

export const getCurrentPlane = createSelector(
  get<%= classify(pluralName) %>EntitiesState,
  state => state.current<%= classify(pluralName) %>,
)

export const getLastLazyLoadEvent = createSelector(
  get<%= classify(pluralName) %>EntitiesState,
  state => state.lastLazyLoadEvent,
)

export const getPlaneLoadingGet = createSelector(
  get<%= classify(pluralName) %>EntitiesState,
  state => state.loadingGet,
)

export const getPlaneLoadingGetAll = createSelector(
  get<%= classify(pluralName) %>EntitiesState,
  state => state.loadingGetAll,
)

export const {selectAll: getAll<%= classify(pluralName) %>} = from<%= classify(pluralName) %>.<%= dasherize(pluralName) %>Adapter.getSelectors(
  get<%= classify(pluralName) %>EntitiesState,
)

export const getPlaneById = (id: number) =>
  createSelector(get<%= classify(pluralName) %>EntitiesState, fromPlanes.getPlaneById(id))
