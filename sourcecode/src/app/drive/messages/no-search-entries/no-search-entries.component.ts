import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {Store} from '@ngxs/store';
import {DriveState} from '../../state/drive-state';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
    selector: 'no-search-entries',
    templateUrl: './no-search-entries.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoSearchEntriesComponent {
    noQueryOrFilters$: Observable<boolean>;

    constructor(private store: Store) {
        this.noQueryOrFilters$ = this.store
            .select(DriveState.meta)
            .pipe(map(m => !m.query && !m.filters));
    }
}
