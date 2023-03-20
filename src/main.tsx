import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { $tv } from 'react-tv-focusable';

import { routeConfigs } from "@/routes"
import { tvconfig } from "@/config/tv"
import AppContextProvider from '@/store/context';
import { useEffect } from 'react';
import "@/assets/css/variable.css"
import "@/assets/css/base.less";
import './main.less'

function App() {


  useEffect(() => {
    $tv.init(tvconfig);
  }, [])


  return <AppContextProvider>
    <Router>
      <Routes>
        {routeConfigs.map((routeConfig) => (
          <Route key={routeConfig.path} path={routeConfig.path} element={<routeConfig.component />} />
        ))}
      </Routes>
    </Router>
  </AppContextProvider>
}
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />)
