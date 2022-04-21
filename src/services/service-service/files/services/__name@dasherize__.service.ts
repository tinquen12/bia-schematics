import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AppState } from 'src/app/store/state';
import { <%= classify(name) %> } from '<%= modelRelativePath %>';
import { getCurrent<%= classify(name) %>, get<%= classify(name) %>LoadingGet } from '../store/<%= dasherize(name) %>.state';
import { Feature<%= classify(pluralName) %>Actions } from '../store/<%= dasherize(pluralName) %>-actions';

@Injectable({
    providedIn: 'root'
})
export class <%= classify(name) %>Service {
    constructor(
        private store: Store<AppState>,
    ) {
        this.InitSub();
        this.loading$ = this.store.select(get<%= classify(name) %>LoadingGet);
        this.<%= dasherize(name) %>$ = this.store.select(getCurrent<%= classify(name) %>);
    }
    private _current<%= classify(name) %>: <%= classify(name) %>;
    private _current<%= classify(name) %>Id: <%= idType %>;
    private sub = new Subscription();
    public loading$: Observable<boolean>;
    public <%= dasherize(name) %>$: Observable<<%= classify(name) %>>;

    public get<%= classify(name) %>() {
        if (this._current<%= classify(name) %>?.id === this._current<%= classify(name) %>Id) {
            return this._current<%= classify(name) %>;
        } else {
            return null;
        }
    }

    public get current<%= classify(name) %>Id(): <%= idType %> {
        return this._current<%= classify(name) %>Id;
    }
    public set current<%= classify(name) %>Id(id: <%= idType %>) {
        this._current<%= classify(name) %>Id = id;
        this.store.dispatch(Feature<%= classify(pluralName) %>Actions.load({ id: id }));
    }

    InitSub() {
        this.sub = new Subscription();
        this.sub.add(
            this.store.select(getCurrent<%= classify(name) %>).subscribe((<%= dasherize(name) %>) => {
                if (<%= dasherize(name) %>) {
                    this._current<%= classify(name) %> = <%= dasherize(name) %>;
                }
            })
        );
    }
}