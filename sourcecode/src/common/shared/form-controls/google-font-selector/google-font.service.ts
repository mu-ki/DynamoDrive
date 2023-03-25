import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {LazyLoaderService} from '@common/core/utils/lazy-loader.service';
import {
    GoogleFontConfig,
    ValueLists,
} from '@common/core/services/value-lists.service';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class GoogleFontService {
    constructor(
        private lazyLoader: LazyLoaderService,
        private valueLists: ValueLists
    ) {}

    getAll(): Observable<GoogleFontConfig[]> {
        return this.valueLists
            .get(['googleFonts'])
            .pipe(map(r => r.googleFonts));
    }

    loadIntoDom(fonts: GoogleFontConfig[], id: string) {
        if (fonts?.length) {
            const families = fonts.map(f => `${f.family}:400`).join('|');
            this.lazyLoader.loadAsset(
                `https://fonts.googleapis.com/css?family=${families}&display=swap`,
                {type: 'css', id}
            );
        }
    }
}
