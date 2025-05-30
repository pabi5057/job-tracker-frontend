import { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'

const fitlerData = [
    {
        fitlerType: "Location",
        array: ["Delhi NCR", "Bengaluru", "Hyderabad", "Pune", "Surat"]
    },
    {
        fitlerType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
    },
];

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const [salary, setSalary] = useState([0, 100]);
    const dispatch = useDispatch();

    const handleMinChange = (e) => {
        let value = Number(e.target.value);
        if (value > salary[1]) value = salary[1];
        setSalary([value, salary[1]]);
    };

    const handleMaxChange = (e) => {
        let value = Number(e.target.value);
        if (value < salary[0]) value = salary[0];
        setSalary([salary[0], value]);
    };

    const changeHandler = (value) => {
        setSelectedValue(value);
    };

    useEffect(() => {
        dispatch(setSearchedQuery({
            query: selectedValue,
            salaryRange: salary,
        }));
    }, [dispatch, selectedValue, salary]);

    return (
        <div className='w-full bg-white p-4 rounded-md'>
            <h1 className='font-bold text-lg'>Filter Jobs</h1>
            <hr className='mt-3 mb-4' />
            <RadioGroup value={selectedValue} onValueChange={changeHandler}>
                {fitlerData.map((data, index) => (
                    <div key={index} className="mb-4">
                        <h1 className='font-bold text-md'>{data.fitlerType}</h1>
                        {data.array.map((item, idx) => {
                            const itemId = `id${index}-${idx}`;
                            return (
                                <div key={itemId} className='flex items-center space-x-2 my-2'>
                                    <RadioGroupItem value={item} id={itemId} />
                                    <Label htmlFor={itemId}>{item}</Label>
                                </div>
                            )
                        })}
                    </div>
                ))}
            </RadioGroup>

            <div className="mt-2">
                <h2 className='font-semibold text-md mb-2'>Salary Range (₹ LPA)</h2>
                <div className="relative w-full h-8">
                    {/* Track */}
                    <div className="absolute top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-200 rounded"></div>

                    {/* Range fill */}
                    <div
                        className="absolute top-1/2 transform -translate-y-1/2 h-1 bg-[#6A38C2] rounded"
                        style={{
                            left: `${(salary[0] / 100) * 100}%`,
                            width: `${((salary[1] - salary[0]) / 100) * 100}%`,
                        }}
                    ></div>

                    {/* Min Slider */}
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={salary[0]}
                        onChange={handleMinChange}
                        className="absolute w-full h-1 appearance-none bg-transparent pointer-events-none"
                    />
                    {/* Max Slider */}
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={salary[1]}
                        onChange={handleMaxChange}
                        className="absolute w-full h-1 appearance-none bg-transparent pointer-events-none"
                    />

                    {/* Custom Thumb Styles */}
                    <style>{`
                    input[type="range"]::-webkit-slider-thumb {
                    appearance: none;
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                    background-color: #6A38C2;
                    border: 2px solid white;
                    cursor: pointer;
                    pointer-events: all;
                    position: relative;
                    z-index: 10;
                    top: 5px; /* Center the thumb vertically */
                     }
                     input[type="range"]::-moz-range-thumb {
                       width: 16px;
                       height: 16px;
                       border-radius: 50%;
                       background-color: #6A38C2;
                       border: 2px solid white;
                       cursor: pointer;
                       pointer-events: all;
                       position: relative;
                       z-index: 10;
                     }                  

                    input[type="range"]::-webkit-slider-runnable-track {
                      height: 1px; /* Match your custom track height */
                    }
                    input[type="range"]::-moz-range-track {
                      height: 1px; /* Match your custom track height */
                    }
                  `}</style>

                </div>

                <div className="text-sm text-gray-600">
                    ₹{salary[0]}L - ₹{salary[1]}L
                </div>
            </div>
        </div>
    );
};

export default FilterCard;
