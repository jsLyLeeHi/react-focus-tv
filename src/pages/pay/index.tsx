import { FocusEngine } from '@/components/focus-engine';
import "./index.less"

export default function MyPage() {
  return (
    <>
      <FocusEngine className="pay-page">
        <FocusEngine.Item className='index-item'>1</FocusEngine.Item>
        <FocusEngine.Item className='index-item'>2</FocusEngine.Item>
        <FocusEngine.Item className='index-item'>3</FocusEngine.Item>
        <FocusEngine.Item className='index-item'>22</FocusEngine.Item>
        <FocusEngine.Item className='index-item' style={{ width: "140px" }}>4</FocusEngine.Item>
        <FocusEngine.Item className='index-item'>222</FocusEngine.Item>
        <FocusEngine.Item className='index-item' style={{ height: "200px" }}>5</FocusEngine.Item>
        <FocusEngine.Item className='index-item'>1</FocusEngine.Item>
        <FocusEngine.Item className='index-item'>2</FocusEngine.Item>
        <FocusEngine.Item className='index-item'>3</FocusEngine.Item>
        <FocusEngine.Item className='index-item'>22</FocusEngine.Item>
        <FocusEngine.Item className='index-item' style={{ width: "140px" }}>4</FocusEngine.Item>
        <FocusEngine.Item className='index-item'>222</FocusEngine.Item>
        <FocusEngine.Item className='index-item' style={{ height: "200px",marginTop:"62px" }}>5</FocusEngine.Item>
        <div></div>
        <div>
          <FocusEngine.Item className='index-item'>6</FocusEngine.Item>
          <FocusEngine.Item className='index-item'>7</FocusEngine.Item>
          <div>
            <FocusEngine.Item className='index-item'>8</FocusEngine.Item>
            <FocusEngine.Item className='index-item'>9</FocusEngine.Item>
            <div>

              <FocusEngine.Item className='index-item'>10</FocusEngine.Item>
              <FocusEngine.Item className='index-item'>11</FocusEngine.Item>
            </div>
          </div>
        </div>
        <div>
          <FocusEngine.Item className='index-item'>12</FocusEngine.Item>
        </div>
      </FocusEngine>
    </>
  );
}