import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule  } from '@angular/forms';
import { SpeechModule} from 'ngx-speech';
import { MatDatepickerModule, MatNativeDateModule, MatSliderModule, MatGridListModule, MatToolbarModule, MatFormFieldModule, MatInputModule, MatOptionModule, MatSelectModule, MatIconModule, MatButtonModule, MatCardModule, MatTableModule,MatDividerModule, MatSnackBarModule } from '@angular/material';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
 
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainComponent } from './components/main/main.component';
import { ListComponent } from './components/list/list.component';
import { CreateComponent } from './components/create/create.component';
import { EditComponent } from './components/edit/edit.component';

import { AddComponent } from './components/indices/events/add/add.component';

import { DlDateTimePickerDateModule } from 'angular-bootstrap-datetimepicker';


import { IssueService } from './issue.service';


const routes: Routes = [
  { path: 'main', component: MainComponent },
  { path: 'create', component: CreateComponent },
  { path: 'edit/:id', component: EditComponent },
  { path: 'list', component: ListComponent },
  { path: 'indices/add', component: AddComponent },
  { path: '', redirectTo:  'main', pathMatch: 'full' }  
];

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    CreateComponent,
    EditComponent,
    MainComponent,
    AddComponent
  ],
  imports: [
    SpeechModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(routes),
    NgxMaterialTimepickerModule.forRoot(),
    MatDatepickerModule,
    MatNativeDateModule,
    MatSliderModule,
    MatGridListModule,
    MatToolbarModule,
    MatToolbarModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatOptionModule, 
    MatSelectModule, 
    MatIconModule, 
    MatButtonModule, 
    MatCardModule, 
    MatTableModule,
    MatDividerModule,
    MatSnackBarModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    NgbModule.forRoot(),
    DlDateTimePickerDateModule
  ],
  providers: [
    IssueService, { provide: 'SPEECH_LANG', useValue: 'en-US' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
