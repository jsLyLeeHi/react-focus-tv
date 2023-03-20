import { useAppContext } from '@/store';
import './index.less'


function Index() {
  const { userInfo, setUserInfo } = useAppContext();
  

  return (
    <div className="cloudpage">
      <div className="item" onClick={() => setUserInfo({ userId: new Date().getTime() + "" })} focusable="">{userInfo.userId}</div>
      <div className="item" focusable=""></div>
      <div className="item" focusable=""></div>
      <div className="item" focusable=""></div>
    </div>
  )
}

export default Index
