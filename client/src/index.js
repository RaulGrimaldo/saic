import React from 'react';
import { RegValApp } from './RegValApp';
import { ConfigProvider } from 'antd';
import es_ES from 'antd/lib/locale/es_ES';  
import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <ConfigProvider locale={es_ES}>
    <RegValApp />
  </ConfigProvider>,
);
