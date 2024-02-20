
import './App.css';

import InputForm from './InputForm';
import SearchComponent from './SearchComponent';
import Navbar from './Navbar';
import Footer from './Footer';


function App() {
  return (
    <div className="App">
<div className="flex flex-col min-h-screen">

    <Navbar/>
    <div className="flex-grow min-h-0">
    <InputForm/>
    <SearchComponent  />

    </div>
    
    <Footer />
    
    </div>
    

    
    
    </div>
  );
}

export default App;
