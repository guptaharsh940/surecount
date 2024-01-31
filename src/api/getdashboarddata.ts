

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
interface MyData {
    out: number;
    trnHour: number | null;
    trnDay: number | null;
    trnWeek: number | null;
    trnMonth: number | null;
    trnDate: number | null;
    trnYear: number | null;
    quarter: number | null;
    adjTotal: number;
    installId: number | null;
    clientId: number | null;
    region: string;
    level1: number | null;
    level2: number | null;
    level3: number | null;
    levels: number | null;
    noOfStores: number | null;
    weekStartDate: number | null;
    weekEndDate: number | null;
    in: number;
    client: string;
}
interface MyDataRegion {
    region: string;
    storeCount: string;
}
const formatDate = (datestring: Date) => {
    const date = new Date(datestring)
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`
}

export const fetchDatabyregion = async () => {
    const url = `${process.env.NEXT_PUBLIC_APIURL2}/admin/region`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "startDate": formatDate(store.getState().calendarReducer.value.from),
                "endDate": formatDate(store.getState().calendarReducer.value.to ?? store.getState().calendarReducer.value.from),
                "frequency": "none",
                "storeIds": store.getState().authReducer.value.storeId,
                "clientId": store.getState().authReducer.value.clientId,
                "userId": store.getState().authReducer.value.userId
            })
        });
        const responseData: { data: MyData[] } = await response.json();
        const adjTotalArray: number[] = responseData.data.map((item) => item.adjTotal);
        const regionArray: string[] = responseData.data.map((item) => item.region);
        return { adjTotalArray, regionArray };

    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export const fetchStoresbyregion = async () => {

    const url = `${process.env.NEXT_PUBLIC_APIURL2}/admin/${store.getState().authReducer.value.storeId}`;

    try {
        const response = await fetch(url, {
            // mode:'no-cors',
            method: 'GET',
            headers: {
                accept: 'application/json'
            },
        });
        const responseData: { Data: MyDataRegion[] } = await response.json();
        console.log("from backend-", responseData);
        const storeCount: number[] = responseData.Data.map((item) => parseInt(item.storeCount));
        const regionArray: string[] = responseData.Data.map((item) => item.region);
        console.log("returned")
        return { storeCount, regionArray };

    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};



interface MyDataDayofWeek {
    region: string;
    monday: number | null;
    tuesday: number | null;
    wednesday: number | null;
    thursday: number | null;
    friday: number | null;
    saturday: number | null;
    sunday: number | null;
}


export const fetchDatabyregionbydayofweek = async () => {
    const url = `${process.env.NEXT_PUBLIC_APIURL2}/admin/regionByDayOfWeek`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "startDate": formatDate(store.getState().calendarReducer.value.from),
                "endDate": formatDate(store.getState().calendarReducer.value.to ?? store.getState().calendarReducer.value.from),
                "frequency": "none",
                "storeIds": store.getState().authReducer.value.storeId,
                "clientId": store.getState().authReducer.value.clientId,
                "userId": store.getState().authReducer.value.userId
            })
        });
        const responseData: { data: MyDataDayofWeek[] } = await response.json();
        // const regionArray: string[] = responseData.data.map((item) => item.region);
        // const monday: (number | null)[] = responseData.data.map((item) => item.monday);
        // const tuesday: (number | null)[] = responseData.data.map((item) => item.tuesday);
        // const wednesday: (number | null)[] = responseData.data.map((item) => item.wednesday);
        // const thursday: (number | null)[] = responseData.data.map((item) => item.thursday);
        // const friday: (number | null)[] = responseData.data.map((item) => item.friday);
        // const saturday: (number | null)[] = responseData.data.map((item) => item.saturday);
        // const sunday: (number | null)[] = responseData.data.map((item) => item.sunday);

        const ans:Array<MyDataDayofWeek> = responseData.data
        return ans ;

    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};