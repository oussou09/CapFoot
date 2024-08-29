import { useEffect } from "react";
import PropTypes from "prop-types";
import { HomeIcon, TableIcon, DocumentTextIcon, CogIcon } from "@heroicons/react/outline";
import { ChipIcon } from "@heroicons/react/outline";
import { Link, useLocation } from "react-router-dom";
import stadiumSidebar from "../../../assets/img/icons/stadium-sidebar.svg";
import listUl from "../../../assets/img/icons/list-ul.svg";
import calendarTime from "../../../assets/img/icons/calendar-time.svg";
import logo from '../../../assets/img/Logo1.png'; // Ensure the path is correct
import logomini from '../../../../public/CapFootLogo.png'; // Ensure the path is correct
function Header({ title }) {
  const headerHeight = '72px';

  return (
        <div
        className="flex my-3 lg:space-x-3 justify-center lg:justify-start lg:px-3 border-b border-gray-900 items-center"
        style={{ height: headerHeight }}
        >
        {/* Display the logo on md and above */}
        <img
            className="hidden lg:inline h-[4rem] w-66 p-[0rem] logo"
            src={logo}
            alt="Logo"
        />
        {/* Display the logomini on screens smaller than md */}
        <img
            className="inline lg:hidden h-[3.5rem] p-[0rem] logo"
            src={logomini}
            alt="Logo"
        />
        <h2 className="text-white text-2xl font-semibold hidden lg:inline">
            {title}
        </h2>
        </div>
  );
}

function MenuItem({ to, title, active, children }) {
  let activeClass =
    " text-gray-400 lg:rounded-md hover:text-white hover:bg-gray-700";

  if (active) {
    activeClass = " lg:rounded-md text-white bg-gray-900";
  }

  return (
    <Link
      to={to}
      replace
      className={"lg:mx-2 py-4 lg:py-2 lg:px-3 flex justify-center lg:justify-start space-x-4 items-center truncate " + activeClass}
    >
      {children}
      <span className="hidden lg:inline">{title}</span>
    </Link>
  );
}

function SideMenu() {
  const itemIconClass = "w-8 h-8 lg:w-5 lg:h-5";
  const location = useLocation();

  // Correct usage of useEffect
  useEffect(() => {
    // This effect runs on component mount and whenever `location` changes

    // You can add any additional side effects here

    // Cleanup function (optional, if needed)
    return () => {
      // Cleanup logic here (if needed)
    };
  }, [location]); // Dependency array ensures the effect runs on location change

  return (
    <div className="bg-gray-800 overflow-y-auto h-screen w-auto">
      <Header title="Admin" />
      <ul className="lg:mt-2 lg:space-y-2">
        <MenuItem to="/wp-admin/dashboard" title="Dashboard" active={location.pathname === '/wp-admin/dashboard'}>
          <HomeIcon className={itemIconClass} />
        </MenuItem>

        <MenuItem to="/wp-admin/reservationadmin" title="Reservation" active={location.pathname === '/wp-admin/reservationadmin'}>
            <img src={calendarTime} alt="calendarTime Icon" className={itemIconClass} />
        </MenuItem>

        <MenuItem to="/wp-admin/stadiums" title="Stadiums" active={location.pathname === '/wp-admin/stadiums'}>
            <img src={stadiumSidebar} alt="Stadium Icon" className={itemIconClass} />
        </MenuItem>

        <MenuItem to="/wp-admin/getcontactus" title="ListContactus" active={location.pathname === '/wp-admin/getcontactus'}>
            <img src={listUl} alt="listUl Icon" className={itemIconClass} />
        </MenuItem>

        <MenuItem to="/wp-admin/forms" title="Forms" active={location.pathname === '/wp-admin/forms'}>
          <DocumentTextIcon className={itemIconClass} />
        </MenuItem>


        {/* <div>
          <span className="my-3 lg:my-5 border-b border-gray-900 block"></span>
        </div> */}

        {/* <MenuItem to="/wp-admin/settings" title="Settings" active={location.pathname === '/wp-admin/settings'}>
          <CogIcon className={itemIconClass} />
        </MenuItem> */}
      </ul>
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

MenuItem.propTypes = {
  title: PropTypes.string.isRequired,
  active: PropTypes.bool,
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default SideMenu;
