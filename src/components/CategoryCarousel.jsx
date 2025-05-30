import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useEffect, useState } from 'react';

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "FullStack Developer"
]

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [selectedValue, setSelectedValue] = useState('');



    const searchJobHandler = (query) => {
        setSelectedValue(query);
    }

    useEffect(() => {
        if (selectedValue) {
            dispatch(setSearchedQuery({ query: selectedValue }));
            navigate("/");
        }
    }, [selectedValue,dispatch, navigate]);

    return (
        <div>
            <Carousel className="w-full max-w-xl mx-auto my-20">
                <CarouselContent className=" ">
                    {
                        category.map((cat, index) => (
                            <CarouselItem key={index} className="flex sm:gap-0 justify-center basis-full sm:basis-1/2 lg:basis-1/3">
                                <Button onClick={() => searchJobHandler(cat)} variant="outline" className="rounded-full">{cat}</Button>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    )
}

export default CategoryCarousel