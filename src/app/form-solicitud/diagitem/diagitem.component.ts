import { Component, OnInit, Inject,EventEmitter, Output} from '@angular/core';

//addittions
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Item } from '../../form-solicitud/item';
import { NoticeallService } from './noticeall.service';

@Component({
  selector: 'app-diagitem',
  templateUrl: './diagitem.component.html',
  styleUrls: ['./diagitem.component.css']
})
export class DiagitemComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<DiagitemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Item, public recivedName: NoticeallService) { //Anytime pass the Word.value
      //console.log(data);
    }

  ngOnInit(): void {
    this.recivedName.nombreItem='';
  }
  cancelar() {    
    this.dialogRef.close();    
  }

  message:string;
  Checker:string;

  receiveMessage($event) {
    this.message = $event
    this.recivedName.nombreItem=this.message;
    console.log('Aaaaaaaa',this.recivedName.nombreItem);
  }

}

