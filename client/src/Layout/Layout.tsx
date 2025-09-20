import { useState } from "react";
import { Hamburger } from "../components/Hamburger";
interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [menuOpen, setMenu] = useState(false);
  return (
    <div className="flex flex-col">
      <Hamburger open={menuOpen} setOpen={setMenu} />
      <div className="flex-1">{children}</div>
    </div>
  );
};
