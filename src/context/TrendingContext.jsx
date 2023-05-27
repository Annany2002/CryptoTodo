import {createContext, useState, useEffect} from 'react';

export const TrendingContext = createContext({});

export const TrendingProvider = ({ children }) => {
	const [trendingData, setTrendingData] = useState([]);
	
	const getTrendingData = async () => {
		try{
			const data = await fetch('https://api.coingecko.com/api/v3/search/trending')
				.then(res => res.json())
				.then(json => json);
 			    //console.log(data)
				setTrendingData(data.coins)
		}catch(error){
			console.log(error)
		}
	} 

	const resetTrendingData = () => {
		getTrendingData()
		//console.log('button clicked')
	}

	useEffect(() => {
		getTrendingData();
	},[])

	return(
		<TrendingContext.Provider value={{trendingData, resetTrendingData, getTrendingData}}>
			{children}
		</TrendingContext.Provider>
		)
}