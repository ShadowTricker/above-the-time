import { Subscription } from "rxjs";

export class RouterOutlet extends HTMLElement {
  static router;
  private shadowWrapper;
  private cacheComponent = null;
  private subscription: Subscription;

  constructor() {
    super();
    this.shadowWrapper = this.attachShadow({ mode: "closed" });
    this.initialized();
  }

  private initialized(): void {
    this.subscription = RouterOutlet.router.popStateChange.subscribe(({ url, params, components }) => {
      const level = this.getAttribute('level');
      const component = components[level];
      if (this.cacheComponent === component) {
        return;
      }
      this.shadowWrapper.innerHTML = component.replace(/\{(.+)\}/g, (full, g1) => params[g1]);
      this.cacheComponent = component;
    });
  }

  disconnectedCallback(): void {
    this.subscription.unsubscribe();
  }
}
