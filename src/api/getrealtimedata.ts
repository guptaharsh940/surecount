import { store } from "@/redux/store";

interface MyDataweekbyday {
    thisWeekAdjTotal: number;
    day: string;
    date: string;
    week: number;
}
export const fetchWeekbyDay = async () => {

    const url = `${process.env.NEXT_PUBLIC_APIURL2}/admin/dekiData/getThisWeekByDay/${store.getState().authReducer.value.storeId}`;

    try {
        const response = await fetch(url, {
            // mode:'no-cors',
            method: 'GET',
            headers: {
                accept: 'application/json'
            },
        });
        const responseData: { Data: MyDataweekbyday[] } = await response.json();
        console.log("from backend-", responseData);
        const adjTotal: number[] = responseData.Data.map((item) => item.thisWeekAdjTotal);
        const weeks: string[] = responseData.Data.map((item) => item.day);
        console.log("returned")
        return { adjTotal, weeks };

    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};
interface MyDatamonthbyweek {
    trnMonth: null; // You can replace 'string' with the actual type if trnMonth is expected to be a string
    thisWeekAdjTotal: number;
    currentYearMonthInvoice: null; // Replace 'string' if it's expected to be a string
    previousYearMonthInvoice: null; // Replace 'string' if it's expected to be a string
    week: string;
    month: string;
}
export const fetchMonthbyWeek = async () => {

    const url = `${process.env.NEXT_PUBLIC_APIURL2}/admin/dekiData/getThisMonthByWeek/${store.getState().authReducer.value.storeId}`;

    try {
        const response = await fetch(url, {
            // mode:'no-cors',
            method: 'GET',
            headers: {
                accept: 'application/json'
            },
        });
        const responseData: { Data: MyDatamonthbyweek[] } = await response.json();
        console.log("from backend-", responseData);
        const adjTotal: number[] = responseData.Data.map((item) => item.thisWeekAdjTotal);
        const weeks: string[] = responseData.Data.map((item) => item.week);
        console.log("returned")
        return { adjTotal, weeks };

    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};


interface MyDatadodbyHour {
    trnDate: string;
    currentYearDate: string;
    currentDayAdjTotal: number;
    previousDayAdjTotal: number;
    currentDayPreviousYearAdjTotal: number;
    previousDayPreviousYearAdjTotal: number;
    hour: number;
    comparisonToday: number;
    comparisonYesterday: number;
}
export const fetchdodbyhour = async () => {
    
    const url = `${process.env.NEXT_PUBLIC_APIURL2}/admin/dekiData/dodByHour/${store.getState().authReducer.value.storeId}`;

    try {
        const response = await fetch(url, {
            // mode:'no-cors',
            method: 'GET',
            headers: {
                accept: 'application/json'
            },
        });
        const responseData: { Data: MyDatadodbyHour[] } = await response.json();
        console.log("from backend-", responseData);
        const dates:string[] = [responseData.Data[0].trnDate, responseData.Data[0].currentYearDate]
        const label:string[] = responseData.Data.map((item) => item.hour.toString());
        const data1: number[] = responseData.Data.map((item) => item.currentDayAdjTotal);
        const data2: number[] = responseData.Data.map((item) => item.previousDayAdjTotal);
        console.log("returned")
        return { dates,label,data1,data2 };

    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};




interface MyDatamonthweekbyYOY {
    thisWeekAdjTotal: number;
    previousYearSameWeekAdjTotal: number;
    week: string;
}
export const fetchgetThisMonthWeeksByYOY = async () => {

    const url = `${process.env.NEXT_PUBLIC_APIURL2}/admin/dekiData/getThisMonthWeeksByYOY/${store.getState().authReducer.value.storeId}`;

    try {
        const response = await fetch(url, {
            // mode:'no-cors',
            method: 'GET',
            headers: {
                accept: 'application/json'
            },
        });
        const responseData: { Data: MyDatamonthweekbyYOY[] } = await response.json();
        console.log("from backend-", responseData);
        const dates:string[] = ["2024", "2023"]
        const label:string[] = responseData.Data.map((item) => item.week);
        const data1: number[] = responseData.Data.map((item) => item.thisWeekAdjTotal);
        const data2: number[] = responseData.Data.map((item) => item.previousYearSameWeekAdjTotal);
        console.log("returned")
        return { dates,label,data1,data2 };

    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};


interface MyDatagetThisWeekByYOY {
    previousYearWeek: number;
    currentYearWeekAdjTotal: number;
    previousYearWeekAdjTotal: number;
    day: string;
    week: number;
    date: string;
    previousYearDate: string;
}
export const fetchgetThisWeekByYOY = async () => {

    const url = `${process.env.NEXT_PUBLIC_APIURL2}/admin/dekiData/getThisWeekByYOY/${store.getState().authReducer.value.storeId}`;

    try {
        const response = await fetch(url, {
            // mode:'no-cors',
            method: 'GET',
            headers: {
                accept: 'application/json'
            },
        });
        const responseData: { Data: MyDatagetThisWeekByYOY[] } = await response.json();
        console.log("from backend-", responseData);
        const date1 = new Date(responseData.Data[0].date)
        const date2 = new Date(responseData.Data[0].previousYearDate)
        const dates:string[] = [`Week ${responseData.Data[0].week} ${date1.getFullYear}`, `Week ${responseData.Data[0].week} ${date2.getFullYear}`]
        const label:string[] = responseData.Data.map((item) => item.day);
        const data1: number[] = responseData.Data.map((item) => item.currentYearWeekAdjTotal);
        const data2: number[] = responseData.Data.map((item) => item.previousYearWeekAdjTotal);
        console.log("returned")
        return { dates,label,data1,data2 };

    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

interface MyDatayearAndMonth {
    currentYear: number;
    previousYear: number;
    currentYearAdjTotal: number;
    previousYearAdjTotal: number;
    month: string;
}
export const fetchyearAndMonth = async () => {

    const url = `${process.env.NEXT_PUBLIC_APIURL2}/admin/dekiData/yearAndMonth/${store.getState().authReducer.value.storeId}/${store.getState().authReducer.value.clientId}`;

    try {
        const response = await fetch(url, {
            // mode:'no-cors',
            method: 'GET',
            headers: {
                accept: 'application/json'
            },
        });
        const responseData: { Data: MyDatayearAndMonth[] } = await response.json();
        console.log("from backend-", responseData);
        const dates:string[] = [responseData.Data[0].currentYear.toString(), responseData.Data[0].previousYear.toString()]
        const label:string[] = responseData.Data.map((item) => item.month);
        const data1: number[] = responseData.Data.map((item) => item.currentYearAdjTotal);
        const data2: number[] = responseData.Data.map((item) => item.previousYearAdjTotal);
        console.log("returned")
        return { dates,label,data1,data2 };

    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

