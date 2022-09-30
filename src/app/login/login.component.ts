import {
  AfterContentChecked,
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  NgZone,
  OnInit, ViewChild
} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import jwt_decode from "jwt-decode";

export interface User{
  name: string;
  email: string;
  picture: string;
}
declare var google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit, AfterViewChecked, AfterContentChecked {

  @ViewChild('loginButton') loginButton: ElementRef;
  @ViewChild('logoutButton') logoutButton: ElementRef;

  title = 'google-sign-in';
  public isAuthenticated=false;
  isLoginDetails: any;
  is_userType: any;
  socialUser: any;
  user: User;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private element: ElementRef,
              private _ngZone: NgZone) {
  }
  ngAfterViewInit(): void {
    console.log('afterviewInit')
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
    } else {
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
    console.log('Oninit');
  }

  logout(){
    this.isAuthenticated=false;
    this.user=null;
  }

  public loginCheckSocial(res: any){
    console.log('user:' + res.user.email)
    if (res.user){
      this.isAuthenticated = true;
      localStorage.setItem('user_email', res.user.email);
      this.user = {
        '\n' +
          'ame'= res.user.name,

      }

      localStorage.setItem('user_name', res.user.name);
      this.user.name='name';

      localStorage.setItem('user_picture', res.user.picture);
      this.user.picture='picture';

      localStorage.setItem('user',res.user);

      this._ngZone.run(() =>{
        this.router.navigate(['login']);
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

  ngAfterViewChecked(){
    console.log('afveiw checked')
    if (!localStorage.getItem('user')){
      // this.loginButton.nativeElement.style.display='none';
      // this.logoutButton.nativeElement.style.display='block';
    }

  }
  ngAfterContentChecked() {
    console.log('afcontent checked')
  }

}
