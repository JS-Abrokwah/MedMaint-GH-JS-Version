import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/models/user';
import { faTrashCan, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'person-card',
  templateUrl: './person-card.component.html',
  styleUrls: ['./person-card.component.css'],
})
export class PersonCardComponent implements OnInit {
  deleteIcon = faTrashCan;
  mailIcon = faEnvelope;
  eyeIcon=faEye

  @Input() person!: User;
  @Output() remove: EventEmitter<User> = new EventEmitter();
  @Output() sendMail: EventEmitter<User> = new EventEmitter();
  @Output() view:EventEmitter<User> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
  onDelete() {
    this.remove.emit(this.person);
  }
  onMail() {
    this.sendMail.emit(this.person);
  }
  onView(){
    this.view.emit(this.person)
  }
}
