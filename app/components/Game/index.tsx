import Header from "-/app/components/Header";
import Main from "-/app/components/Main";
import Footer from "-/app/components/Footer";
import AppProvider from "-/app/context";

const Game = () => (
  <AppProvider>
    <Header />
    <Main />
    <Footer />
  </AppProvider>
);

export default Game;
