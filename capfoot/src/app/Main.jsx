// src/app/Main.jsx
import React from 'react';
import CarouselDefault from './MainComponent/CarouselDefault';
import StepsTakeHoure from './MainComponent/StepsTakeHoure';
import CardsStadiums from './MainComponent/CardsStadiums';
import MapsLocation from './MainComponent/MapsLocation';
import AddUrEmail from './MainComponent/AddUrEmail';
import UpScroll from './UpScroll';

function Main() {
  return (
    <div>
      <main>
            <CarouselDefault />
            <CardsStadiums />
            <StepsTakeHoure />
            <AddUrEmail />
            <MapsLocation />
            <UpScroll />
      </main>
    </div>
  );
}

export default Main;
