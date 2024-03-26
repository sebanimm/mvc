import Header from "./components/Header";

const Template = ({ children, text }) => {
  return (
    <main className="w-full h-screen">
      <Header text={text} />
      {children}
    </main>
  );
};

export default Template;
