import Link from 'next/link';

export default function Menu() {
    return (
        <div  className='bg-red-400 p-4'>
          <span className='text-red-400'> hello</span> 
        <nav className='text-red-400' style={{ display: 'flex', gap: '20px', padding: '10px' }}>
            <Link href="/market-watch">Market Watch</Link>
            <Link href="/world-news">World News</Link>
            <Link href="/trends">Trends</Link>
            <Link href="/ipos">IPO's</Link>
        </nav></div>
    );
}