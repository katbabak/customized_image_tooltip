import {
  OnDestroy,
  OnInit
} from '@angular/core';
import { Subject } from 'rxjs';

export class BaseComponent implements OnInit, OnDestroy {
  protected unsubscribe: Subject<void> = new Subject();

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  ngOnInit(): void {
  }

}
