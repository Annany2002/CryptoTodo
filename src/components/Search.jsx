import searchIcon from '../assets/search-icon.svg';
import {useState, useContext} from 'react';
import {CryptoContext} from '../context/CryptoContext';
import debounce from 'lodash.debounce';

const SearchInput = ({handleSearch}) => {
	const [searchText, setSearchText] = useState('');
	let {searchData, setCoinSearch, setSearchData} = useContext(CryptoContext);

	let handleInput = (e) => {
		e.preventDefault();
		let query = e.target.value;
		setSearchText(query);
		handleSearch(query);
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		handleSearch(searchText);
	}
	const selectCoin = (coin) => {
		setCoinSearch(coin);
		setSearchText("");
		setSearchData();
	}

	return (
		<>
			<form className='w-96 relative flex items-center ml-7 font-nunito' onSubmit={handleSubmit}>
				<input type="text" name='search' 
					className='w-full rounded bg-gray-200 placeholder:text-gray-100 required outline-0 border pl-2 border-transparent focus:border-cyan capitalize' placeholder='search here...'
					 onChange={handleInput}
					 value={searchText}
					 />
			<button type='submit' className='absolute right-1 cursor-pointer'>
				<img className='w-full h-auto' src={searchIcon} alt='search'/>
			</button>
		</form>
		{
			searchText.length > 0 
		 	? (
		 		<ul className='absolute top-11 right-0 w-96 h-96 rounded overflow-x-hidden py-2 bg-gray-200 bg-opacity-60 backdrop-blur-md scrollbar-thin scrollbar-thumb-gray-100 scrollbar-track-gray-200'>
		 		{
		 			searchData ? 
		 				searchData.map(coin => 
		 					{
		 					 return <li 
		 					 			key={coin.id} 
		 					 			className='flex items-center ml-4 my-2 cursor-pointer'
		 					 			onClick={() => selectCoin(coin.id)}
		 					 			>
		 					 	<img className='w-[1rem] h-[1rem] mx-1.5 cursor-pointer' src={coin.thumb} alt={coin.name}/>
		 					 	<span>{coin.name}</span>
		 					 </li>
		 					}
						 )
		 				: <div className='w-full h-full flex justify-center items-center'>
		 					<div className='w-8 h-8 border-4 border-cyan rounded-full border-b-gray-100 animate-spin' role='status'/><span className='ml-2'>Searching...</span>
		 			   	 </div>

		 		}
		 	</ul>)
		 	:
		 	null
		 }
		</>
		)
}

export default function Search()
{
	
	let {getSearchResult} = useContext(CryptoContext);

	const debounceFunc = debounce(function(val){
		getSearchResult(val);
	},2000);

	return( 
		<div className='relative'>
			<SearchInput handleSearch={debounceFunc}/>
		</div>
		)
}