import { NgModule, Inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule, APP_BASE_HREF } from '@angular/common';
import { HttpModule, Http } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { Ng2BootstrapModule, CollapseModule } from 'ngx-bootstrap';
// i18n support
//import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
//import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { StaffComponent } from './components/staff/staff.component';

import { LinkService } from './shared/link.service';
import { UserService } from './shared/user.service';
import { ConnectionResolver } from './shared/route.resolver';
import { ORIGIN_URL } from './shared/constants/baseurl.constants';
import { TransferHttpModule } from '../modules/transfer-http/transfer-http.module';

// export function createTranslateLoader(http: Http, baseHref) {
//     // Temporary Azure hack
//     if (baseHref === null && typeof window !== 'undefined') {
//         baseHref = window.location.origin;
//     }
//     // i18n files are in `wwwroot/assets/`
//     return new TranslateHttpLoader(http, `${baseHref}/assets/i18n/`, '.json');
// }

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        HomeComponent,
        StaffComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        Ng2BootstrapModule.forRoot(), // You could also split this up if you don't want the Entire Module imported
        CollapseModule.forRoot(),
        TransferHttpModule, // Our Http TransferData method

        // i18n support
        // TranslateModule.forRoot({
        //     loader: {
        //         provide: TranslateLoader,
        //         useFactory: (createTranslateLoader),
        //         deps: [Http, [ORIGIN_URL]]
        //     }
        // }),

        // App Routing
        RouterModule.forRoot([
            {
                path: '',
                redirectTo: 'home',
                pathMatch: 'full'
            },
                // *** SEO Magic ***
                // We're using "data" in our Routes to pass in our <title> <meta> <link> tag information
                // Note: This is only happening for ROOT level Routes, you'd have to add some additional logic if you wanted this for Child level routing
                // When you change Routes it will automatically append these to your document for you on the Server-side
                //  - check out app.component.ts to see how it's doing this
            {
                path: 'home', component: HomeComponent,
                data: {
                    title: 'Homepage',
                    meta: [{ name: 'description', content: 'This is an example Description Meta tag!' }],
                }
            },
            {
                path: 'staff', component: StaffComponent,
                data: {
                    title: 'Staff & Rate Management',
                    meta: [{ name: 'description', content: 'This is where you change staff member rates' }],
                }
            },
            // All else fails - go home!
            { path: '**', redirectTo: 'home' }
        ])
    ],
    providers: [
        LinkService,
        UserService,
        ConnectionResolver,
        //TranslateModule
    ]
})
export class AppModule {
}
