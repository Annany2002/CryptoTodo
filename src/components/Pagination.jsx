import {CryptoContext} from './../context/CryptoContext';
import paginationArrow from '../assets/pagination-arrow.svg';
import {useState, useContext, useRef} from 'react';
import submitIcon from '../assets/submit-icon.svg';

const PerPage = () =>
{
	const inputRef = useRef(null);
	const {setPerPage} = useContext(CryptoContext);

	const handleSubmit = (e) => {
		e.preventDefault();
		let val = inputRef.current.value;
		if(val !== 0)
		{
			setPerPage(val);
			inputRef.current.value = val;
		}
	}

	return(
		<form onSubmit={handleSubmit} className='relative mr-12 flex items-center font-nunito' 
					>
					<label htmlFor='perpage'
					       className='relative capitalize flex items-center justify-center mr-2 font-bold'>
					       perPage:
					</label>
					<input 
						className='w-16 rounded bg-gray-200 placeholder:text-gray-100 pl-2 required outline-0 border border-transparent focus:border-cyan leading-4'
						placeholder='10'
						min={1}
						max={250}
						ref={inputRef} 
						name='perpage' 
						type="number"/>
					<button className='ml-1 cursor-pointer' type='submit'>
						<img src={submitIcon} alt='submit' className='w-full h-auto'/>
					</button>
				</form>
		)
}

export default function Pagination()
{
	let {page, setPage, totalPages, perPage, cryptoData} = useContext(CryptoContext);
	const TotalNumber = Math.ceil(totalPages/perPage);

	const next = () => {
		if(page === TotalNumber)
		{
			return null;
		}
		else
		{
			setPage(page + 1);
		}
	}

	const prev = () => {
		if(page === 1)
		{
			return null;
		}
		else
		{
			setPage(page - 1);
		}
	}

	const multiPageNext = () => {
		if(page + 3 >= TotalNumber){
			setPage(TotalNumber-1)
		}
		else{
			setPage(page+3)
		}
	}

	const multiPagePrev = () => {
		if(page + 3 <= 1){
			setPage(TotalNumber+1)
		}
		else{
			setPage(page-2)
		}
	}
	if(cryptoData && cryptoData.length >= perPage)
	{
		return(
		<div className='flex items-center'>
			<PerPage />
			<ul className='flex items-center justify-end text-sm'>
				<li className='flex items-center'>
					<button onClick = {prev} className='outline-0 hover:text-cyan w-8'><img className='rotate-180 w-full h-auto' src={paginationArrow} alt="left"/></button>
				</li>
				{(page+1 === TotalNumber || page === TotalNumber) ? <li><button onClick={multiPagePrev} className='outline-0 items-center justify-center hover:text-cyan rounded-full h-8 w-8 flex text-lg'>...</button></li> : null}
				{(page - 1 !== 0) ? <li><button onClick={prev} className='outline-0 mx-1.5 bg-gray-200 items-center justify-center hover:text-cyan rounded-full h-8 w-8 flex'>{page-1}</button></li> : null}
				<li><button disabled className='outline-0 mx-1.5 bg-cyan items-center justify-center text-gray-200 rounded-full h-8 w-8 flex'>{page}</button></li>
				{(page-1 !== TotalNumber && page !== TotalNumber) ? <li><button onClick={next} className='outline-0 mx-1.5 bg-gray-200 items-center justify-center hover:text-cyan rounded-full h-8 w-8 flex'>{page+1}</button></li> : null}
				{page-1 !== TotalNumber && page !== TotalNumber ? <li><button onClick={multiPageNext} className='outline-0 items-center justify-center hover:text-cyan rounded-full h-8 w-8 flex text-lg'>...</button></li> : null}
				{page !== TotalNumber ? (<li><button onClick={() => setPage(TotalNumber)} className='outline-0 mx-1.5 bg-gray-200 items-center justify-center hover:text-cyan rounded-full h-8 w-8 flex'>{TotalNumber}</button></li>) : null}
				<li className='flex items-center'>
					<button onClick = {next} className='outline-0 hover:text-cyan w-8'><img className='w-full h-auto' src={paginationArrow} alt="right"/></button>
				</li>
			</ul>
		</div>
		)
	}
	else{
		return null
	}
}