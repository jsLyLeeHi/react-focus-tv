import { Navigate } from 'react-router-dom';
import Cloudpay from "@/pages/cloudpay"
import Items from "@/pages/items"
import Pay from "@/pages/pay"
import NotFound404 from "@/pages/404"



interface RouteConfig {
  path: string;
  title?: string;
  keepAlive?: boolean,
  component: React.ComponentType<any>;
}


export const routeConfigs: RouteConfig[] = [
  {
    path: '/Cloudpay',
    keepAlive: true,
    title: '首页',
    component: Cloudpay,
  },
  {
    path: '/Items',
    title: 'Items',
    component: Items,
  },
  {
    path: '/Pay',
    title: '支付页面',
    component: Pay,
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
