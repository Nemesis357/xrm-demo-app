import {Attribute, ChangeDetectorRef, ComponentFactoryResolver, ComponentRef, Directive, EventEmitter, Injector, OnDestroy, OnInit, Output, ViewContainerRef,} from '@angular/core';
import { ActivatedRoute, ChildrenOutletContexts, Data, PRIMARY_OUTLET } from '@angular/router';
import { IframeService } from '../services/iframe.service';
export interface RouterOutletContract {
  /**
   * Whether the given outlet is activated.
   *
   * An outlet is considered "activated" if it has an active component.
   */
  isActivated: boolean;

  /** The instance of the activated component or `null` if the outlet is not activated. */
  component: Object|null;

  /**
   * The `Data` of the `ActivatedRoute` snapshot.
   */
  activatedRouteData: Data;

  /**
   * The `ActivatedRoute` for the outlet or `null` if the outlet is not activated.
   */
  activatedRoute: ActivatedRoute|null;

  /**
   * Called by the `Router` when the outlet should activate (create a component).
   */
  activateWith(activatedRoute: ActivatedRoute, resolver: ComponentFactoryResolver|null): void;

  /**
   * A request to destroy the currently activated component.
   *
   * When a `RouteReuseStrategy` indicates that an `ActivatedRoute` should be removed but stored for
   * later re-use rather than destroyed, the `Router` will call `detach` instead.
   */
  deactivate(): void;

  /**
   * Called when the `RouteReuseStrategy` instructs to detach the subtree.
   *
   * This is similar to `deactivate`, but the activated component should _not_ be destroyed.
   * Instead, it is returned so that it can be reattached later via the `attach` method.
   */
  detach(): ComponentRef<unknown>;

  /**
   * Called when the `RouteReuseStrategy` instructs to re-attach a previously detached subtree.
   */
  attach(ref: ComponentRef<unknown>, activatedRoute: ActivatedRoute): void;

  /**
   * Emits an activate event when a new component is instantiated
   **/
  activateEvents?: EventEmitter<unknown>;

  /**
   * Emits a deactivate event when a component is destroyed.
   */
  deactivateEvents?: EventEmitter<unknown>;

  /**
   * Emits an attached component instance when the `RouteReuseStrategy` instructs to re-attach a
   * previously detached subtree.
   **/
  attachEvents?: EventEmitter<unknown>;

  /**
   * Emits a detached component instance when the `RouteReuseStrategy` instructs to detach the
   * subtree.
   */
  detachEvents?: EventEmitter<unknown>;
}

/**
 * @description
 *
 * Acts as a placeholder that Angular dynamically fills based on the current router state.
 *
 * Each outlet can have a unique name, determined by the optional `name` attribute.
 * The name cannot be set or changed dynamically. If not set, default value is "primary".
 *
 * ```
 * <router-outlet></router-outlet>
 * <router-outlet name='left'></router-outlet>
 * <router-outlet name='right'></router-outlet>
 * ```
 *
 * Named outlets can be the targets of secondary routes.
 * The `Route` object for a secondary route has an `outlet` property to identify the target outlet:
 *
 * `{path: <base-path>, component: <component>, outlet: <target_outlet_name>}`
 *
 * Using named outlets and secondary routes, you can target multiple outlets in
 * the same `RouterLink` directive.
 *
 * The router keeps track of separate branches in a navigation tree for each named outlet and
 * generates a representation of that tree in the URL.
 * The URL for a secondary route uses the following syntax to specify both the primary and secondary
 * routes at the same time:
 *
 * `http://base-path/primary-route-path(outlet-name:route-path)`
 *
 * A router outlet emits an activate event when a new component is instantiated,
 * deactivate event when a component is destroyed.
 * An attached event emits when the `RouteReuseStrategy` instructs the outlet to reattach the
 * subtree, and the detached event emits when the `RouteReuseStrategy` instructs the outlet to
 * detach the subtree.
 *
 * ```
 * <router-outlet
 *   (activate)='onActivate($event)'
 *   (deactivate)='onDeactivate($event)'
 *   (attach)='onAttach($event)'
 *   (detach)='onDetach($event)'></router-outlet>
 * ```
 *
 * @see [Routing tutorial](guide/router-tutorial-toh#named-outlets "Example of a named
 * outlet and secondary route configuration").
 * @see `RouterLink`
 * @see `Route`
 * @ngModule RouterModule
 *
 * @publicApi
 */
@Directive({selector: 'app-router-outlet'})
export class RouterOutlet implements OnDestroy, OnInit, RouterOutletContract {
  private activated: ComponentRef<any>|null = null;
  private _activatedRoute: ActivatedRoute|null = null;
  private name: string;

  @Output('activate') activateEvents = new EventEmitter<any>();
  @Output('deactivate') deactivateEvents = new EventEmitter<any>();
  /**
   * Emits an attached component instance when the `RouteReuseStrategy` instructs to re-attach a
   * previously detached subtree.
   **/
  @Output('attach') attachEvents = new EventEmitter<unknown>();
  /**
   * Emits a detached component instance when the `RouteReuseStrategy` instructs to detach the
   * subtree.
   */
  @Output('detach') detachEvents = new EventEmitter<unknown>();

  constructor(
      private parentContexts: ChildrenOutletContexts, private location: ViewContainerRef,
      private resolver: ComponentFactoryResolver, @Attribute('name') name: string,
      private changeDetector: ChangeDetectorRef,
      private iframeService: IframeService
  ) {
    this.name = name || PRIMARY_OUTLET;
    parentContexts.onChildOutletCreated(this.name, this);
  }

  /** @nodoc */
  ngOnDestroy(): void {
    this.parentContexts.onChildOutletDestroyed(this.name);
  }

  /** @nodoc */
  ngOnInit(): void {
    if (!this.activated) {
      // If the outlet was not instantiated at the time the route got activated we need to populate
      // the outlet when it is initialized (ie inside a NgIf)
      const context = this.parentContexts.getContext(this.name);
      if (context && context.route) {
        if (context.attachRef) {
          // `attachRef` is populated when there is an existing component to mount
          this.attach(context.attachRef, context.route);
        } else {
          // otherwise the component defined in the configuration is created
          this.activateWith(context.route, context.resolver || null);
        }
      }
    }
  }

  get isActivated(): boolean {
    return !!this.activated;
  }

  /**
   * @returns The currently activated component instance.
   * @throws An error if the outlet is not activated.
   */
  get component(): Object {
    if (!this.activated) throw new Error('Outlet is not activated');
    return this.activated.instance;
  }

  get activatedRoute(): ActivatedRoute {
    if (!this.activated) throw new Error('Outlet is not activated');
    return this._activatedRoute as ActivatedRoute;
  }

  get activatedRouteData(): Data {
    if (this._activatedRoute) {
      return this._activatedRoute.snapshot.data;
    }
    return {};
  }

  /**
   * Called when the `RouteReuseStrategy` instructs to detach the subtree
   */
  detach(): ComponentRef<any> {
    if (!this.activated) throw new Error('Outlet is not activated');
    this.location.detach();
    const cmp = this.activated;
    this.activated = null;
    this._activatedRoute = null;
    this.detachEvents.emit(cmp.instance);
    return cmp;
  }

  /**
   * Called when the `RouteReuseStrategy` instructs to re-attach a previously detached subtree
   */
  attach(ref: ComponentRef<any>, activatedRoute: ActivatedRoute) {
    this.activated = ref;
    this._activatedRoute = activatedRoute;
    this.location.insert(ref.hostView);
    this.attachEvents.emit(ref.instance);
  }

  deactivate(): void {
    if (this.activated) {
      const c = this.component;
      // this.activated.destroy();
      this.activated = null;
      this._activatedRoute = null;
      this.deactivateEvents.emit(c);
    }
  }

  activateWith(activatedRoute: ActivatedRoute, resolver: ComponentFactoryResolver|null) {
    if (this.isActivated) {
      throw new Error('Cannot activate an already activated outlet');
    }
    this._activatedRoute = activatedRoute;
    const snapshot = activatedRoute.snapshot;

    // console.log('%c *** activatedWith -snapshot- ***', 'color:#bada55', snapshot.data.independentComponent);
    // if ( snapshot.data.independentComponent ) {
    //   this.iframeService.addIframe(snapshot.data.frame);
    //   return;
    // }


    const component = <any>snapshot.routeConfig!.component;
    resolver = resolver || this.resolver;
    const factory = resolver.resolveComponentFactory(component);
    const childContexts = this.parentContexts.getOrCreateContext(this.name).children;
    const injector = new OutletInjector(activatedRoute, childContexts, this.location.injector);
    this.activated = this.location.createComponent(factory, this.location.length, injector);
    // Calling `markForCheck` to make sure we will run the change detection when the
    // `RouterOutlet` is inside a `ChangeDetectionStrategy.OnPush` component.
    this.changeDetector.markForCheck();
    this.activateEvents.emit(this.activated.instance);
  }
}

class OutletInjector implements Injector {
  constructor(
      private route: ActivatedRoute, private childContexts: ChildrenOutletContexts,
      private parent: Injector) {}

  get(token: any, notFoundValue?: any): any {
    if (token === ActivatedRoute) {
      return this.route;
    }

    if (token === ChildrenOutletContexts) {
      return this.childContexts;
    }

    return this.parent.get(token, notFoundValue);
  }
}
















// import { Directive, Attribute, ViewContainerRef, ComponentFactoryResolver, ChangeDetectorRef, Input, ComponentRef } from '@angular/core';
// import { ActivatedRoute, ChildrenOutletContexts, Router, RouterOutlet, Routes } from '@angular/router';

// @Directive({
//   selector: 'app-router-outlet'
// })
// export class RouterOutletDirective extends RouterOutlet {

//   constructor(ptContexts: ChildrenOutletContexts, loc: ViewContainerRef, rslr: ComponentFactoryResolver, changeDetector: ChangeDetectorRef) {
//     super(ptContexts, loc, rslr, '', changeDetector);
//     console.log('%c *** Custom router constructor ***', 'color:orange', );
//   }

//   attach(ref: ComponentRef<any>, activatedRoute: ActivatedRoute) {
//     console.log('%c *** attach ***', 'color:yellow', );
//     // this.super().activated = ref;
//     // this._activatedRoute = activatedRoute;
//     // this.location.insert(ref.hostView);
//     // this.attachEvents.emit(ref.instance);
//   }

//   activateWith(activatedRoute: ActivatedRoute, resolver: ComponentFactoryResolver|null) {
//     if (this.isActivated) {
//       throw new Error('Cannot activate an already activated outlet');
//     }
//     this._activatedRoute = activatedRoute;
//     const snapshot = activatedRoute._futureSnapshot;
//     const component = <any>snapshot.routeConfig!.component;
//     resolver = resolver || this.resolver;
//     const factory = resolver.resolveComponentFactory(component);
//     const childContexts = this.parentContexts.getOrCreateContext(this.name).children;
//     const injector = new OutletInjector(activatedRoute, childContexts, this.location.injector);
//     this.activated = this.location.createComponent(factory, this.location.length, injector);
//     // Calling `markForCheck` to make sure we will run the change detection when the
//     // `RouterOutlet` is inside a `ChangeDetectionStrategy.OnPush` component.
//     this.changeDetector.markForCheck();
//     this.activateEvents.emit(this.activated.instance);
//   }
// }
