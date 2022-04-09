import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map, pluck, switchMap, withLatestFrom, concatMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Feature<%= classify(pluralName) %>Actions } from './<%= dasherize(pluralName) %>-actions';
import { <%= classify(name) %>Das } from '../services/<%= dasherize(name) %>-das.service';
import { Store } from '@ngrx/store';
import { getLastLazyLoadEvent } from './<%= dasherize(name) %>.state';
import { <%= classify(name) %> } from '<%= modelRelativePath %>>';
import { DataResult } from 'src/app/shared/bia-shared/model/data-result';
import { AppState } from 'src/app/store/state';
import { BiaMessageService } from 'src/app/core/bia-core/services/bia-message.service';
import { LazyLoadEvent } from 'primeng/api';
import { biaSuccessWaitRefreshSignalR } from 'src/app/core/bia-core/shared/bia-action';
import { useSignalR } from '../<%= dasherize(name) %>.constants';

/**
 * Effects file is for isolating and managing side effects of the application in one place
 * Http requests, Sockets, Routing, LocalStorage, etc
 */

@Injectable()
export class <%= classify(pluralName) %>Effects {
  loadAllByPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(Feature<%= classify(pluralName) %>Actions.loadAllByPost),
      pluck('event'),
      switchMap((event) =>
        this.<%= dasherize(name) %>Das.getListByPost({ event: event }).pipe(
          map((result: DataResult<<%= classify(name) %>[]>) => Feature<%= classify(pluralName) %>Actions.loadAllByPostSuccess({ result: result, event: event })),
          catchError((err) => {
            this.biaMessageService.showError();
            return of(Feature<%= classify(pluralName) %>Actions.failure({ error: err }));
          })
        )
      )
    )
  );

  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(Feature<%= classify(pluralName) %>Actions.load),
      pluck('id'),
      switchMap((id) => {
        return this.<%= dasherize(name) %>Das.get({ id: id }).pipe(
          map((<%= dasherize(name) %>) => Feature<%= classify(pluralName) %>Actions.loadSuccess({ <%= dasherize(name) %> })),
          catchError((err) => {
            this.biaMessageService.showError();
            return of(Feature<%= classify(pluralName) %>Actions.failure({ error: err }));
          })
        );
      })
    )
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(Feature<%= classify(pluralName) %>Actions.create),
      pluck('<%= dasherize(name) %>'),
      concatMap((<%= dasherize(name) %>) => of(<%= dasherize(name) %>).pipe(withLatestFrom(this.store.select(getLastLazyLoadEvent)))),
      switchMap(([<%= dasherize(name) %>, event]) => {
        return this.<%= dasherize(name) %>Das.post({ item: <%= dasherize(name) %> }).pipe(
          map(() => {
            this.biaMessageService.showAddSuccess();
            if (useSignalR) {
              return biaSuccessWaitRefreshSignalR();
            } else {
              return Feature<%= classify(pluralName) %>Actions.loadAllByPost({ event: <LazyLoadEvent>event });
            }
          }),
          catchError((err) => {
            this.biaMessageService.showError();
            return of(Feature<%= classify(pluralName) %>Actions.failure({ error: err }));
          })
        );
      })
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(Feature<%= classify(pluralName) %>Actions.update),
      pluck('<%= dasherize(name) %>'),
      concatMap((<%= dasherize(name) %>) => of(<%= dasherize(name) %>).pipe(withLatestFrom(this.store.select(getLastLazyLoadEvent)))),
      switchMap(([<%= dasherize(name) %>, event]) => {
        return this.<%= dasherize(name) %>Das.put({ item: <%= dasherize(name) %>, id: <%= dasherize(name) %>.id }).pipe(
          map(() => {
            this.biaMessageService.showUpdateSuccess();
            if (useSignalR) {
              return biaSuccessWaitRefreshSignalR();
            } else {
              return Feature<%= classify(pluralName) %>Actions.loadAllByPost({ event: <LazyLoadEvent>event });
            }
          }),
          catchError((err) => {
            this.biaMessageService.showError();
            return of(Feature<%= classify(pluralName) %>Actions.failure({ error: err }));
          })
        );
      })
    )
  );

  destroy$ = createEffect(() =>
    this.actions$.pipe(
      ofType(Feature<%= classify(pluralName) %>Actions.remove),
      pluck('id'),
      concatMap((id: number) => of(id).pipe(withLatestFrom(this.store.select(getLastLazyLoadEvent)))),
      switchMap(([id, event]) => {
        return this.<%= dasherize(name) %>Das.delete({ id: id }).pipe(
          map(() => {
            this.biaMessageService.showDeleteSuccess();
            if (useSignalR) {
              return biaSuccessWaitRefreshSignalR();
            } else {
              return Feature<%= classify(pluralName) %>Actions.loadAllByPost({ event: <LazyLoadEvent>event });
            }
          }),
          catchError((err) => {
            this.biaMessageService.showError();
            return of(Feature<%= classify(pluralName) %>Actions.failure({ error: err }));
          })
        );
      })
    )
  );

  multiDestroy$ = createEffect(() =>
    this.actions$.pipe(
      ofType(Feature<%= classify(pluralName) %>Actions.multiRemove),
      pluck('ids'),
      concatMap((ids: number[]) => of(ids).pipe(withLatestFrom(this.store.select(getLastLazyLoadEvent)))),
      switchMap(([ids, event]) => {
        return this.<%= dasherize(name) %>Das.deletes({ ids: ids }).pipe(
          map(() => {
            this.biaMessageService.showDeleteSuccess();
            if (useSignalR) {
              return biaSuccessWaitRefreshSignalR();
            } else {
              return Feature<%= classify(pluralName) %>Actions.loadAllByPost({ event: <LazyLoadEvent>event });
            }
          }),
          catchError((err) => {
            this.biaMessageService.showError();
            return of(Feature<%= classify(pluralName) %>Actions.failure({ error: err }));
          })
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private <%= dasherize(name) %>Das: <%= classify(name) %>Das,
    private biaMessageService: BiaMessageService,
    private store: Store<AppState>
  ) {}
}