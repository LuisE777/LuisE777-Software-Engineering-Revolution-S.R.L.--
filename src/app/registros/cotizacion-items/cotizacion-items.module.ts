import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CotizacionItemsRoutingModule } from './cotizacion-items-routing.module';
import { CotizacionItemsComponent } from './cotizacion-items.component';
import { FormItemsCotComponent } from './form-items-cot/form-items-cot.component';
import { CotizacionScannerComponent } from './cotizacion-scanner/cotizacion-scanner.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ItemCotizacionComponent } from 'src/app/components/item-cotizacion/item-cotizacion.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { SharedModule } from 'src/app/navbar/shared/shared.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    CotizacionItemsComponent,
    FormItemsCotComponent,
    CotizacionScannerComponent,
    ItemCotizacionComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    CotizacionItemsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatTableModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    SharedModule, 
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule,
    MatSelectModule,
  ]
})
export class CotizacionItemsModule { }
