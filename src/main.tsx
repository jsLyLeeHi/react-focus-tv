import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { routeConfigs } from "@/routes"

import { RouterKeepAlive } from "@/routes/keepLive"
import AppContextProvider from '@/store/context';
import "@/assets/css/variable.css"
import "@/assets/css/base.less";
import './main.less'

function App() {

  return <AppContextProvider>
    <BrowserRouter>
      <RouterKeepAlive>
        <Routes>
          {routeConfigs.map((routeConfig) => (
            <Route key={routeConfig.path} path={routeConfig.path} element={
              <RouterKeepAlive.Item cacheKey={routeConfig.path}>
                <routeConfig.component />
              </RouterKeepAlive.Item>
            } />
          ))}
        </Routes>
      </RouterKeepAlive>
    </BrowserRouter>
  </AppContextProvider>
}
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />)