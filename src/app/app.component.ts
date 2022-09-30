import {AfterViewInit, Component, ElementRef, NgZone, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import jwt_decode from "jwt-decode";

declare var google: any;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit{
  title = 'google-sign-in';
  public isAuthenticated=false;
  isLoginDetails: any;
  is_userType: any;
  socialUser: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private element: ElementRef,
              private _ngZone: NgZone) {
  }
  ngAfterViewInit(): void {
    this.isLoggedin();
    let handleCredentialResponse = (response: any)=>{
      const user: any = jwt_decode(response.credential)
      console.log(user);
      const data = {user: user, oauth:'v3'};

      this.loginCheckSocial(data);
    }

    let id = 'google-client-script';
    let script = document.getElementById(id);
    if (script === null){
      let crscript = document.createElement('script');
      crscript.setAttribute('src','https://accounts.google.com/gsi/client');
      crscript.setAttribute('id', id);
      crscript.setAttribute('async',"");
      document.body.appendChild(crscript);
      crscript.onload = () => {
        google.accounts.id.initialize({
          client_id: "642147764094-k9plpfl9lrdbbnlsdn0k049h2m29t435.apps.googleusercontent.com",
          callback: handleCredentialResponse
        });
        google.accounts.id.renderButton(document.getElementById("buttonDiv"), {theme:
        "outline", size: "large"
        });
        google.accounts.id.prompt();
      }
    }else{
      google.accounts.id.initialize({
        client_id: "642147764094-k9plpfl9lrdbbnlsdn0k049h2m29t435.apps.googleusercontent.com",
        callback: handleCredentialResponse
      });
      google.accounts.id.renderButton(document.getElementById("buttonDiv"), {theme:
          "outline", size: "large"
      });
      google.accounts.prompt();
    }
  }

  ngOnInit() {

  }

  public loginCheckSocial(res: any){
    console.log('user:' + res.user.email)
    if (res.user){
      this.isAuthenticated = true;
      this._ngZone.run(() =>{
        this.router.navigate(['/']);
      });
    }else{
      this._ngZone.run(() =>{
        this.router.navigate(['/login']);
      });
    }
  }

  public isLoggedin(){
    // let loggin_status = this.authService.loggedInUserValue();
    // if (loggin_status != null){
    //   this.router.navigate(['/']);
    // }else{
    //
    // }
  }

}
