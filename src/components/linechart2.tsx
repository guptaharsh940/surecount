import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Tooltip, Legend } from 'chart.js';
import 'chartjs-plugin-datalabels';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';
import { faDownload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import xldownload from './xlsxdownloader';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);
type Object = {
    col1:string,
    col2:number,
    col3:number
}
type PropsForChart = {
    inputdata1: Array<number>;
    inputdata2: Array<number>;
    labels: Array<string>;
    mainlabels: Array<string>;
    title: string;
};

const LineChart2: React.FC<PropsForChart> = ({ inputdata1, inputdata2, labels, mainlabels,title }) => {
    // Data for the Line chart
    const data = {
        labels: labels.length > 0 ? labels : Array.from({ length: inputdata1.length }, (_, i) => i.toString()),
        datasets: [
            {
                label: mainlabels[0],
                data: inputdata1,
                borderColor: '#436EB1',
                fill: false,
                tension: 0.1,
            },
            {
                label: mainlabels[1],
                data: inputdata2,
                borderColor: '#FF5733', // Change color for the second line
                fill: false,
                tension: 0.1,
            },
        ],
    };
    const handleDownload = () => {
        // Replace the label and data with your actual data
        const label = ['Field', mainlabels[0], mainlabels[1]];
        const data:Object[] = [];
        for (let i = 0; i < inputdata1.length; i++) {
            const newObj:Object = {
                col1: labels[i],
                col2:inputdata1[i],
                col3:inputdata2[i]
            };
            data.push(newObj)
            
        }
    
        // Call the xldownload function
        xldownload(label, data);
    };

    // Options for the Line chart
    const customOptions = {
        scales: {
            x: {
                // Ensure you provide the correct labels here
            },
            y: {
                // Your y-axis configuration
            },
        },
        plugins: {},
        maintainAspectRatio: false, // Allow chart to not maintain aspect ratio
        responsive: true,
    };

    return (
        <div className='flex h-96 mr-4 mb-4 lg:w-1/2 sm:w-full md:w-4/5'>
            <Card className='relative h-full w-full hover:shadow-xl'>
                <CardHeader className='pb-0'>
                    <CardTitle>{title}</CardTitle>
                    <button className="absolute right-8 hover:text-blue-500" onClick={handleDownload}>
                        <FontAwesomeIcon icon={faDownload} />
                    </button>
                </CardHeader>
                <CardContent className='h-4/5'>
                    <Line className='' data={data} options={customOptions} />
                </CardContent>
            </Card>
        </div>
    );
};

export default LineChart2;
