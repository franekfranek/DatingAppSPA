import { TimeagoClock } from 'ngx-timeago';
import { Observable, interval } from 'rxjs';

// ticks every 2s
export class MyClock extends TimeagoClock {
  tick(then: number): Observable<number> {
    return interval(60000);
  }
}
