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




import { NgModule } from '@angular/core';

import { AuthModule } from './auth/auth.module'
import { AuthGuard } from './auth/auth.guard'
import { LoginComponent } from './auth/login/login.component'
import { AppComponent } from './app.component';
import { UiModule } from './ui/ui.module';
import { MainComponent, IndicesFilterPipe, IndicesSortPipe } from './components/main/main.component';
import { RouterModule, Routes  } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { IndexComponent } from './components/index/index.component';
import { WindowRefService } from './services/Window-ref.service';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import 'hammerjs';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { ChartIndexComponent } from './components/charts/index/chartindex.component';
import { MatCheckboxModule } from '@angular/material/checkbox';




export class CustomHammerConfig extends HammerGestureConfig  {
    overrides = <any>{
        'pinch': { enable: false },
        'rotate': { enable: false }
    }
} 

const routes: Routes = [
  { path: 'main', component: MainComponent, canActivate: [AuthGuard] },
  { path: 'index', component: IndexComponent, canActivate: [AuthGuard] }, 
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
    ChartIndexComponent
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
    MatCheckboxModule
  ],
  providers: [ WindowRefService,
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: CustomHammerConfig
    }
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
