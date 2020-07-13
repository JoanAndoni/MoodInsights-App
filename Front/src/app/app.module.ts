 import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './main-components/page-not-found/page-not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './main-components/home/home.component';
import { QualityComponent } from './main-components/quality/quality.component';
import { NavbarComponent } from './main-components/navbar/navbar.component';
import { FooterComponent } from './main-components/footer/footer.component';
import { RibbonComponent } from './main-components/ribbon/ribbon.component';
import { ChartService } from './services/chart.service';
import { UserService } from './services/user.service';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgApexchartsModule } from 'ng-apexcharts';
import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthInterceptor } from './interceptors/auth.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    HomeComponent,
    QualityComponent,
    NavbarComponent,
    FooterComponent,
    RibbonComponent
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    BrowserAnimationsModule,
    NgApexchartsModule,
    FontAwesomeModule,
    NgbModule
  ],
  providers: [
    ChartService,
    UserService,
    AuthGuardService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService
  ],
  exports: [FormsModule, TranslateModule, NgApexchartsModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
