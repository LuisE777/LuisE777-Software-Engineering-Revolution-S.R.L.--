import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { Log, LogInforme } from 'src/app/models/log.model';
import { MatSort } from '@angular/material/sort';
import { DialogComponent } from './dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DataRowOutlet } from '@angular/cdk/table';
import { environment } from '../../env';

@Component({
  selector: 'app-log-records',
  templateUrl: './log-records.component.html',
  styleUrls: ['./log-records.component.css']
})
export class LogRecordsComponent implements OnInit {

  linkApi = environment.baseUrl;

  datalogsgeneral: Log[];
  displayedColumnsGeneral = ['position', 'name',
    'weight.properties.user.name',
    'symbol.properties.ip', 'fecha'];
  dataSourceGeneral: MatTableDataSource<Log>;

  @ViewChild('firstPaginator', { static: true }) firstPaginator: MatPaginator;

  datalogsolicitudes: Log[];
  displayedColumnsSolicitud = ['position', 'name',
    'weight.properties.user.name',
    'symbol.properties.ip', 'fecha'];
  dataSourceSolicitud: MatTableDataSource<Log>;

  @ViewChild('thirdPaginator', { static: true }) thirdPaginator: MatPaginator;

  datalogs: Log[];
  displayedColumns = ['position', 'name',
    'weight.properties.user.name',
    'symbol.properties.ip', 'fecha'];
  dataSource: MatTableDataSource<Log>;

  @ViewChild('secondPaginator', { static: true }) secondPaginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  loading: boolean = false;
  value = 0;

  constructor(private http: HttpClient, private _dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.getLogs();
    this.getBackFiles(); 
    this.getSolicitudes();
    this.getLogsInfo();

  }

  async getLogs() {
    const res: any = await this.http
      .get<Log>(this.linkApi + '/api/auth/logs')
      .toPromise();
    this.datalogsgeneral = res;

    this.dataSourceGeneral = new MatTableDataSource<Log>(this.datalogsgeneral);

    this.dataSourceGeneral.paginator = this.firstPaginator;
    this.dataSourceGeneral.paginator._intl.itemsPerPageLabel = 'Items por pagina';

  }

  async getLogsInfo() {
    const res: any = await this.http
      .get<Log>(this.linkApi + '/api/auth/logs-cotizaciones')
      .toPromise();
    this.datalogs = res;

    this.dataSource = new MatTableDataSource<Log>(this.datalogs);

    this.dataSource.paginator = this.secondPaginator;
    this.dataSource.paginator._intl.itemsPerPageLabel = 'Items por pagina';

  }

  async getSolicitudes() {
    const res: any = await this.http
      .get<Log>(this.linkApi + '/api/auth/logs-solicitudes')
      .toPromise();
    this.datalogsolicitudes = res;

    this.dataSourceSolicitud = new MatTableDataSource<Log>(this.datalogsolicitudes);

    this.dataSourceSolicitud.paginator = this.thirdPaginator;
    this.dataSourceSolicitud.paginator._intl.itemsPerPageLabel = 'Items por pagina';
  }

  chooseColor(row) {
    if (row.description == "created") {
      return "#90EE90" 
    }
    else if (row.description == "updated")
      return "#f5ac4d" 
    else
      return "#e65b66"
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  applyFilterGenLogs(event: Event) {

    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceGeneral.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceGeneral.paginator) {
      this.dataSourceGeneral.paginator.firstPage();
    }
  }

  MassaArray = [];
  async getBackFiles() {

    const res: any = await this.http
      .get<Log>(this.linkApi + '/api/auth/get-backs')
      .toPromise();
    this.MassaArray = res;
    console.log("Los datas", this.MassaArray);

  }

  openDialog(row: Log) {
    console.log("details:", row);

    console.log('Row clicked', row);
    const dialog = this._dialog.open(DialogComponent, {
      width: '400px',

      disableClose: true,
      data: row
    });
  }

  hasName(row) {
    if (row) {

      return true;
    } else
      return false;
  }

  createNewBack() {

    this.loading = true;
    const someObject = {
      nom: "massa"
    }
    let seHaGuardado;
    console.log("GETTINNNNN IN");

    this.http.post(this.linkApi + '/api/auth/setbackup', someObject)
      .subscribe((val) => {

        seHaGuardado = (Object.keys(val).length === 0) ? 0 : 1;
        console.log("POST call successful value returned in body", val)

        if (seHaGuardado === 1) {
          this.loading = false;
        }
      },
        response => {
          console.log("POST call in error", response)
        },
        () => {
          console.log("The message POST has been send | Completed.");
          if (seHaGuardado === 1) {
            console.log("SE HA CREADO UN NUEVO PUNTO DE RESTAURACION");

          } else {
            console.log("Falied");

          }
        });

  }

  restoreFromPoint(was) {

    this.loading = true;
    this.MassaArray[was];

    const someObject = {
      nom: this.MassaArray[was]
    }
    let seHaGuardado;
    console.log("GETTINNNNN IN", someObject);

    this.http.post(this.linkApi + '/api/auth/restore', someObject)
      .subscribe((val) => {
        console.log("MUCHOS", val);
        seHaGuardado = (Object.keys(val).length === 0) ? 0 : 1;
        console.log("POST call successful value returned in body", val)

        if (seHaGuardado === 1) {
          this.loading = false;
        }
      },
        response => {
          console.log("POST call in error", response)
        },
        () => {
          console.log("The message POST has been send | Completed.");
          if (seHaGuardado === 1) {
            console.log("SE HA RESTAURADO");
            this.loading = false;

          } else {
            console.log("Failed");

          }
        });

  }

}

