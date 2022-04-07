import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { DataService } from './data.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IframeService } from './iframe.service';
import { Iframe } from '../interfaces/iframe';

@Injectable({
  providedIn: 'root'
})
export class ResolverService implements Resolve<any> {

  constructor( private dataService: DataService, private iframeService: IframeService, public router: Router ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    
    if ( route.data && route.data.independentComponent ) {
      return new Observable( observer => {
        console.log('%c *** Observer complete ***', 'color:#bada55', );

        let payload : Iframe = {
          id: "homeIframe652719",
          name: "homeIframe",
          src: "/home"
        }
        this.iframeService.addIframe(payload);

        return observer.complete();
      })
    }

    return this.dataService.getPhotos().pipe(
      catchError(error => {
        return of('No data');
      })
    );
  }
}
