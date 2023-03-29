import React from 'react';
import { FocusEngine } from '@/components/focus-engine';
import { useNavigate, useLocation } from 'react-router-dom';
import "./index.less"

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <FocusEngine className='page-box notfound-page bg-black' onEnter={() => navigate("/")} onBack={() => navigate("/")}>
      <div className='t-center s-lg-2 c-main'>404 Not Found</div>
      <div className='t-center s-md c-main'>抱歉，您访问的"{location.pathname}"页面不存在</div>
      <div className='t-center s-md c-warning'>请按(确认/返回)键返回首页</div>
    </FocusEngine>
  );
};

export default NotFoundPage;
