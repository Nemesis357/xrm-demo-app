import { ActivatedRouteSnapshot, DetachedRouteHandle } from '@angular/router';
import { BaseRouteReuseStrategy } from './base-route-reuse-strategy.service';

export class CustomRouteReuseStrategy extends BaseRouteReuseStrategy {
  private storedRoutes = new Map<string, DetachedRouteHandle>();
  private handlers: { [key: string]: DetachedRouteHandle } = {};

  override shouldDetach(route: ActivatedRouteSnapshot): boolean {
    // console.log('%c *** 1 --- shouldDetach >>> saveComponen, path <<< ***', 'color:green', route.data['saveComponent'], route.routeConfig!.path);
    return route.data['saveComponent'];
  }

  override store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    // console.log('%c *** 2 --- store >>> path <<< ***', 'color:yellow', route.routeConfig!.path);
    this.storedRoutes.set(route.routeConfig!.path!, handle);
  }

  override shouldAttach(route: ActivatedRouteSnapshot): boolean {
    // console.log('%c *** 3 --- shouldAttach >>> path <<< ***', 'color:orange', route.routeConfig!.path, this.storedRoutes.get(route.routeConfig!.path!));
    return !!this.storedRoutes.get(route.routeConfig!.path!);
  }

  override retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle|null  {
    // console.log('%c *** 4 --- retrive >>> path <<< ***', 'color:red', route.routeConfig!.path, this.storedRoutes.get(route.routeConfig!.path!));
    return this.storedRoutes.get(route.routeConfig!.path!) as DetachedRouteHandle;
  }

  // override shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
  //   console.log('%c *** shouldReuseRoute ***', 'color:pink', future.routeConfig, curr.routeConfig);
  //   return future.routeConfig === curr.routeConfig;
  // }

  // private getKey(route: ActivatedRouteSnapshot) {
  //   let key: string;
  //   if (route.component) {
  //     key = route.component['name'];
  //   } else {
  //     key = route.firstChild.component['name'];
  //   }
  //   return key;
  // }
  
  private getKey(route: ActivatedRouteSnapshot): string {
    return route.pathFromRoot
        .map((el: ActivatedRouteSnapshot) => el.routeConfig ? el.routeConfig.path : '')
        .filter(str => str ? str.length > 0 : null)
        .join('');
  }
}
