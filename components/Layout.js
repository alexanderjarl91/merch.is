import Footer from "./Footer";
import Navbar from "./Navbar";

export default function NavbarLinks({ children }) {
  return (
    <div className="content">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
