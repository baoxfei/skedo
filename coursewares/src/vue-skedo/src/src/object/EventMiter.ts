import { Observable } from 'rxjs'
import { Topics } from './Topics'

export default class Emiter {
  private observers
  constructor() {
    this.observers = new Map()
  }
  private addObserver(topic, cb) {
    if (!this.observers.has(topic)) {
      this.observers.set(topic, [])
    }
    this.observers.get(topic)?.push(cb)
  }
   on(topic: Topics | Topics[]) {
    return new Observable((observer) => {
      if (Array.isArray(topic)) {
        topic.forEach((t) => {
          this.addObserver(t, (data) => {
            observer.next(data)
          })
        })
      } else {
        this.addObserver(topic, (data) => {
          observer.next(data)
        })
      }
    })
  }
  emit(topic: Topics, data?: any) {
    if(this.observers.has(topic)) {
      this.observers.get(topic).forEach(fn => {
        fn(data)
      })
    }
  }
}