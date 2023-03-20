import { Navigate } from 'react-router-dom';
import Cloudpay from "@/pages/cloudpay"
import Items from "@/pages/items"
import NotFound404 from "@/pages/404"



interface RouteConfig {
  path: string;
  title?: string;
  component: React.ComponentType<any>;
}


export const routeConfigs: RouteConfig[] = [
  {
    path: '/Cloudpay',
    title: '首页',
    component: Cloudpay,
  },
  {
    path: '/Items',
    title: 'Items',
    component: Items,
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
