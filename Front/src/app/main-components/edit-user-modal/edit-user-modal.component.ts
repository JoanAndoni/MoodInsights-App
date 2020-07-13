import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-edit-user-modal',
  templateUrl: './edit-user-modal.component.html',
  styleUrls: ['./edit-user-modal.component.scss']
})
export class EditUserModalComponent implements OnInit {
  @Output() close: EventEmitter<any> = new EventEmitter();
  @Input() currentUser: User;

  constructor() { }

  ngOnInit() {
  }

  toggle(): void {
    console.log("toggle")
    this.close.emit(null);
  }

  setUser(u:User): void{
    this.currentUser = u;
  }

}
