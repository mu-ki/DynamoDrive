import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from '@common/auth/auth.module';
import { RouterModule } from '@angular/router';
import { BEDRIVE_CONFIG } from './bedrive-config';
import { NgxsModule } from '@ngxs/store';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { AppRoutingModule } from './app-routing.module';
import { AccountSettingsModule } from '@common/account-settings/account-settings.module';
import { HomepageComponent } from './homepage/homepage.component';
import { APP_CONFIG } from '@common/core/config/app-config';
import { MaterialNavbarModule } from '@common/core/ui/material-navbar/material-navbar.module';
import { CORE_PROVIDERS } from '@common/core/core-providers';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ContactPageModule } from '@common/contact/contact-page.module';
import { AdHostModule } from '@common/core/ui/ad-host/ad-host.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CookieNoticeModule } from '@common/gdpr/cookie-notice/cookie-notice.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PagesModule } from '@common/pages/shared/pages.module';
import {CsvExportInfoDialogModule} from '@common/csv/csv-info-dialog/csv-export-info-dialog.module';
import {AppFooterModule} from '@common/shared/app-footer/app-footer.module';
import {ImageOrIconModule} from '@common/core/ui/image-or-icon/image-or-icon.module';

@NgModule({
    declarations: [AppComponent, HomepageComponent],
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule,
        // ServiceWorkerModule.register('client/ngsw-worker.js', {enabled: environment.production}),
        AuthModule,
        AccountSettingsModule,
        PagesModule,
        AppRoutingModule,
        MaterialNavbarModule,
        AdHostModule,
        ContactPageModule,
        CookieNoticeModule,
        CsvExportInfoDialogModule,
        AppFooterModule,

        // material
        MatButtonModule,
        MatIconModule,
        MatSnackBarModule,

        // ngxs
        NgxsModule.forRoot([]),
        NgxsRouterPluginModule.forRoot(),
        ImageOrIconModule,
        // NgxsReduxDevtoolsPluginModule.forRoot()
    ],
    providers: [
        ...CORE_PROVIDERS,
        {
            provide: APP_CONFIG,
            useValue: BEDRIVE_CONFIG,
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
