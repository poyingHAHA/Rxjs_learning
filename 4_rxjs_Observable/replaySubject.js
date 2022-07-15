import { ReplaySubject } from "rxjs";

/** ReplaySubject
 * ReplaySubject 有「重播」的意思，ReplaySubject 會幫我們保留最近 N 次的事件資料，
 * 並在訂閱時重播這些發生過的事件資料給訂閱者，跟 BehaviorSubject 類似，都有 cache 的概念，只是更有彈性。
 */

// 設定「重播」最近 3 次資料給訂閱者
const source$ = new ReplaySubject(3);

source$.subscribe((data) => console.log(`ReplaySubject 第一次訂閱: ${data}`));

source$.next(1);
source$.next(2);

source$.subscribe((data) => console.log(`ReplaySubject 第二次訂閱: ${data}`));

source$.next(3);
source$.next(4)

source$.subscribe((data) => console.log(`ReplaySubject 第三次訂閱: ${data}`));

