import ReactDOM from 'react-dom/client'
import { HashRouter, Route, Routes } from 'react-router-dom';
import { routeConfigs } from "@/routes"

import { KeepAliveProvider } from 'keepalive-react-component';
import AppContextProvider from '@/store/context';
import "@/assets/css/variable.css"
import "@/assets/css/base.less";
import './main.less'

function App() {

  return <AppContextProvider>
    <HashRouter>
      <KeepAliveProvider>
        <Routes>
          {routeConfigs.map((routeConfig) => <Route key={routeConfig.path} path={routeConfig.path} element={<routeConfig.component />} />)}
        </Routes>
      </KeepAliveProvider>
    </HashRouter>
  </AppContextProvider>
}
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />)