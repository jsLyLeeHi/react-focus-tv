import { FocusEngine, FocusScroll } from '@/components/focus-engine';
import "./index.less"

export default function MyPage() {
  return (
    <>
      <FocusEngine className="index-box">
        <FocusEngine.Item className='index-item'>222</FocusEngine.Item>
        <FocusScroll scrollOrientation='y' style={{ height: "300px" }}>
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
        <FocusEngine.Item className='index-item' style={{ height: "200px" }}>5</FocusEngine.Item>
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
