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
    planes: from<%= classify(pluralName) %>.<%= classify(pluralName) %>Reducers,
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

export const getPlanesTotalCount = createSelector(
  getPlanesEntitiesState,
  state => state.totalCount,
)

export const getCurrentPlane = createSelector(
  getPlanesEntitiesState,
  state => state.currentPlane,
)

export const getLastLazyLoadEvent = createSelector(
  getPlanesEntitiesState,
  state => state.lastLazyLoadEvent,
)

export const getPlaneLoadingGet = createSelector(
  getPlanesEntitiesState,
  state => state.loadingGet,
)

export const getPlaneLoadingGetAll = createSelector(
  getPlanesEntitiesState,
  state => state.loadingGetAll,
)

export const {selectAll: getAllPlanes} = fromPlanes.planesAdapter.getSelectors(
  getPlanesEntitiesState,
)

export const getPlaneById = (id: number) =>
  createSelector(getPlanesEntitiesState, fromPlanes.getPlaneById(id))
