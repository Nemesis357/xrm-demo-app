import { Directive, ModuleWithProviders, NgModule } from "@angular/core";
import {RouterModule, RouterOutlet, Routes, ExtraOptions, Router} from "@angular/router";

@NgModule()
export class CustomRouter extends RouterModule {
    
    public static forRoot(routes: Routes, config?: ExtraOptions): ModuleWithProviders<RouterModule> {
        // Do something with routes here ...
        return super.forRoot(routes, config);
    }

    public static forChild(routes: Routes, router?: Router): ModuleWithProviders<RouterModule> {
        // Do something with routes here ....
        return super.forChild(routes);
    }

}
