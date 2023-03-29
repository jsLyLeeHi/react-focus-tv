import { useAppContext } from '@/store';
import './index.less'


function Index() {
  const { userInfo, setUserInfo } = useAppContext();
  

  return (
    <div className="cloudpage">
      <div className="item" onClick={() => setUserInfo({ userId: new Date().getTime() + "" })}>{userInfo.userId}</div>
      <div className="item"></div>
      <div className="item"></div>
      <div className="item"></div>
    </div>
  )
}

export default Index
