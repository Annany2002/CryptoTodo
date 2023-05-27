import { useEffect, useState,useContext } from 'react';
import {CryptoContext} from '../context/CryptoContext'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend , ResponsiveContainer} from 'recharts'

function CustomTooltip({ payload, label, active, currency }) {
  if (active && payload && payload.length > 0) {
    return (
      <div className="custom-tooltip">
        <p className="label text-sm text-cyan">{`${label} : ${
             new Intl.NumberFormat('en-IN',{
             	style:'currency',
             	currency:currency,
             	minimumFractionDigits:5,
             }).format(payload[0].value)
         }`}</p>
      </div>
    );
  }

  return null;
}

const ChartComponent = ({data, currency, type}) => {
	return(
		<ResponsiveContainer height={'90%'}>
			<LineChart width={400} height={100} data={data}>
				<Line type='monotone' dataKey={type} stroke='cyan' strokeWidth={1} />
				<CartesianGrid stroke='#323232'/>
				<XAxis dataKey='date' hide></XAxis>
				<YAxis dataKey={type} hide  domain={['auto','auto']}/>
				<Tooltip wrapperStyle={{outline:'none'}} cursor={false} currency={currency} content={<CustomTooltip/>} />
				<Legend/>
		 </LineChart>
		</ResponsiveContainer>
		)
}

export default function Chart({id})
{
	const [chartData, setChartData] = useState();
	const [type, setType] = useState('prices');
	const [days, setDays] = useState(7);

	let {currency} = useContext(CryptoContext);
	useEffect(() => {
		const getChartData = async (id) => {
			try{
				const data = await fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}&interval=daily`)
				.then((res) => res.json())
				.then((json) => json);
				let convertedData = data[type].map(item => 
				{
					return{
						data: new Date(item[0]).toLocaleDateString(),
						[type]:item[1],
					}
				})
				setChartData(convertedData);
				//console.log('chart-data', data)
				//console.log(convertedData)
			}catch(error){
				console.log(error)
			}
		}
		getChartData(id);
	},[id, type,days])

	return(
		<div className='w-full h-[60%]'>
			<ChartComponent currency={currency} data={chartData} type={type}/>
			<div className='flex justify-between'>
				<div className='justify-center mx-1'>
					<button className={`text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 rounded capitalize ${type === 'prices' ? 'text-cyan bg-cyan': 'bg-gray-200 text-gray-100' }`} onClick={() => setType('prices')}>price</button>
				<button className={`text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 rounded capitalize ${type === 'market_caps' ? 'text-cyan bg-cyan': 'bg-gray-200 text-gray-100' }`} onClick={() => setType('market_caps')}>market caps</button>
				<button className={`text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 rounded capitalize ${type === 'total_volumes' ? 'text-cyan bg-cyan': 'bg-gray-200 text-gray-100' }`} onClick={() => setType('total_volumes')}>total volumes</button>
				</div>
				<div className='justify-center mx-1'>
					<button className={`text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 rounded capitalize ${days === 7 ? 'text-cyan bg-cyan': 'bg-gray-200 text-gray-100' }`} onClick={() => setDays(7)}>7d</button>
				<button className={`text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 rounded capitalize ${days === 14 ? 'text-cyan bg-cyan': 'bg-gray-200 text-gray-100' }`} onClick={() => setDays(14)}>14d</button>
				<button className={`text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 rounded capitalize ${days === 30 ? 'text-cyan bg-cyan': 'bg-gray-200 text-gray-100' }`} onClick={() => setDays(30)}>30d</button>
				</div>
			</div>
		</div>
		)
}
