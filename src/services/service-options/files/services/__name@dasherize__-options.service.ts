import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DictOptionDto } from 'src/app/shared/bia-shared/components/table/bia-table/dict-option-dto';
import { AppState } from 'src/app/store/state';

@Injectable({
    providedIn: 'root'
})
export class <%= classify(name) %>OptionsService {
    dictOptionDtos$: Observable<DictOptionDto[]>;

    constructor(
        private store: Store<AppState>,
    ) {

        // [Calc] Dict is used in calc mode only. It map the column name with the list OptionDto.
        this.dictOptionDtos$ = combineLatest([]).pipe(
            map(
                (options) => null
            )
        );
    }

    loadAllOptions() {
    }
}