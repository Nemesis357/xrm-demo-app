import { Directive, ModuleWithProviders, NgModule } from "@angular/core";
import {RouterModule, RouterOutlet, Routes, ExtraOptions, Router} from "@angular/router";

@NgModule()
export class CustomRouter extends RouterModule {
    
    public static forRoot(routes: Routes, config?: ExtraOptions): ModuleWithProviders<RouterModule> {
        // Do something with routes here ...
        console.log('%c *** forRoot ***', 'color:#bada55', );
        return super.forRoot(routes, config);
    }

    public static forChild(routes: Routes, router?: Router): ModuleWithProviders<RouterModule> {
        // Do something with routes here ....
        console.log('%c *** forChild ***', 'color:#bada55', );
        return super.forChild(routes);
    }

}

// @Directive({
//     selector: 'router-outlet'
// })
// export class RouterOutletDirective extends RouterOutlet {

//     constructor(parentOutletMap: RouterOutletMap, _location: ViewContainerRef, name: string) {
//         console.log('%c *** RouterOutletDirective ***', 'color:#bada55', );
//         super(parentOutletMap, _location, name);
//     }
// }


