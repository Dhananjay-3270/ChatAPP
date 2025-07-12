import { useState } from "react";
import { Hamburger } from "../components/Hamburger";
interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [menuOpen, setMenu] = useState(false);
  return <Hamburger open={menuOpen} setOpen={setMenu} />;
};
