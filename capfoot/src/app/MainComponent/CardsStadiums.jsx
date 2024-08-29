// src/app/Main Component/CarouselDefault.jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import user from '../../assets/img/icons/user-solid.svg';
import { StadContext } from './StadContext';
import Loading from '../ExternFun/Loading'
import Confirmation from "../../assets/img/icons/confirmation.svg";
import { RserveContext } from '../AdminPart/RserveContext';



// const CountTrue = (data) => {
//     const { rserves } = useContext(RserveContext);

//     const confirmedCount = rserves.reduce((count, reservation) => {
//         return reservation.is_confirmed === 1 && reservation.stadium_id === data ? count + 1 : count;
//   }, 0);
//   return confirmedCount
// }


function CardsStadiums() {

  const { stadiums } = useContext(StadContext);

  const { rserves } = useContext(RserveContext);

  const CountTrue = (data) => {
      const confirmedCount = rserves.reduce((count, reservation) => {
          return reservation.is_confirmed === 1 && reservation.stadium_id === data ? count + 1 : count;
      }, 0);
      return confirmedCount;
  };


  if (!stadiums) {
    return <Loading className="bg-white" />;
}

  return (

<div id='CardsStadiums' className="h-auto bg-white flex flex-row flex-wrap content-center justify-around py-[60px]">

    {stadiums.map((stade) => (

<div class="block relative group transition hover:scale-105 hover:-rotate-1 w-full max-w-sm m-4">
    <Link to={`/stadium/${stade.id}`} target="_self" class="block">
        <div class="aspect-w-2 aspect-h-1 rounded-2xl border shadow overflow-hidden bg-gray-100 relative">
            <img src={`http://127.0.0.1:8000/storage/${stade.path}`} loading="lazy" className="w-full h-64 object-center object-cover"/>

            <div class="absolute bottom-0 left-0 right-0 p-2 space-y-1 bg-black bg-opacity-5 text-white">
                <div class="flex items-start justify-between gap-4">
                    <h3 class="flex items-center justify-start flex-1 text-base font-medium">
                        <h4 className="text-[23px] font-bold pr-2">{stade.stadium_name}</h4>
                        <span className="text-[18px]">{stade.stadium_many}</span>
                    </h3>

                    <span class="mt-1 shrink-0 text-2xs inline-flex items-center gap-1">
                        {CountTrue(stade.id)}
                        <img src={Confirmation} alt="Confirmation" className="h-5 w-5" />
                    </span>
                </div>
            </div>
        </div>
    </Link>
</div>



    ))}
</div>


  );
}

export default CardsStadiums;


// card V1

{/* <div class="block relative group transition hover:scale-105 hover:-rotate-1 w-full max-w-sm m-4">
<Link to={`/stadium/${stade.id}`} target="_self" class="block">
    <div class="aspect-w-2 aspect-h-1 rounded-2xl border shadow overflow-hidden bg-gray-100">
        <img src={`http://127.0.0.1:8000/storage/${stade.path}`} loading="lazy" className="w-full h-64 object-center object-cover"/>
    </div>

    <div class="p-2 space-y-1">
        <div class="flex items-start justify-between gap-4">
            <h3 class="flex items-center justify-start flex-1 text-base font-medium text-gray-900">
                <h4 className="text-[23px] font-bold pr-2">{stade.stadium_name}</h4>
                <span className="text-[18px] text-gray-500">{stade.stadium_many}</span>
            </h3>


            <span class="mt-1 shrink-0 text-xs inline-flex items-center gap-1">

                {CountTrue(stade.id)}
                <img src={Confirmation} alt="Confirmation" className="h-5 w-5" />
            </span>
        </div>
    </div>
</Link>
</div> */}



// Link V
{/* <Link to={`/stadium/${stade.id}`}  key={stade.id} className="bg-white rounded-lg shadow-lg overflow-hidden max-w-lg w-full m-2 md:m-4">
<img src={`http://127.0.0.1:8000/storage/${stade.path}`} alt="Stadium" className="w-full h-64 object-cover" />
  <div className="p-2">
  <h2 className="text-2xl font-bold text-gray-800 mb-2">{stade.stadium_name} <span>{stade.stadium_many}</span></h2>
  </div>
</Link> */}

// div V

{/* <div key={stade.id} className="bg-white rounded-lg shadow-lg overflow-hidden max-w-lg w-full m-2 md:m-4">
<img src={`http://127.0.0.1:8000/storage/${stade.path}`} alt="Stadium" className="w-full h-64 object-cover" />
  <div className="p-6">
  <h2 className="text-2xl font-bold text-gray-800 mb-2">{stade.stadium_name} <span>{stade.stadium_many}</span></h2>
    <div className="flex justify-between items-center">
      <div className="flex items-center">
        <img src={user} alt="Avatar" className="w-8 h-8 rounded-full mr-2 object-cover" />
        <span className="text-gray-800 font-semibold">Simo(Admin)</span>
      </div>
      <div className="mt-2">
      <Link to={`/stadium/${stade.id}`} className="inline-flex items-center rounded-md border border-transparent bg-gray-800 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-gray-900">
        Available Hours
      </Link>
      </div>
    </div>
  </div>
</div> */}
