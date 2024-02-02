"use client"
import { GetServerSideProps } from 'next/types';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { fetchData } from '@/api/getlegacydata';
import footfallSlices, { footfall } from '@/redux/features/footfall-slices';
import { useDispatch } from 'react-redux';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import ProtectedPage from '@/components/ProtectedPage';
import Navbar from '@/components/navbar';
import { DatePickerWithRange } from '@/components/Daterangepick';
import { useAppSelector } from '@/redux/store'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/button';

type apidata = {
    adjtotal: number;
    intotal: number;
    outtotal: number;
    region: string;
    storecode: string;
    storename: string;
    trndate: number;
    trnhour: number;
}
const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString(); // Adjust the format as needed
};
const LegacyReport = () => {
    const dispatch = useDispatch();
    const date = useAppSelector((state) => state.calendarReducer.value)
    const pageCount = useAppSelector((state) => state.footfallReducer.value.count)
    const timefromredux: string = useAppSelector((state) => state.footfallReducer.value.time)
    const { data, error } = useSWR('fetchData', fetchData);
    const [loading, setLoading] = useState(true);
    const [selectedTime, setSelectedTime] = useState<string>(timefromredux);

    const handleSelectChange = (event: React.MouseEvent<HTMLDivElement>) => {
        const selectedValue:string = event.currentTarget.getAttribute("data-value") as string;
        setSelectedTime(selectedValue);
    };
    const [maindata, setmaindata] = useState<apidata[]>();
    useEffect(() => {
        if (data) {
            setLoading(false);
            setmaindata(data.Data)
        }
    }, [data, date, pageCount]);

    useEffect(() => {
        // Set the initial selectedTime value from Redux to local state
        dispatch(footfall.actions.changeFootfall(selectedTime));
    }, [dispatch, selectedTime]);
    const fetchDataAndUpdate = async () => {
        try {
            // Set loading to true to show the loading message
            setLoading(true);

            // Fetch data using the fetchData function
            const newData = await fetchData();

            // Update the state with the new data
            setmaindata(newData.Data);

            // Set loading to false after data is fetched and updated
            setLoading(false);
        } catch (error) {
            // Handle errors if any
            console.error("Error fetching data:", error);
            setLoading(false);
        }
    };
    const handleBack = () =>{
        dispatch(footfall.actions.decrementCount())
        fetchDataAndUpdate()
        
    }
    const handleNext = () =>{
        dispatch(footfall.actions.incrementCount())
        fetchDataAndUpdate()

    }
    const handleCount = (n:number) =>{
        dispatch(footfall.actions.setCount(n))
        fetchDataAndUpdate()

    }
    if (error) {
        return <div>Error loading data: {error.message}</div>;
    }
    // console.log(data.Data)
    return (
        <ProtectedPage>
            <Navbar />
            <div className='m-10'>
                <div className='flex space-x-3'>

                    <DatePickerWithRange />
                    <Select defaultValue={selectedTime}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Footfall" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="hourly" onSelect={handleSelectChange}>Footfall - Hourly</SelectItem>
                            <SelectItem value="daily" onSelect={handleSelectChange}>Footfall - Daily</SelectItem>
                            <SelectItem value="summary" onSelect={handleSelectChange}>Footfall - Summary</SelectItem>
                        </SelectContent>
                    </Select>

                    <Button variant="ghost" onClick = {fetchDataAndUpdate}>
                        Refresh
                    </Button>
                </div>
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <>
                            <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Store Code</TableHead>
                                <TableHead>Store Name</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Hour</TableHead>
                                <TableHead>In</TableHead>
                                <TableHead>Out</TableHead>
                                <TableHead>Footfall</TableHead>
                                <TableHead >Region</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {maindata?.map((element) => (
                                <TableRow key={element.adjtotal}>
                                    <TableCell className="font-medium">{element.storecode}</TableCell>
                                    <TableCell>{element.storename}</TableCell>
                                    <TableCell>{formatDate(element.trndate)}</TableCell>
                                    <TableCell>{element.trnhour}</TableCell>
                                    <TableCell>{element.intotal}</TableCell>
                                    <TableCell>{element.outtotal}</TableCell>
                                    <TableCell>{element.adjtotal}</TableCell>
                                    <TableCell >{element.region}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>

                    </Table>
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious onClick={handleBack} />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink onClick={() => handleCount(pageCount)} isActive>{pageCount}</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink onClick={() => handleCount(pageCount+1)} isActive>{pageCount+1}</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink onClick={() => handleCount(pageCount+2)} isActive>{pageCount}</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink onClick={() => handleCount(pageCount+3)} isActive>{pageCount+3}</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink onClick={() => handleCount(pageCount+4)} isActive>{pageCount+4}</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink onClick={() => handleCount(pageCount+5)} isActive>{pageCount+5}</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink onClick={() => handleCount(pageCount+6)} isActive>{pageCount+6}</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink onClick={() => handleCount(pageCount+7)} isActive>{pageCount+7}</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink onClick={() => handleCount(pageCount+8)} isActive>{pageCount+8}</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink onClick={() => handleCount(pageCount+9)} isActive>{pageCount+9}</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationNext onClick={handleNext} />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                    
                    </>
                )
                
                }
            </div>
        </ProtectedPage>
    );
}

export default LegacyReport;

