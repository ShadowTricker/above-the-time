import { AddressComponent } from "./components/address.component";
import { createElement } from './utils/create-element';
import { Subject } from 'rxjs';
import { listenable } from "./utils/decorators";


const stateListen = new Subject<void>();
const addressComponent = listenable(stateListen)(new AddressComponent("browser"));
let curDOM = createElement(addressComponent.render());
document.body.append(curDOM);
stateListen.subscribe(() => {
  let newDOM = createElement(addressComponent.render());
  document.body.replaceChild(newDOM as Node, curDOM as Node);
  curDOM = newDOM;
});

