import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Log, LogInforme } from 'src/app/models/log.model';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Log,
  ) { }

  ngOnInit() {
    console.log('Dialog got', this.data.log_name);
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
