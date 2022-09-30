import {AfterViewInit, Component, ElementRef, NgZone, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import jwt_decode from "jwt-decode";

declare var google: any;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  ngOnInit() {

  }

}
