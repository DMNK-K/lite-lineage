import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Content from './components/Content';

function App() {
  return (
    <div className="app">
      <Header/>
      <Content isInTree="false"/>
      <Footer/>
    </div>
  );
}

export default App;