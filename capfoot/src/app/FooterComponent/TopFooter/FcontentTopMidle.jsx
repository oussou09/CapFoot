
import '../../FooterComponent/listfoot.css'
import phone from '../../../assets/img/icons/bxs-phone.svg'; // Ensure the path is correct
import email from '../../../assets/img/icons/bxs-envelope.svg'; // Ensure the path is correct



export default function FcontentTopMidle() {
    return(

    <div className="right text-white">
        <div className="top flex flex-row my-4">
            <div className='phone mr-6'>
                <a href="tel:+212613583510" className='flex flex-col items-center'>

                    <div className="nav-links flex justify-center items-center w-16 h-16 rounded bg-gray-900 text-red-400 transition-all duration-150 ease-in-out hover:bg-red-400 hover:text-gray-200 hover:scale-110">
                        <img className='h-12' src={phone} alt="phone" />
                    </div>
                    <h1 className='text-lg font-bold'>+212 613583510</h1>
                </a>
            </div>
            <div className='email'>
                <a href="mailto:oussamaelamrani09@gmail.com" className='flex flex-col items-center'>

                    <div className="nav-links flex justify-center items-center w-16 h-16 rounded bg-gray-900 text-red-400 transition-all duration-150 ease-in-out hover:bg-red-400 hover:text-gray-200 hover:scale-110">
                        <img className='h-12' src={email} alt="email" />
                    </div>
                    <h1 className='text-lg font-bold ml-2'>oussamaelamrani09@gmail.com</h1>
                </a>
            </div>
        </div>
    </div>

    )
}
