import './App.css';
import './index.scss';
import Header from './app/Header';
import Main from './app/Main';
import Reserving from './app/MainComponent/DetailsReserve/Reserving';
import About from './app/About';
import Contact from './app/Contact';
import Footer from './app/Footer';
import CardsStadiums from './app/MainComponent/CardsStadiums';
import { Routes, Route } from "react-router-dom";
import { StadProvider } from './app/MainComponent/StadContext';
import { RserveProvider } from './app/AdminPart/RserveContext';

function App() {
  return (
    <div className="App">
      <StadProvider>
            <RserveProvider>
                <Routes>
                <Route path="/" element={
                    <>
                    <Header />
                    <Main />
                    <Footer />
                    </>
                } />
                <Route path="/about" element={
                    <>
                    <Header />
                    <About />
                    </>
                } />
                <Route path="/contact" element={
                    <>
                    <Header />
                    <Contact />
                    </>
                } />
                <Route path="/stadiums" element={
                    <>
                    <Header />
                    <CardsStadiums />
                    <footer className="bg-gray-700 text-white text-center py-4 md:py-6 lg:py-8">
                        <p className="text-sm md:text-base lg:text-lg">
                            &copy; Copyright CapFoot 2024. All rights reserved. Made By Oussama.
                        </p>
                    </footer>
                    </>
                } />
                <Route path="/stadium/:id" element={
                    <>
                    <Header />
                    <Reserving />
                    </>
                } />
                </Routes>
        </RserveProvider>
      </StadProvider>
    </div>
  );
}

export default App;
