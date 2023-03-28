import { Navigate } from 'react-router-dom';
import Cloudpay from "@/pages/cloudpay"
import Items from "@/pages/items"
import Pay from "@/pages/pay"
import NotFound404 from "@/pages/404"
import { withKeepAlive } from 'keepalive-react-component';



interface RouteConfig {
  path: string;
  title?: string;
  component: React.ComponentType<any>;
}


export const routeConfigs: RouteConfig[] = [
  {
    path: '/Cloudpay',
    title: '首页',
    component: withKeepAlive(Cloudpay, { cacheId: "/Cloudpay" }),
  },
  {
    path: '/Items',
    title: 'Items',
    component: Items,
  },
  {
    path: '/Pay',
    title: '支付页面',
    component: withKeepAlive(Pay, { cacheId: "/Pay" }),
  },
  {
    path: '*',
    title: '404 Not Found',
    component: NotFound404,
  },
  {
    path: '/',
    component: () => Navigate({ to: "/Cloudpay" }),
  },
];
