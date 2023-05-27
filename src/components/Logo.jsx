import {Link} from 'react-router-dom';
import logoSvg from '../assets/logo.svg';

export default function Logo()
{
	return(
		<Link 
			to ='/'
			className='absolute top-[1.5rem] left-[1.5rem] [text-decoration:none] text-lg text-cyan flex items-center'
			>
			<img src={logoSvg} alt="CryptoBucks"/>	
			<span>CryptoCash</span>
		</Link>
		)
}