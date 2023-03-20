import { useEffect, useState } from 'react'
import { $tv } from 'react-tv-focusable';
import './index.less'


function Index() {
  const [dataList] = useState(new Array(20).fill(0))
  useEffect(() => {
    $tv.scrollEl = $tv.getElementByPath('//div[@class="left-nav"]');
    setTimeout(() => {
      $tv.next(document.getElementsByClassName("item-nav"), true);
    }, 10);
    console.log($tv.addFocusableListener(document.getElementsByClassName('item-nav')[0]));
    
    // $tv.addFocusableListener(document.getElementsByClassName('item-nav'), "onFocus",()=>{
    //   $tv.scrollEl = $tv.getElementByPath('//div[@class="left-nav"]');
    // });
    // $tv.addFocusableListener(document.getElementsByClassName('right'), "onFocus",()=>{
    //   $tv.scrollEl = $tv.getElementByPath('//div[@class="right-nav"]');
    // });
  }, [])

  return (
    <div className="cloudpage">
      <div className='head'></div>
      <div className='counts'>
        <div className='left-nav'>
          {dataList.map((_, idx) => (
            <div className='c-main s-sm item-nav' focusable='' key={idx}>优品影视{idx}</div>
          ))}
        </div>
        <div className='right-nav'>
          {dataList.map((_, idx) => (
            <div className='c-main s-sm right item-nav' focusable='' key={idx}>优品影视{idx}</div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Index
