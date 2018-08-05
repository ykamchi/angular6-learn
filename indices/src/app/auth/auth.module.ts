import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { MatIconModule } from "@angular/material/icon"; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material';
import { MatButtonModule } from '@angular/material';
import { MatGridListModule } from '@angular/material';


@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatGridListModule
  ],
  declarations: [LoginComponent]
})
export class AuthModule { }
