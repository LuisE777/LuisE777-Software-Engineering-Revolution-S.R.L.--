import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemCotizacionComponent } from 'src/app/components/item-cotizacion/item-cotizacion.component';
import { CotizacionItemsComponent } from './cotizacion-items.component';
import { CotizacionScannerComponent } from './cotizacion-scanner/cotizacion-scanner.component';

const routes: Routes = [
  { path: 'items', component: CotizacionItemsComponent },
  { path: 'scan-cotizacion', component: CotizacionScannerComponent },
  { path: 'items-cotizados', component: ItemCotizacionComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CotizacionItemsRoutingModule { }