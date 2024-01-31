import React from 'react';
import { Bar } from 'react-chartjs-2';
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
import {CategoryScale, LinearScale,PointElement, BarElement} from 'chart.js'; 
ChartJS.register(CategoryScale, LinearScale,PointElement, BarElement);

type PropsForChart = {
    inputdata: Array<number>;
    labels: Array<string>;
    title:string;
};

const BarChart: React.FC<PropsForChart> = ({ inputdata, labels, title }) => {
    // Data for the Bar chart
    const data = {
        labels: labels.length > 0 ? labels : Array.from({ length:  inputdata.length}, (_, i) => i.toString()),
        datasets: [
            {
                label: 'Bar Chart',
                data: inputdata,
                backgroundColor: '#436EB1',
                borderColor: '#436EB1',
                borderWidth: 1,
            },
        ],
    };

    // Options for the Bar chart
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
            <Card className='h-full w-full hover:shadow-xl'>
                <CardHeader className='pb-0'>
                    <CardTitle>{title}</CardTitle>
                </CardHeader>
                <CardContent className='h-4/5'>
                    <Bar className='' data={data} options={customOptions} />
                </CardContent>
            </Card>
        </div>
    );
};

export default BarChart;
