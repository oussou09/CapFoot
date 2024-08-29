import FontIcons from './ButtomFooter/FontIcons.jsx'
import '../FooterComponent/listfoot.css'
import FcontentTopRight from './TopFooter/FcontentTopRight.jsx';
import FcontentTopLeft from './TopFooter/FcontentTopLeft.jsx';
import Copyright from './ButtomFooter/Copyright.jsx';
import FcontentTopMidle from './TopFooter/FcontentTopMidle.jsx';


export default function Fcontent() {
    return (
        <div className="content flex flex-col">
            <div className='top flex justify-around flex-wrap items-center'>
                <FcontentTopLeft />
                {/* Show FcontentTopMidle only on lg screens
                <div className="hidden lg:block">
                    <FcontentTopMidle />
                    <FcontentTopRight />
                </div>*/}
            </div>
            <div className="buttom flex flex-row justify-center">
                <FontIcons />
            </div>
            <div className="copyright">
                <Copyright />
            </div>
        </div>
    );
}

