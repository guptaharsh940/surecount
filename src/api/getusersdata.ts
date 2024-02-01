import { store } from "@/redux/store";


interface MyDatagetuserdata {
    activeCount: number;
    usersCount: number;
}
export const fetchgetuserdata = async () => {

    const url = `${process.env.NEXT_PUBLIC_APIURL2}/admin/user/getUsers/${store.getState().authReducer.value.username}`;

    try {
        const response = await fetch(url, {
            // mode:'no-cors',
            method: 'GET',
            headers: {
                accept: 'application/json'
            },
        });
        const responseData: { data: MyDatagetuserdata } = await response.json();
        console.log("from backend-", responseData);
        return { activeCount: responseData.data.activeCount, usersCount:responseData.data.usersCount };

    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};
