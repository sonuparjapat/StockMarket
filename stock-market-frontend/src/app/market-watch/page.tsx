'use client';

import { useEffect, useState } from 'react';
import InstrumentCard from '../components/InstrumentCard';
import axios from 'axios';

export default function MarketWatch() {
    const [data, setData] = useState<any>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6; // Number of items per page

    useEffect(() => {
        
        // Fetch data from the Zerodha API route with pagination
        // fetch(`/api/zerodha?limit=${itemsPerPage}&page=${currentPage}`)
        //     .then((response) => response.json())
        //     .then((data) => {
                
        //         // Filter and store the data (if needed)
        //         const filteredData = data.filter((instrument: any) => {
        //             const isIndianExchange = instrument.exchange === 'NSE' || instrument.exchange === 'BSE';
        //             console.log(isIndianExchange,"indian ex")
        //             const isINRCurrency = instrument.tradingsymbol.includes('INR');
        //             const isRelevantInstrumentType = ['EQ', 'FUT', 'OPT'].includes(instrument.instrument_type);
        //             return isIndianExchange && isRelevantInstrumentType && (isINRCurrency || instrument.name !== 'EURINR');
        //         });
        //         // console.log(filteredData,"data coming")

        //         // setData(data); 
        //         // Store the filtered data
        //         setLoading(false); // Set loading to false
        //     })
        //     .catch((err) => {
        //         setError('Failed to fetch data');
        //         setLoading(false);
        //     });
        getdata()
    }, [currentPage]); // Run again when the page number changes
const getdata=async()=>{
try{
const res=await axios.get(`/api/zerodha?limit=${itemsPerPage}&page=${currentPage}`)
if(res?.status==200){
    const data=res?.data||[]
    const filteredData = data.filter((instrument: any) => {
                    const isIndianExchange = instrument.exchange === 'NSE' || instrument.exchange === 'BSE';
                    console.log(isIndianExchange,"indian ex")
                    const isINRCurrency = instrument.tradingsymbol.includes('INR');
                    const isRelevantInstrumentType = ['EQ', 'FUT', 'OPT'].includes(instrument.instrument_type);
                    return isIndianExchange && isRelevantInstrumentType && (isINRCurrency || instrument.name !== 'EURINR');
                });
    console.log(filteredData,"data")
}
}catch(err:any){
    console.log(err?.message)
}
}
    // Handle pagination controls
    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h2 className="text-3xl font-semibold text-center text-white mb-8">Market Watch</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {/* Map through filtered instruments and display each InstrumentCard */}
                {data.map((instrument: any) => (
                    <InstrumentCard
                        key={instrument.instrument_token} // Use a unique key for each card
                        instrumentName={instrument.tradingsymbol}
                        lastPrice={instrument.last_price}
                        expiry={instrument.expiry}
                        lotSize={instrument.lot_size}
                        priceChange={instrument.last_price > 0 ? 'up' : 'down'}
                        instrumentType={instrument.instrument_type}
                    />
                ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center items-center space-x-4 mt-6">
                <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className="bg-blue-500 text-white p-2 rounded"
                >
                    Previous
                </button>
                <span className="text-white">
                    Page {currentPage}
                </span>
                <button
                    onClick={handleNextPage}
                    disabled={data.length < itemsPerPage} // Disable next button if fewer items than the limit
                    className="bg-blue-500 text-white p-2 rounded"
                >
                    Next
                </button>
            </div>
        </div>
    );
}