import { store } from "@/redux/store";

export const fetchgetReports = async () => {

    const url = `${process.env.NEXT_PUBLIC_APIURL2}/admin/dekiData/getReports/${store.getState().authReducer.value.userId}`;

    try {
        const response = await fetch(url, {
            // mode:'no-cors',
            method: 'GET',
            headers: {
                accept: 'application/json'
            },
        });
        const responseData: { Data: string } = await response.json();
        console.log("from backend-", responseData);
        const data:string = responseData.Data
        console.log("returned")
        return data;

    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};