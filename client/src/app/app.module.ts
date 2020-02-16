/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {CoreModule} from './@core/core.module';
import {ThemeModule} from './@theme/theme.module';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {NbPasswordAuthStrategy, NbAuthModule, NbAuthJWTToken} from '@nebular/auth';
import {
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
} from '@nebular/theme';
import {AuthGuard} from './auth-guard.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,

    ThemeModule.forRoot(),

    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbChatModule.forRoot({
      messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    }),
    CoreModule.forRoot(),
    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'email',
          token: {
            class: NbAuthJWTToken,

            key: 'token',
          },
          baseEndpoint: 'http:localhost:3000',
          login: {
            endpoint: '/api/auth/login',
            method: 'post',
            redirect: {
              success: '/dashboard/',
              failure: null, // stay on the same page
            },

          },
          register: {
            endpoint: '/api/auth/register',
            method: 'post',
            redirect: {
              success: '/welcome/',
              failure: null, // stay on the same page
            },
          },
          logout: {
            endpoint: '/auth/sign-out',
            method: 'post',
          },
          requestPass: {
            endpoint: '/auth/request-pass',
            method: 'post',
          },
          resetPass: {
            endpoint: '/auth/reset-pass',
            method: 'post',
          },
        }),
      ],
      forms: {
        login: {
          redirectDelay: 500, // delay before redirect after a successful login, while success message is shown to the user
          strategy: 'email',  // strategy id key.
          rememberMe: true,   // whether to show or not the `rememberMe` checkbox
          showMessages: {     // show/not show success/error messages
            success: true,
            error: true,
          },
        },
        register: {
          redirectDelay: 500,
          strategy: 'email',
          showMessages: {
            success: true,
            error: true,
          },
          terms: true,
        },
        requestPassword: {
          redirectDelay: 500,
          strategy: 'email',
          showMessages: {
            success: true,
            error: true,
          },
        },
        resetPassword: {
          redirectDelay: 500,
          strategy: 'email',
          showMessages: {
            success: true,
            error: true,
          },
        },
        logout: {
          redirectDelay: 500,
          strategy: 'email',
        },
        validation: {
          password: {
            required: true,
            minLength: 4,
            maxLength: 50,
          },
          email: {
            required: true,
          },
          fullName: {
            required: false,
            minLength: 4,
            maxLength: 50,
          },
        },
      },
    }),
  ],
  bootstrap: [AppComponent],
  providers: [AuthGuard],
})
export class AppModule {
}
