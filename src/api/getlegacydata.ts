

// export const api = async () => {

import { store } from "@/redux/store";
import { calendar } from "@/redux/features/calendar-slice";
//     const response = await fetch(url, {
//         method: 'GET',
//         headers: {
//             accept: 'application/json',
//         },
//     });
//     const data = JSON.stringify(await response.json());
//     return (
//         <div>{ data } < /div>
//     )
// }

const formatDate = (datestring: Date) => {
    const date = new Date(datestring)
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`
}

export const fetchData = async () => {
    interface FootFallReportQueryParams {
        pageNum: number;
        rowPerPage: number;
        storeIds: string;
        startDate: string;
        endDate: string;
        clientId: number;
        userId: number;
    }
    type CompatibleQueryParams = Record<string, string>;
    const queryParams: FootFallReportQueryParams = {
        pageNum: store.getState().footfallReducer.value.count,
        rowPerPage: 10,
        storeIds: store.getState().authReducer.value.storeId,
        startDate: formatDate(store.getState().calendarReducer.value.from),
        endDate: formatDate(store.getState().calendarReducer.value.to ?? store.getState().calendarReducer.value.from),
        clientId: parseInt(store.getState().authReducer.value.clientId,10),
        userId: store.getState().authReducer.value.userId,
    };

    const compatibleQueryParams: CompatibleQueryParams = {};
    for (const [key, value] of Object.entries(queryParams)) {
        compatibleQueryParams[key] = String(value);
    }
    const time = store.getState().footfallReducer.value.time
    const queryParamsString = new URLSearchParams(compatibleQueryParams).toString();
    let url = "";
    if(time=="daily"){
        url = process.env.NEXT_PUBLIC_APIURL2 + `/admin/dekiReport/footFallDailyReport?${queryParamsString}`;
    }
    else if(time == "summary"){
        url = process.env.NEXT_PUBLIC_APIURL2 + `/admin/dekiReport/footFallSummaryReport?${queryParamsString}`;
    }
    else{
        url = process.env.NEXT_PUBLIC_APIURL2 + `/admin/dekiReport/footFallHourlyReport?${queryParamsString}`;

    }
    console.log(url);
    try {
        const response = await fetch(url, {
            // mode:'no-cors',
            method: 'GET',
            headers: {
                accept: 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        });
        console.log(formatDate(store.getState().calendarReducer.value.from));

        return response.json();

    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};