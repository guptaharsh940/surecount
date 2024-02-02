import { store } from "@/redux/store";

type clientType = {
    isExpand: boolean;
    clientId: number;
    clientName: string;
    region: Array<regionType>;
    isChecked: boolean;
}
type regionType = {
    isExpand: boolean;
    regionId: number;
    regionName: string;
    isChecked: boolean;
    level3: Array<level3Type>;
}
type level3Type = {
    level3Name: string;
    isExpand: boolean;
    level3Id: number;
    isChecked: boolean;
    level2: Array<level2Type>;
}
type level2Type = {
    isExpand: boolean;
    level2Name: string;
    level2Id: number;
    store: Array<storeType>;
    isChecked: boolean;
}
type storeType = {
    storeName: string;
    storeId: number;
    isChecked: boolean;
}

export const fetchfilterdata = async () => {

    const url = `${process.env.NEXT_PUBLIC_APIURL2}/admin/user/getDashboardClients?userName=${store.getState().authReducer.value.username}&StoreIds=${store.getState().authReducer.value.storeId}`;

    try {
        const response = await fetch(url, {
            // mode:'no-cors',
            method: 'GET',
            headers: {
                accept: 'application/json'
            },
        });
        // console.log(response.json())
        const responseData: Array<clientType> = await response.json();
        console.log("from backend-", responseData);
        return responseData;

    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};
