import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import {Router} from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { popupCenter } from '../../../../common/constants.js';
import _ from 'lodash';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  user: User;
  isEditingFields = false;

  connectedAccounts = {
    FB: false,
    TW: false,
    SP: false,
  }

  constructor(
    public userService: UserService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.fetchUserInformation();
    this.fbLibrary();
  }

  fbLibrary() {
    (window as any).fbAsyncInit = function() {
      window['FB'].init({
        appId      : '238006450839165',
        cookie     : true,
        xfbml      : true,
        version    : 'v3.1'
      });
      window['FB'].AppEvents.logPageView();
    };
 
    (function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = "https://connect.facebook.net/en_US/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));
  }

  fetchUserInformation() {
    this.user = this.userService.getUser();
    if (this.user.connectedAccounts.facebook && !_.isEmpty(this.user.connectedAccounts.facebook)) {
      this.connectedAccounts.FB = true;
    }

    if (this.user.connectedAccounts.spotify && !_.isEmpty(this.user.connectedAccounts.spotify)) {
      this.connectedAccounts.SP = true;
    }
  }

  async editFields() {
    if (this.isEditingFields) {
      try{
        await this.userService.updateUser(this.user);
        this.userService.setUser(this.user);
      } catch (err) {
        alert('No se pudo actualizar el usuario');
        console.log(err);
      }
    }
    this.isEditingFields = !this.isEditingFields;
  }

  cancelEditFields() {
    this.user = this.userService.getUser();
    this.isEditingFields = false;
  }

  async connectFB() {
    if (this.connectedAccounts.FB) {
      try {
        await this.userService.disconnectFB();
        this.user.connectedAccounts.fbToken = null;
        this.userService.setUser({...this.user});
        this.connectedAccounts.FB = false;
      } catch (err) {
        console.log(err);
      }
      return;
    }
    const scopes = [
      'email',
      'user_posts',
      'user_likes',
      'user_photos',
    ];
    const self = this;
    window['FB'].login(async (response) => {
      if (response.authResponse) {
        self.connectedAccounts.FB = true;
        self.user.connectedAccounts.fbToken = response.authResponse.accessToken;
       
        try {
          await self.userService.connectFB(response.authResponse.accessToken, response.authResponse.userID);
          self.userService.setUser({...self.user});
        } catch (err) {
          console.log(err);
        }
      } else {
        console.log('User login failed');
      }
    }, {scope: scopes.join(',')});
  }

  connectTW() {
    // TODO: connect/disconnect TW account

    this.connectedAccounts.TW = !this.connectedAccounts.TW;
  }

  async connectSP() {
    if (this.connectedAccounts.SP) {
      try {
        await this.userService.disconnectSpotify();
        this.connectedAccounts.SP = false;
      } catch (err) {
        alert('No se pudo desconectar Spotify');
        console.log(err);
      }
      return;
    }
    const redirectUri = `http://localhost:3500/spotify/callback`;
    const scopes = 'user-read-recently-played';
    const url = `https://accounts.spotify.com/authorize?&client_id=c35423eeee2248ea8963fbb1ebd560a5&redirect_uri=${encodeURI(
      redirectUri
    )}&response_type=code&scope=${scopes}&state=${this.user._id}`;
    popupCenter(url, 'Spotify', 500, 600);
    // this.connectedAccounts.SP = !this.connectedAccounts.SP;
  }

  signOut() {
    this.authService.signOut();
    this.router.navigate(['/']);
  }

}
