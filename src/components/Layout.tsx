import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

export default function Layout() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0">
        <Header />
        <main className="flex-1 p-8 overflow-auto" style={{ background: '#f5f7fa' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
