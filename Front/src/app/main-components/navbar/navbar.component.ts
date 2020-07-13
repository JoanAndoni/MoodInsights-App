import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() public isLoggedIn: boolean;
  user: any = {};
  public navbarCollapsed = true;

  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.isLoggedIn = this.authService.isAuthenticated();
  }

  changeOfRoutes() {
    this.isLoggedIn = this.authService.isAuthenticated();
    if (this.isLoggedIn) {
      this.user = this.userService.getUser();
    }
  }

}
