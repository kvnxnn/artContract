import HeaderComponent from "./HeaderComponent";
const Layout = ({ children }) => {
  return (
    <div>
      <HeaderComponent />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
