import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    OnDestroy,
    OnInit,
    ViewChild,
} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Store} from '@ngxs/store';
import {OpenSearchPage} from '../state/actions/commands';
import {debounceTime, distinctUntilChanged, skip, startWith} from 'rxjs/operators';
import {DriveEntryApiService} from '../drive-entry-api.service';
import {BehaviorSubject, combineLatest, Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {RouterState} from '@ngxs/router-plugin';
import isEqual from 'lodash/isEqual';
import {DriveState} from '../state/drive-state';
import {SearchInputWithFiltersComponent} from '../../../common/datatable/datatable-filters/search-input-with-filters/search-input-with-filters.component';
import {driveSearchFilters} from './drive-search-filters';
import {CurrentUser} from '../../../common/auth/current-user';

@Component({
    selector: 'main-searchbar',
    templateUrl: './main-searchbar.component.html',
    styleUrls: ['./main-searchbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainSearchbarComponent implements OnInit, OnDestroy {
    @ViewChild(SearchInputWithFiltersComponent, {read: ElementRef, static: true})
    searchEl: ElementRef<HTMLElement>;
    filters = driveSearchFilters(this.currentUser);
    searchControl = new FormControl();
    filterChange$ = new BehaviorSubject<string>(null);
    private metaSub: Subscription;

    constructor(
        private store: Store,
        private driveApi: DriveEntryApiService,
        private router: Router,
        private currentUser: CurrentUser
    ) {}

    ngOnInit() {
        // TODO: navigate from search page to drive homepage on blur
        // TODO: refactor permissions into advanced and remove mail template stuff
        this.metaSub = this.store.select(DriveState.meta).subscribe(meta => {
            // make sure nav searchbar color is always white if there are any filters set
            if (meta.query || meta.filters) {
                this.searchEl.nativeElement.classList.add('always-white');
            } else {
                this.searchEl.nativeElement.classList.remove('always-white');
            }
        });

        combineLatest([
            this.searchControl.valueChanges.pipe(distinctUntilChanged(), startWith(null)),
            this.filterChange$,
        ])
            // skip initial "null" values
            .pipe(skip(1), debounceTime(0))
            .subscribe(([query, filters]) => {
                const params = {query, filters};
                const oldParams = this.store.selectSnapshot(RouterState.state).root
                    .queryParams;

                // if both filter and query are null it means form was reset and "resetForm" fn will be called
                const filtersOrQueryChanged =
                    (query || filters) && !isEqual(oldParams, params);

                if (filtersOrQueryChanged) {
                    this.store.dispatch(new OpenSearchPage(params));
                } else if (!filters && !query && this.inSearchPage()) {
                    this.router.navigate(['/drive']);
                }
            });
    }

    ngOnDestroy() {
        this.metaSub?.unsubscribe();
    }

    openSearchPage() {
        // open search page on input focus if not already in search page
        if (!this.inSearchPage()) {
            this.store.dispatch(new OpenSearchPage());
        }
    }

    private inSearchPage(): boolean {
        return this.router.routerState.snapshot.url.includes('/drive/search');
    }
}
