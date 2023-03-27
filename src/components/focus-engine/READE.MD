## 简介
这是一个tv端的焦点引擎组件，由遥控器上下左右控制焦点元素是否聚焦


## 基础用法
<!-- 
 focusId：默认选中焦点元素的id，修改此id会直接将焦点指定到相应的焦点元素上

 -->
```tsx
import { FocusEngine } from '@/components/focus-engine';
<FocusEngine focusId>
  <FocusEngine.Item>222</FocusEngine.Item>
  <FocusEngine.Item>222</FocusEngine.Item>
  <FocusEngine.Item>222</FocusEngine.Item>
  <FocusEngine.Item>222</FocusEngine.Item>
</FocusEngine>
```

## 是否聚焦
# renderProps
<!-- 
  isFocus:是否聚焦，true：聚焦,会在元素中添加一个widget-focus的class名 false：未聚焦，会在元素中添加一个widget-unfocus的class名
  isSelected:此参数单指在scroll中的元素是否被缓存选中。对应的class为widget-selected/widget-unselected
  id:当前元素的id
 -->
```tsx
import { FocusEngine } from '@/components/focus-engine';
<FocusEngine>
  {/*  
  以此焦点元素为基础，指定跳转至相应的最近的焦点元素
  rightGo?: string[],
  leftGo?: string[],
  upGo?: string[],
  downGo?: string[],
  */}
  <FocusEngine.Item renderProps={({isFocus, isSelected, id}) => <div>{isSelected ? "1" : "2"}</div>}></FocusEngine.Item>
  <FocusEngine.Item>哈哈哈</FocusEngine.Item>
</FocusEngine>
```

## FocusScroll
<!-- 
scrollOrientation: "x" | "y"：滚动轴方向

offsetDistance?: number | "center"：距离边缘的距离

selectId?: string：缓存的焦点元素id用于指定默认的选中项，注意不是默认的聚焦项，指定selectId之后相应id的焦点元素的isSelected为true
 -->
```tsx
import { FocusEngine, FocusScroll } from '@/components/focus-engine';
<FocusScroll scrollOrientation='y'>
  <FocusEngine.Item></FocusEngine.Item>
</FocusScroll>
```
## 弹窗使用案例
<!-- 
页面中的FocusEngine需要根据弹窗的显隐设置是否监听键盘按键
弹窗也同理
 -->
```tsx
import { FocusEngine, FocusScroll } from '@/components/focus-engine';
import { useState } from 'react';
import { produstList } from "./data"
import "./index.less"

export default function MyPage() {
  const [datalist] = useState(produstList)
  const [showPopup, setShowPopup] = useState(false)

  return (
    <>
      <FocusEngine className="index-box bg-black" listenerKeydown={!showPopup}>
        <FocusScroll className='left-scroll' scrollOrientation='y'>
          {datalist.map((val, idx) => (
            <FocusEngine.Item className='box-item' key={idx} onClick={() => setShowPopup(true)}>{val.productName}</FocusEngine.Item>
          ))}
        </FocusScroll>
      </FocusEngine>
      {/* 弹窗 */}
      <FocusEngine className="index-box focus-popup" hidden={!showPopup} listenerKeydown={showPopup}>
        <FocusScroll className='left-scroll scroll1' scrollOrientation='y'>
          {produstList.map((val, idx) => (
            <FocusEngine.Item className='box-item' key={idx} onClick={() => {
              setShowPopup(false)
            }}>{val.productName}</FocusEngine.Item>
          ))}
        </FocusScroll>
      </FocusEngine>
    </>
  );
}
```