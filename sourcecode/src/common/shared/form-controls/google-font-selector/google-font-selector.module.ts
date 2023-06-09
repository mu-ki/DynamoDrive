import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GoogleFontSelectorComponent} from '@common/shared/form-controls/google-font-selector/google-font-selector.component';
import { TranslationsModule } from '@common/core/translations/translations.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    declarations: [GoogleFontSelectorComponent],
    imports: [
        CommonModule,
        TranslationsModule,
        ReactiveFormsModule,
        FormsModule,
        MatRippleModule,
        MatButtonModule,
        MatIconModule,
    ],
    exports: [GoogleFontSelectorComponent],
})
export class GoogleFontSelectorModule {}
