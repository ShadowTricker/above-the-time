import { Subject } from 'rxjs';

/* export function listenable(subject: any) {
  return (target) => {
    target.prototype.emitter = subject;
  }
} */

export function listenable(subject: any) {
  return (target) => {
    target.emitter = subject;
    return target;
  }
}