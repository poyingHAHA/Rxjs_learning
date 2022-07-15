import { Subject } from "rxjs";

/** 共用 API - asObservable
 * 所有的 Subject 系列都有一個共用且常用的 API，稱為 asObservable，
 * 它的用途是將 Subject 當作 Observable 回傳，這樣有什麼好處呢？
 * 由於 Observable 並沒有 next()、complete() 和 error() 這樣的 API，
 * 因此可以讓得到這個 Observable 物件的程式專注在資料流訂閱相關的處理就好，
 * 而不被允許發送新的事件
 */
class Student{
  _score$ = new Subject();

  get(){
    return this._score$.asObservable();
  }

  updateScore(score){
    // 大於 60 分才允許推送成績事件
    if(score > 60){
      this._score$.next(score);
    }
  }
}

const stu = new Student();

stu.get().subscribe(score => {
  console.log(`目前成績：${score}`);
});

stu.updateScore(70); // 目前成績: 70
stu.updateScore(50); // (沒有任何反應)
stu.updateScore(80); // 目前成績: 80
try {
  stu.get().next(50); // (錯誤：next is not a function)
} catch (error) {
  console.log(error)
}