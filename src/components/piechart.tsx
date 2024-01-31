import React from 'react'
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import 'chartjs-plugin-datalabels';
import { useAppSelector } from '@/redux/store'
import { faDownload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import xldownload from './xlsxdownloader';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

ChartJS.register(ArcElement, Tooltip, Legend);

type propsforchart = {
    inputdata: Array<number>;
    labels: Array<string>;
    title: string
}
type Object = {
    col1:string,
    col2:number
}

const Piechart: React.FC<propsforchart> = ({ inputdata, labels, title }) => {
    // Data for the Doughnut chart
    const handleDownload = () => {
        // Replace the label and data with your actual data
        const label = ['Field', 'Data'];
        const data:Object[] = [];
        for (let i = 0; i < inputdata.length; i++) {
            const newObj:Object = {
                col1: labels[i],
                col2:inputdata[i],
            };
            data.push(newObj)
            
        }
    
        // Call the xldownload function
        xldownload(label, data);
    };
    const data = {
        labels: labels,
        datasets: [
            {
                data: inputdata,
                backgroundColor: [
                    '#436EB1',
                    '#7EB9C9',
                    '#436EB1',
                    '#7EB9C9',
                    '#436EB1',
                    '#7EB9C9',
                ],
                hoverBackgroundColor: [
                    '#223759',
                    '#367181',
                    '#223759',
                    '#367181',
                    '#223759',
                    '#367181',
                ],
            },
        ],
    };

    // Options for the Doughnut chart
    const customOptions = {
        plugins: {
            legend: {
                position: 'right' as any, // or any other valid position like 'center', 'left', 'right', 'bottom', 'chartArea', etc.
                display: true, // Example: Hide legend

            },
            datalabels: {
                color: 'black',
                display: true,
                formatter: (value: any, context: any) => {
                    return value; // Display the data value
                },
            }
        },
        maintainAspectRatio: false, // Allow chart to not maintain aspect ratio
        responsive: true,
        width: 760, // Set the desired width of the chart
        height: 330, // Set the desired height of the chart
    };
    const date = useAppSelector((state) => state.calendarReducer.value)
    return (
        <div className='flex h-96 mr-4 mb-4 lg:w-1/2 sm:w-full md:w-4/5'>
            <Card className='relative h-full w-full hover:shadow-xl'>
                <CardHeader className='pb-0'>
                    <CardTitle>{title}
                    </CardTitle>
                    <button className="absolute right-8 hover:text-blue-500" onClick={handleDownload}>
                        <FontAwesomeIcon icon={faDownload} />
                    </button>

                    <CardDescription>
                        {`${date.from.getDate()}/${date.from.getMonth() + 1}/${date.from.getFullYear()}`} - {date.to ? `${date.to.getDate()}/${date.to.getMonth() + 1}/${date.to.getFullYear()}` : `${date.from.getDate()}/${date.from.getMonth() + 1}/${date.from.getFullYear()}`}
                    </CardDescription>
                </CardHeader>
                <CardContent className='h-4/5'>
                    <Doughnut className='' data={data} options={customOptions} />
                </CardContent>
            </Card>
        </div>
    );
};
export default Piechart