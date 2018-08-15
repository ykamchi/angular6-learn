import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material';
import { MatSelectModule } from '@angular/material';
import { MatButtonModule } from '@angular/material';
import { MatGridListModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from "@angular/material/icon"; 
import { MatAutocompleteModule } from '@angular/material/autocomplete';




import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AuthModule } from './auth/auth.module'
import { AuthGuard } from './auth/auth.guard'
import { LoginComponent } from './auth/login/login.component'
import { AppComponent } from './app.component';
import { UiModule } from './ui/ui.module';
import { MainComponent, IndicesFilterPipe, IndicesSortPipe } from './components/main/main.component';
import { RouterModule, Routes  } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { IndexComponent } from './components/index/index.component';
import { WindowRefService } from './services/window-ref.service';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import 'hammerjs';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { ChartIndexComponent } from './components/charts/index/chartindex.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { IndexEditComponent } from './components/index-edit/index-edit.component';
import { JwtInterceptor, ErrorInterceptor } from './helpers';

export class CustomHammerConfig extends HammerGestureConfig  {
    overrides = <any>{
        'pinch': { enable: false },
        'rotate': { enable: false }
    }
} 

const routes: Routes = [
  { path: 'main', component: MainComponent, canActivate: [AuthGuard] },
  { path: 'index', component: IndexComponent, canActivate: [AuthGuard] }, 
  { path: 'newindex', component: IndexEditComponent, canActivate: [AuthGuard] }, 
  { path: 'chartindex', component: ChartIndexComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo:  '/main', pathMatch: 'full' } ,
  { path: '**', redirectTo:  '/main'}  
];

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    IndexComponent,
    IndicesFilterPipe,
    IndicesSortPipe,
    ChartIndexComponent,
    IndexEditComponent
  ], 
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    BrowserAnimationsModule,
    UiModule,
    AuthModule,
    NgbModule.forRoot(),
    HttpClientModule ,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatGridListModule,
    MatCardModule,
    MatCheckboxModule,
    MatIconModule,
    MatAutocompleteModule,
    NgxMaterialTimepickerModule.forRoot()
  ],
  providers: [ 
    WindowRefService,
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: CustomHammerConfig
    },
    
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }

  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
