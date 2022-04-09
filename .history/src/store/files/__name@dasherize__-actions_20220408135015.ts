import {createAction, props} from '@ngrx/store'
import {LazyLoadEvent} from 'primeng/api'
import {<%= classify(name) %>} from '<%= modelRelativePath %>'
import {DataResult} from 'src/app/shared/bia-shared/model/data-result'
import {storeKey} from '../<%= dasherize(name) %>.constants'

export namespace Feature<%= classify(pluralName) %>Actions {
  export const loadAllByPost = createAction(
    '[' + storeKey + '] Load all by post',
    props<{event: LazyLoadEvent}>(),
  )

  export const load = createAction(
    '[' + storeKey + '] Load',
    props<{id: <%= idType %>}>(),
  )

  export const create = createAction(
    '[' + storeKey + '] Create',
    props<{<%= dasherize(name) %>: <%= classify(name) %>}>(),
  )

  export const update = createAction(
    '[' + storeKey + '] Update',
    props<{<%= dasherize(name) %>: <%= classify(name) %>}>(),
  )

  export const remove = createAction(
    '[' + storeKey + '] Remove',
    props<{id: <%= idType %>}>(),
  )

  export const multiRemove = createAction(
    '[' + storeKey + '] Multi Remove',
    props<{ids: <%= idType %>[]}>(),
  )

  export const loadAllByPostSuccess = createAction(
    '[' + storeKey + '] Load all by post success',
    props<{result: DataResult<<%= classify(name) %>[]>; event: LazyLoadEvent}>(),
  )

  export const loadSuccess = createAction(
    '[' + storeKey + '] Load success',
    props<{<%= dasherize(name) %>: <%= classify(name) %>}>(),
  )

  export const failure = createAction(
    '[' + storeKey + '] Failure',
    props<{error: any}>(),
  )
}
