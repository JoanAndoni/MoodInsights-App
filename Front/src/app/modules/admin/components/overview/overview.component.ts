import { Component, OnInit, ViewChild} from '@angular/core';
import { AdminService } from '../../../../services/admin.service';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { EditUserModalComponent } from 'src/app/main-components/edit-user-modal/edit-user-modal.component'
// Icons
import { faTrash, faUserLock, faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  //@ViewChild(EditUserModalComponent) editUserModalComponent:EditUserModalComponent;

  users: any;
  selectedUser: User;
  currentUser: User;
  orderBy = 'name';
  orderDirection = 'asc';
  page = 0;
  order = 'name';
  totalUsers = 0;
  LIMIT = 6;
  // Icons
  faTrash = faTrash;
  faUserLock = faUserLock;
  faEdit = faEdit;
  faPlus = faPlus;

  //Edit user
  editingUser: boolean;

  constructor(
    private adminService: AdminService,
    private userService: UserService
  ) {
    this.editingUser = false;
  }

  ngOnInit() {
    this.getUsers();
    this.currentUser = this.userService.getUser();
  }

  get pages() {
    const number = this.totalUsers / this.LIMIT;
    const p = Array(Math.floor(number)).fill(0).map((_x, i) => (i+1));
    if (number % 1 !== 0) {
      p.push(p.length+1);
    }
    return p;
  }

  async deleteUser(index: any) {
    try {
      await this.adminService.deleteUser(this.users[index]._id);
      this.users.splice(index, 1);
    } catch (err) {
      alert('No se pudo borrar el usuario');
      console.log(err);
    }
  }

  changeEditUserModal(){
    this.editingUser = !this.editingUser;
  }

  editUser(index:any): void{
    //console.log(this.users[index])
    this.selectedUser = this.users[index];
    this.changeEditUserModal();
  }

  async getUsers() {
    try {
      const response = await this.adminService.getAllUsers(this.LIMIT, this.page, this.order);
      this.totalUsers = response['count'];
      this.users = response['users'];
      console.log(this.users)
    } catch (err) {
      alert('No se pudieron obtener los usuarios');
      console.log(err);
    }
  }

  orderByName() {
    this.page = 0;
    if (this.orderBy === 'name') {
      this.orderDirection = this.orderDirection === 'desc' ? 'asc' : 'desc';
      this.order = this.order === 'name' ? '-name' : 'name';
    } else {
      this.orderBy = 'name';
      this.orderDirection = 'desc';
      this.order = 'name';
    }
    this.getUsers();
  }
  orderByEmail() {
    this.page = 0;
    if (this.orderBy === 'email') {
      this.orderDirection = this.orderDirection === 'desc' ? 'asc' : 'desc';
      this.order = this.order === 'mail' ? '-mail' : 'mail';
    } else {
      this.orderBy = 'email';
      this.orderDirection = 'desc';
      this.order = 'mail';
    }
    this.getUsers();
  }

  setPage(page) {
    this.page = page;
    this.getUsers();
  }

}
