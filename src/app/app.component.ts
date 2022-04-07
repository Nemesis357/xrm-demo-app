import { Component, ComponentRef, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Iframe } from './shared/interfaces/iframe';
import { IframeService } from './shared/services/iframe.service';

interface Outlet {
  name: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'angular-practice-mk4-xrm-demo';
  outletList : Outlet[] = [];

  iframeList : Iframe[] = [];

  constructor( private router: Router, private iframeService: IframeService ) { }

  ngOnInit() : void {
    // Puni listu outlet-a sa svakom rutom koja ima definisan saveComponent property
    // this.router.config.forEach(route => {
    //   if ( !!route.data && route.data.saveComponent ) {
    //     this.outletList.push({name: route.path || ""})
    //   }
    // })


    this.iframeList = this.iframeService.getIframes();
  }

  onActivate(event: any) {
    
    if ( event && event.route?.snapshot?.data?.independentComponent ) {
      console.log('%c *** SNAP ***', 'color:#bada55', event.route?.snapshot?.data?.independentComponent);
      
    }
  }
  onDeactivate(event: Event) {
    console.log('%c *** onDeactivate ***', 'color:yellow', event);
  }
  onAttach(event: any) {
    console.log('%c *** onAttach ***', 'color:yellow', event);
  }
  onDetach(event: any) {
    console.log('%c *** onDetach ***', 'color:yellow', event);
  }
}
