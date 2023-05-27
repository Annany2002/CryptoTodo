import {useNavigate} from 'react-router-dom';

export default function TrendingCoin({data})
{
	let navigate = useNavigate();
	const getCoinDetails = (id) => {
		navigate(`${id}`);
	}

	return(
		<div className='w-[40%] bg-gray-200 mb-12 last:mb-0 cursor-pointer rounded-lg p-4 relative hover:bg-gray-100 hover:bg-opacity-40'
		onClick={() => getCoinDetails(data.id)}
		>
		{
			data ? 
			<>
				<h3 className='text-base items-center py-0.5 flex'>
					<span className='text-gray-100 capitalize'>name :&nbsp;</span>
					<span className='text-cyan'>{data.name}</span>
					<img className='w-[1.5rem] h-[1.5rem] rounded-full mx-1.5' src={data.small} alt={data.image}/>
				</h3>
				<h3 className='text-base items-center py-0.5 flex'>
					<span className='text-gray-100 capitalize'>market cap rank :&nbsp;</span>
					<span className='text-cyan'>{data.market_cap_rank}</span>
				</h3>
				<h3 className='text-base items-center py-0.5 flex'>
					<span className='text-gray-100 capitalize'>price (in bTC) :&nbsp;</span>
					<span className='text-cyan'>
						{new Intl.NumberFormat('en-IN', {
                                            style: 'currency',
                                            currency: 'btc',
                                            maximumSignificantDigits:5,
                                        }).format(data.price_btc)}
					</span>
				</h3>
				<h3 className='text-base items-center py-0.5 flex'>
					<span className='text-gray-100 capitalize'>score :&nbsp;</span>
					<span className='text-cyan'>{data.score}</span>
				</h3>
				<img className='w-[35%] h-auto absolute top-2/4 -right-12 -translate-y-2/4 rounded-full' src={data.large} alt={data.image}/>
			</> :
			<div className='w-full min-h-[60vh] flex justify-center items-center'>
		 					<div className='w-8 h-8 border-4 border-cyan rounded-full border-b-gray-100 animate-spin' role='status'/><span className='ml-2'>Loading...</span>
		 			   	 </div>
	    }
	    </div>
		)
}