import { FocusEngine, FocusScroll } from '@/components/focus-engine';
import "./index.less"

export default function MyPage() {
  return (
    <>
      <FocusEngine className="index-box">
        <FocusEngine.Item className='index-item' priority={6}>222</FocusEngine.Item>
        <FocusScroll scrollOrientation='y' style={{ height: "300px", marginTop: "200px" }}>
          <FocusEngine.Item className='index-item' priority={5}>6</FocusEngine.Item>
          <FocusEngine.Item className='index-item' priority={5}>7</FocusEngine.Item>
          <FocusEngine.Item className='index-item' priority={5}>8</FocusEngine.Item>
          <FocusEngine.Item className='index-item' priority={5}>9</FocusEngine.Item>
          <FocusEngine.Item className='index-item' priority={5}>10</FocusEngine.Item>
          <FocusEngine.Item className='index-item' priority={5}>11</FocusEngine.Item>
          <FocusEngine.Item className='index-item' priority={5}>7</FocusEngine.Item>
          <FocusEngine.Item className='index-item' priority={5}>8</FocusEngine.Item>
          <FocusEngine.Item className='index-item' priority={5}>9</FocusEngine.Item>
          <FocusEngine.Item className='index-item' priority={5}>10</FocusEngine.Item>
          <FocusEngine.Item className='index-item' priority={5}>11</FocusEngine.Item>
          <FocusEngine.Item className='index-item' priority={5}>7</FocusEngine.Item>
          <FocusEngine.Item className='index-item' priority={5}>8</FocusEngine.Item>
          <FocusEngine.Item className='index-item' priority={5}>9</FocusEngine.Item>
          <FocusEngine.Item className='index-item' priority={5}>10</FocusEngine.Item>
          <FocusEngine.Item className='index-item' priority={5}>11</FocusEngine.Item>
        </FocusScroll>
        <FocusEngine.Item className='index-item' style={{ height: "200px" }} priority={5}>5</FocusEngine.Item>
        <FocusEngine.Item className='index-item' style={{ marginTop: "200px" }} priority={5}>12</FocusEngine.Item>
        <div>
          <FocusEngine.Item className='index-item' priority={5}>6</FocusEngine.Item>
          <FocusEngine.Item className='index-item' priority={5}>7</FocusEngine.Item>
          <FocusEngine.Item className='index-item' priority={5}>8</FocusEngine.Item>
          <FocusEngine.Item className='index-item' priority={5}>9</FocusEngine.Item>
          <FocusEngine.Item className='index-item' priority={5}>10</FocusEngine.Item>
          <FocusEngine.Item className='index-item' priority={5}>11</FocusEngine.Item>
        </div>
        <div>
          <FocusEngine.Item className='index-item' priority={5}>12</FocusEngine.Item>
        </div>
      </FocusEngine>
    </>
  );
}
