import { store } from "@/redux/store";


type reportlist = {
    reportEmails: string;
    reportName: string;
    status: boolean;
}

export const fetchgetReports = async () => {

    const url = `${process.env.NEXT_PUBLIC_APIURL2}/admin/report/getReports/${store.getState().authReducer.value.userId}`;

    try {
        const response = await fetch(url, {
            // mode:'no-cors',
            method: 'GET',
            headers: {
                accept: 'application/json'
            },
        });
        const responseData:Array<reportlist> = await response.json();
        const data: Array<reportlist> = responseData
        console.log("returned")
        return data;

    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};