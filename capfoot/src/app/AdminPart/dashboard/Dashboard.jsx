import React, { useContext, useEffect, useState } from 'react';
import QuickStackCard from "./QuickStackCard";
import {
  UserGroupIcon,
  ShoppingCartIcon,
  ColorSwatchIcon,
  CubeIcon,
} from "@heroicons/react/outline";
import SoccerStadium from "../../../assets/img/icons/soccer-stadium.svg";
import ContactUs from "../../../assets/img/icons/contact-us.svg";
import Confirmation from "../../../assets/img/icons/Confirmation.svg";
import SystemSolidClock from "../../../assets/img/icons/system-solid-clock.svg";
import LineChart from "./LineChart";
import RecentActivity from "./RecentActivity";
import BarChart from "./BarChart";
import {RserveContext} from '../RserveContext';
import { StadContext } from "../../MainComponent/StadContext";
import { ContactUsContext } from '../ContactUsContext';

function Dashboard() {
    const { rserves } = useContext(RserveContext);
    const { stadiums } = useContext(StadContext);
    const { contactUsData } = useContext(ContactUsContext);
    const iconClass = "w-10 h-10 text-gray-400";

    const { confirmedCount, unconfirmedCount } = rserves.reduce((counts, reserve) => {
        if (reserve.is_confirmed) {
          counts.confirmedCount += 1;
        } else {
          counts.unconfirmedCount += 1;
        }
        return counts;
      }, { confirmedCount: 0, unconfirmedCount: 0 });



  if (!rserves || !Array.isArray(rserves)) {
    // Handle the case when rserves is undefined, null, or not an array
    return <div>Loading...</div>;
  }
  return (
    <div className="flex flex-col space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <QuickStackCard title="Stadiums" statics={String(stadiums.length)} CardPath ="stadiums">
            <img src={SoccerStadium} alt="Soccer Stadium" className="h-12 w-12" />
        </QuickStackCard>

        <QuickStackCard title="Reserving" statics={unconfirmedCount} CardPath ="/wp-admin/reservationadmin">
            <img src={SystemSolidClock} alt="SystemSolidClock" className="h-12 w-12" />
        </QuickStackCard>

        <QuickStackCard title="Confirmed" statics={confirmedCount} CardPath ="/wp-admin/trueReservationAdmin">
            <img src={Confirmation} alt="Confirmation" className="h-12 w-12" />
        </QuickStackCard>

        <QuickStackCard title="Contact" statics={String(contactUsData.length)} CardPath ="/wp-admin/getcontactus">
            <img src={ContactUs} alt="ContactUs" className="h-12 w-12" />
        </QuickStackCard>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-3 space-y-4">
          {/* <LineChart /> */}
          <BarChart/>
        </div>
        <div className="lg:col-span-2">
            <RecentActivity />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
