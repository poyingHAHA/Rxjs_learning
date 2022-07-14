const createEvenOddIterator = (data) => {
  let nextIndex = 0;

  return {
    // 根據 iteratable protocol 實作 [Symbol.iterator] 的方法
    [Symbol.iterator]: () => {
      return {
        // 根據 iterator protocol 實作疊代器走訪規則
        next: () => {
          const currentIndex = nextIndex;
          // 下一個索引值需要加 2
          nextIndex += 2;
          // 如果下一個索引值超過陣列長度，且索引值為偶數時
          // 代表偶數索引走訪完畢，跳到奇數索引的起點
          if (nextIndex >= data.length && nextIndex % 2 == 0) {
            nextIndex = 1;
          }
          
          // 回傳走訪結果，結果為一物件，包含
          // value: 走訪到的值
          // done: 是否走訪完畢
          if (currentIndex < data.length) {
            return {
              value: data[currentIndex],
              done: false
            };
          } else {
            return {
              done: true
            };
          }
        }
      };
    }
  };
};