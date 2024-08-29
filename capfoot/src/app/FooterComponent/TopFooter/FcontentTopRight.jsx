import '../../FooterComponent/listfoot.css';
import github from '../../../assets/img/icons/bxl-github.svg';
import linkedin from '../../../assets/img/icons/bxl-linkedin.svg';
import instagram from '../../../assets/img/icons/bxl-instagram.svg';

export default function FcontentTopRight() {
    return (
        <div className="right flex flex-col justify-end text-white">
            <div className="buttom">
                <div className="main flex flex-wrap h-full w-full py-4 gap-10 mb-2 justify-center items-center">
                    {/* Hide social links on small screens, show only on md and above */}
                    <a href="/Instagram" className="nav-item flex flex-col uppercase no-underline hidden md:flex">
                        <div className="nav-links flex justify-center items-center w-16 h-16 rounded bg-gray-900 text-red-400 transition-all duration-150 ease-in-out hover:bg-red-400 hover:text-gray-200 hover:scale-110">
                            <img src={instagram} alt="Instagram" className="w-8 h-8" />
                        </div>
                        <span className="nav-link-text text-xs font-semibold text-center text-gray-200">Instagram</span>
                    </a>
                    <a href="/Twitter" className="nav-item flex flex-col uppercase no-underline hidden md:flex">
                        <div className="nav-links flex justify-center items-center w-16 h-16 rounded bg-gray-900 text-red-400 transition-all duration-150 ease-in-out hover:bg-red-400 hover:text-gray-200 hover:scale-110">
                            <img src={github} alt="Github" className="w-8 h-8" />
                        </div>
                        <span className="nav-link-text text-xs font-semibold text-center text-gray-200">Github</span>
                    </a>
                    <a href="/LinkedIn" className="nav-item flex flex-col uppercase no-underline hidden md:flex">
                        <div className="nav-links flex justify-center items-center w-16 h-16 rounded bg-gray-900 text-red-400 transition-all duration-150 ease-in-out hover:bg-red-400 hover:text-gray-200 hover:scale-110">
                            <img src={linkedin} alt="LinkedIn" className="w-8 h-8" />
                        </div>
                        <span className="nav-link-text text-xs font-semibold text-center text-gray-200">LinkedIn</span>
                    </a>
                </div>
            </div>
        </div>
    )
}

