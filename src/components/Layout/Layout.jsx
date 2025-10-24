 import styles from './layout.module.css';

export default function Layout() {
  return (
    <div> 
      <Navbar />
      <div className="container mx-auto">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}