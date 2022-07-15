import { AsyncSubject } from "rxjs";

/** AsyncSubject
 * AsyncSubject 比較特殊一點，當 AsyncSubject 物件被建立後，過程中發生任何事件都不會收到資料，
 * 直到 complete() 被呼叫後，才會收到「最後一次事件資料」
 */
const source$ = new AsyncSubject();

source$.subscribe(data => console.log(`AsyncSubject 第一次訂閱: ${data}`));
  
source$.next(1);
source$.next(2);

source$.subscribe(data => console.log(`AsyncSubject 第二次訂閱: ${data}`));

source$.next(3);
source$.next(4);

source$.subscribe(data => console.log(`AsyncSubject 第三次訂閱: ${data}`));

source$.complete();