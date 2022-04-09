import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Feature<%= classify(pluralName) %>Actions } from './<%= dasherize(pluralName) %>-actions';
import { LazyLoadEvent } from 'primeng/api';
import { <%= classify(name) %> } from '<%= modelRelativePath %>';

// This adapter will allow is to manipulate planes (mostly CRUD operations)
export const <%= dasherize(pluralName) %>Adapter = createEntityAdapter<<%= classify(name) %>>({
  selectId: (<%= dasherize(name) %>: <%= classify(name) %>) => plane.id,
  sortComparer: false
});

// -----------------------------------------
// The shape of EntityState
// ------------------------------------------
// interface EntityState<Plane> {
//   ids: string[] | number[];
//   entities: { [id: string]: Plane };
// }
// -----------------------------------------
// -> ids arrays allow us to sort data easily
// -> entities map allows us to access the data quickly without iterating/filtering though an array of objects

export interface State extends EntityState<<%= classify(name) %>> {
  // additional props here
  totalCount: number;
  current<%= classify(name) %>: <%= classify(name) %>;
  lastLazyLoadEvent: LazyLoadEvent;
  loadingGet: boolean;
  loadingGetAll: boolean;
}

export const INIT_STATE: State = <%= dasherize(pluralName) %>Adapter.getInitialState({
  // additional props default values here
  totalCount: 0,
  current<%= classify(name) %>: <<%= classify(name) %>>{},
  lastLazyLoadEvent: <LazyLoadEvent>{},
  loadingGet: false,
  loadingGetAll: false,
});

export const <%= dasherize(name) %>Reducers = createReducer<State>(
  INIT_STATE,
  on(Feature<%= classify(pluralName) %>Actions.loadAllByPost, (state, { event }) => {
    return { ...state, loadingGetAll: true };
  }),
  on(Feature<%= classify(pluralName) %>Actions.load, (state) => {
    return { ...state, loadingGet: true };
  }),
  on(Feature<%= classify(pluralName) %>Actions.loadAllByPostSuccess, (state, { result, event }) => {
    const stateUpdated = planesAdapter.setAll(result.data, state);
    stateUpdated.totalCount = result.totalCount;
    stateUpdated.lastLazyLoadEvent = event;
    stateUpdated.loadingGetAll = false;
    return stateUpdated;
  }),
  on(Feature<%= classify(pluralName) %>Actions.loadSuccess, (state, { plane }) => {
    return { ...state, current<%= classify(name) %>: plane, loadingGet: false };
  }),
  on(Feature<%= classify(pluralName) %>Actions.failure, (state, { error }) => {
    return { ...state, loadingGetAll: false, loadingGet: false };
  }),
);

export const get<%= classify(name) %>ById = (id: number) => (state: State) => state.entities[id];