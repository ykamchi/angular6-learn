import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NumberSelectionComponent } from './controls/number-selection/number-selection.component';
import { ContextmenuComponent } from './controls/context-menu/context-menu.component';
import { ConfirmModalComponent } from './controls/confirm-modal/confirm-modal.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from "@angular/material/icon";
import { MatGridListModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TimeSelectionComponent } from './controls/time-selection/time-selection.component'; 




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatGridListModule,
    MatFormFieldModule
  ],
  declarations: [
    LayoutComponent, 
    HeaderComponent, 
    FooterComponent, 
    NumberSelectionComponent,
    TimeSelectionComponent,
    ContextmenuComponent,
    ConfirmModalComponent,
    TimeSelectionComponent
  ],
  exports: [
    LayoutComponent,
    NumberSelectionComponent,
    TimeSelectionComponent,
    ContextmenuComponent,
    ConfirmModalComponent
    
    
  ],
  entryComponents: [ ConfirmModalComponent ]
})
export class UiModule { }
