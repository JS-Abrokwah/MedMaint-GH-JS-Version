import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MailSenderComponent } from '../mail-sender/mail-sender.component';

@Component({
  selector: 'cli-personnel',
  templateUrl: './cli-personnel.component.html',
  styleUrls: ['./cli-personnel.component.css']
})
export class CliPersonnelComponent implements OnInit {
  @Input() users:any[] =[
    {
      userName:'Addo D. Supervisor',
      role:'Engineer',
      phone:'+23345674690',
      profile_photo:''
    },
    {
      userName:'Hennick Ogoro Billionaire',
      role:'Engineer',
      phone:'+23345674690',
      profile_photo:'../../../../../../assets/other-img/Ogoro.jpg'
    },
    {
      userName:'Hennick Ogoro Billionaire',
      role:'Engineer',
      phone:'+23345674690',
      profile_photo:''
    },
    {
      userName:'Hennick Ogoro Billionaire',
      role:'Engineer',
      phone:'+23345674690',
      profile_photo:'../../../../../../assets/other-img/Ogoro.jpg'
    },
  ]
  personnel!:any[]
  constructor(private dialog:MatDialog){}
  ngOnInit(): void {
    this.personnel=this.users
  }

  reportPersonel(person:any){
    // alert(person.userName + ' will be reported')
  }

  openMsgSender(person:any){
    // alert('message dialog will be open for ' + person.userName)
    const dialogConfig = new MatDialogConfig();
    dialogConfig.maxHeight;
    dialogConfig.maxWidth;
    dialogConfig.data = person
    this.dialog.open(MailSenderComponent,dialogConfig)
  }
}
