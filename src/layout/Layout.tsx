import { Header } from "./Header/Header";

interface IProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: IProps) => {
  return (
    <div className="Layout">
      <Header />
      {children}
    </div>
  );
};
