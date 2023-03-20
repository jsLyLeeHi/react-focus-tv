import { FocusEngine } from '@/components/focus-engine';
import "./index.less"

export default function MyPage() {
  return (
    <>
      <FocusEngine className="index-box">
        <FocusEngine.Item className='index-item' priority={1}>1</FocusEngine.Item>
        <FocusEngine.Item className='index-item' priority={0}>2</FocusEngine.Item>
        <FocusEngine.Item className='index-item' priority={2}>3</FocusEngine.Item>
        <FocusEngine.Item className='index-item' priority={4}>22</FocusEngine.Item>
        <FocusEngine.Item className='index-item' style={{ width: "140px" }} priority={3}>4</FocusEngine.Item>
        <FocusEngine.Item className='index-item' priority={6}>222</FocusEngine.Item>
        <FocusEngine.Item className='index-item' style={{ height: "200px" }} priority={5}>5</FocusEngine.Item>
      </FocusEngine>
      <FocusEngine className="index-box">
        <FocusEngine.Item className='index-item' priority={1}>1</FocusEngine.Item>
        <FocusEngine.Item className='index-item' priority={0}>2</FocusEngine.Item>
        <FocusEngine.Item className='index-item' priority={2}>3</FocusEngine.Item>
        <FocusEngine.Item className='index-item' priority={4}>22</FocusEngine.Item>
        <FocusEngine.Item className='index-item' style={{ width: "140px" }} priority={3}>4</FocusEngine.Item>
        <FocusEngine.Item className='index-item' priority={6}>222</FocusEngine.Item>
        <FocusEngine.Item className='index-item' style={{ height: "200px" }} priority={5}>5</FocusEngine.Item>
        <div></div>
        <div>
          <FocusEngine.Item className='index-item' priority={5}>6</FocusEngine.Item>
          <FocusEngine.Item className='index-item' priority={5}>7</FocusEngine.Item>
          <div>
            <FocusEngine.Item className='index-item' priority={5}>8</FocusEngine.Item>
            <FocusEngine.Item className='index-item' priority={5}>9</FocusEngine.Item>
            <div>

              <FocusEngine.Item className='index-item' priority={5}>10</FocusEngine.Item>
              <FocusEngine.Item className='index-item' priority={5}>11</FocusEngine.Item>
            </div>
          </div>
        </div>
        <div>
          <FocusEngine.Item className='index-item' priority={5}>12</FocusEngine.Item>
        </div>
      </FocusEngine>
    </>
  );
}
