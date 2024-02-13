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

type PropsForChart = {
    inputdata: Array<number>;
    labels: Array<string>;
    title: string;
};
type Object = {
    col1: string,
    col2: number
}
const LineChart: React.FC<PropsForChart> = ({ inputdata, labels, title }) => {
    // Data for the Line chart
    const handleDownload = () => {
        // Replace the label and data with your actual data
        const label = ['Field', 'Data'];
        const data: Object[] = [];
        for (let i = 0; i < inputdata.length; i++) {
            const newObj: Object = {
                col1: labels[i],
                col2: inputdata[i],
            };
            data.push(newObj)

        }

        // Call the xldownload function
        xldownload(label, data);
    };
    const data = {
        labels: labels.length > 0 ? labels : Array.from({ length: inputdata.length }, (_, i) => i.toString()),
        datasets: [
            {

                data: inputdata,
                borderColor: '#436EB1',
                fill: false,
                tension: 0.1,
            },
        ],
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
        plugins: {
            legend: { display: false }
        },
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

export default LineChart;
