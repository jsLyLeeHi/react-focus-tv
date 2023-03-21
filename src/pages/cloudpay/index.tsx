import { FocusEngine, FocusScroll } from '@/components/focus-engine';
import { useEffect, useState } from 'react';
import "./index.less"

export default function MyPage() {
  const [focusId, setFocusId] = useState<string>()
  useEffect(() => {
    setTimeout(() => {
      setFocusId("sadfashdfsf")
    }, 1000);
  }, [])
  return (
    <>
      <FocusEngine className="index-box" focusId={focusId}>
        <FocusEngine.Item className='index-item'>222</FocusEngine.Item>
        <FocusScroll cacheFocus scrollOrientation='y' style={{ height: "300px", marginTop: "100px" }}>
          <FocusEngine.Item className='index-item'>6</FocusEngine.Item>
          <FocusEngine.Item className='index-item'>7</FocusEngine.Item>
          <FocusEngine.Item className='index-item'>8</FocusEngine.Item>
          <FocusEngine.Item className='index-item'>9</FocusEngine.Item>
          <FocusEngine.Item className='index-item'>10</FocusEngine.Item>
          <FocusEngine.Item className='index-item'>11</FocusEngine.Item>
          <FocusEngine.Item className='index-item'>7</FocusEngine.Item>
          <FocusEngine.Item className='index-item'>8</FocusEngine.Item>
          <FocusEngine.Item className='index-item'>9</FocusEngine.Item>
          <FocusEngine.Item className='index-item'>10</FocusEngine.Item>
          <FocusEngine.Item className='index-item'>11</FocusEngine.Item>
          <FocusEngine.Item className='index-item'>7</FocusEngine.Item>
          <FocusEngine.Item className='index-item'>8</FocusEngine.Item>
          <FocusEngine.Item className='index-item'>9</FocusEngine.Item>
          <FocusEngine.Item className='index-item'>10</FocusEngine.Item>
          <FocusEngine.Item className='index-item'>11</FocusEngine.Item>
        </FocusScroll>
        <FocusScroll cacheFocus scrollOrientation='y' style={{ height: "300px", marginTop: "50px" }}>
          <FocusEngine.Item className='index-item'>6</FocusEngine.Item>
          <FocusEngine.Item className='index-item'>7</FocusEngine.Item>
          <FocusEngine.Item className='index-item'>8</FocusEngine.Item>
          <FocusEngine.Item className='index-item'>9</FocusEngine.Item>
          <FocusEngine.Item className='index-item'>10</FocusEngine.Item>
          <FocusEngine.Item className='index-item'>11</FocusEngine.Item>
          <FocusEngine.Item className='index-item'>7</FocusEngine.Item>
          <FocusEngine.Item className='index-item'>8</FocusEngine.Item>
          <FocusEngine.Item className='index-item'>9</FocusEngine.Item>
          <FocusEngine.Item className='index-item'>10</FocusEngine.Item>
          <FocusEngine.Item className='index-item'>11</FocusEngine.Item>
          <FocusEngine.Item className='index-item'>7</FocusEngine.Item>
          <FocusEngine.Item className='index-item'>8</FocusEngine.Item>
          <FocusEngine.Item className='index-item'>9</FocusEngine.Item>
          <FocusEngine.Item className='index-item'>10</FocusEngine.Item>
          <FocusEngine.Item className='index-item'>11</FocusEngine.Item>
        </FocusScroll>
        <FocusEngine.Item className='index-item' id='sadfashdfsf' style={{ height: "200px" }}>5</FocusEngine.Item>
        <FocusEngine.Item className='index-item' style={{ marginTop: "200px" }}>12</FocusEngine.Item>
        <div>
          <FocusEngine.Item className='index-item'>6</FocusEngine.Item>
          <FocusEngine.Item className='index-item'>7</FocusEngine.Item>
          <FocusEngine.Item className='index-item'>8</FocusEngine.Item>
          <FocusEngine.Item className='index-item'>9</FocusEngine.Item>
          <FocusEngine.Item className='index-item'>10</FocusEngine.Item>
          <FocusEngine.Item className='index-item'>11</FocusEngine.Item>
        </div>
        <div>
          <FocusEngine.Item className='index-item'>12</FocusEngine.Item>
        </div>
      </FocusEngine>
    </>
  );
}
