import {createContext, useState, useEffect} from 'react';

export const CryptoContext = createContext({});

export const CryptoProvider = ({ children }) => {
	const [cryptoData, setCryptoData] = useState();
	const [searchData, setSearchData] = useState();
	const [coinSearch, setCoinSearch] = useState('');
	const [currency, setCurrency] = useState('usd');
	const [sortBy, setSortBy] = useState('market_cap_desc')
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(250);
	const [perPage, setPerPage] = useState(10)
	const [coinData, setCoinData] = useState(null)

	const getCryptoData = async () => {
		setCryptoData()
		try{
			const data = await fetch(`https://api.coingecko.com/api/v3/coins/list`).then(res => res.json()).then(json => json);
			setTotalPages(data.length);
			//console.log(data);
		}catch(error){
			console.log(error)
		}

		try{
			const data = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${coinSearch}&order=${sortBy}&per_page=${perPage}&page=${page}&sparkline=false&price_change_percentage=1h%2C24h%2C7d&locale=en`)
	 		    .then(res => res.json())
	 		    .then(json => json);
			setCryptoData(data);
			//console.log(data);
		}catch(error){
			console.log(error)
		}
	}

	const getCoinData = async (coinId) => {
		setCoinData();
		try{
			const data = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}?localization=false%20&tickers=false&market_data=true&community_data=false&developer_data=true&sparkline=false`)
			.then(res => res.json())
			.then(data => {
				//console.log("CryptoDetails",data);
				setCoinData(data);
			})
		}catch(error){
			console.log(error)
		}
	}

	const getSearchResult = async(query) => {
		try{
			const data = await fetch(`https://api.coingecko.com/api/v3/search?query=${query}`).then(res => res.json()).then(json => json);
			setSearchData(data.coins);
		}catch(error){
			//console.log(error);
		}
	} 

	const resetFunc = () => {
		setPage(1);
		setCoinSearch("");
	}

	useEffect(() => {
		getCryptoData();
	},[coinSearch, currency, sortBy, page, perPage])

	return(
		<CryptoContext.Provider value={{cryptoData, searchData, getSearchResult, setCoinSearch, setSearchData, currency, setCurrency, sortBy, setSortBy, page, setPage, totalPages, resetFunc, setPerPage, perPage, getCoinData, coinData}}>
			{children}
		</CryptoContext.Provider>
		)
}