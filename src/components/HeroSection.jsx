import { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery, setSearchJobByText } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';
import { Typewriter } from 'react-simple-typewriter';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

      useEffect(() => {
        dispatch(setSearchJobByText(query));
      }, [query,dispatch]);

        const searchJobHandler = () => {
        if (query.trim() !== "") {
            dispatch(setSearchedQuery({ query }));
            navigate("/");
            setQuery("");
        }
    }

    
    return (
        <div className='text-center'>
            <div className='flex flex-col gap-5 my-10'>
                <h1 className='text-3xl font-bold sm:text-4xl md:text-5xl lg:text-4xl text-gray-800'>
                    Search, Apply & <br />
                    Get Your{' '}
                    <span className='text-[#6A38C2] font-medium'>
                        <Typewriter
                            words={['Dream Job', 'Perfect Role', 'Career Move']}
                            loop={0}
                            cursor
                            cursorStyle='|'
                            typeSpeed={70}
                            deleteSpeed={50}
                            delaySpeed={1500}
                        />
                    </span>
                </h1>
                <p className="text-sm sm:text-base max-w-2xl mx-auto text-gray-600">
                    Each month, more than 3 million job seekers turn to our website in their search for work,
                    making over 140,000 applications every single day!
                </p>
                <div className='flex flex-row sm:flex-row w-[90%] sm:w-[80%] md:w-[60%]  shadow-lg border border-gray-200 px-4 py-2 rounded-full items-center gap-3 mx-auto'>
                    <input
                        type="text"
                        placeholder='Find your dream jobs'
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className='outline-none border-none w-full text-sm sm:text-base bg-transparent'
                    />
                    <Button onClick={searchJobHandler} className="rounded-full sm:rounded-r-full sm:rounded-l-none bg-[#6A38C2] px-4 py-2">
                        <Search className='h-5 w-5 text-white' />
                    </Button>
                </div>

            </div>
        </div>
    )
}

export default HeroSection