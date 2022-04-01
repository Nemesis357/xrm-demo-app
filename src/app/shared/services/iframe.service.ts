import { Injectable } from '@angular/core';
import { Iframe } from '../interfaces/iframe';

@Injectable({
  providedIn: 'root'
})
export class IframeService {
  iframeList: Iframe[] =  [];

  constructor() { }

  addIframe(iframe: Iframe): void {
    let frameExists = this.iframeList.find(frame => frame.id === iframe.id);
    console.log('%c *** frameExists ***', 'color:#bada55', frameExists);

    if ( !frameExists ) {
      this.iframeList.push(iframe);
    }
  }

  getIframes() : Iframe[] {
    return this.iframeList;
  }
}
