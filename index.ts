import { AddressComponent } from "./components/address.component";
import { createElement } from './utils/create-element';
import { Subject } from 'rxjs';
import { listenable } from "./utils/decorators";


const stateListen = new Subject<void>();
// browser
const addrBrowser = listenable(stateListen)(new AddressComponent("browser"));
let curBrowserDOM = createElement(addrBrowser.render());
document.body.append(curBrowserDOM);
// origin
/* const addrOrigin = listenable(stateListen)(new AddressComponent("origin"));
let curOriginDOM = createElement(addrOrigin.render());
document.body.append(curOriginDOM); */
stateListen.subscribe(() => {
  // browser
  let newBrowserDOM = createElement(addrBrowser.render());
  document.body.replaceChild(newBrowserDOM as Node, curBrowserDOM as Node);
  curBrowserDOM = newBrowserDOM;

  // origin
  /* let newOriginDOM = createElement(addrOrigin.render());
  document.body.replaceChild(newOriginDOM as Node, curOriginDOM as Node);
  curOriginDOM = newOriginDOM; */
});

