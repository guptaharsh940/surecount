import { userperm } from "@/components/userscomp/userform";
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
        // console.log(response.json())
        const responseData: { data: Array<MyDatagetuserdata> } = await response.json();
        console.log("from backend-", responseData);
        return { activeCount: responseData.data[0].activeCount, usersCount: responseData.data[0].usersCount };

    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

interface User {
    id: number;
    userName: string;
    profileName: string;
    password: string;
    email: string;
    image: string;
    logo: string;
    imageName: string;
    logoName: string;
    isAdmin: null | boolean;
    permission: boolean;
    maxUser: number;
    allClients: boolean;
    particularClients: boolean;
    numberOfUserCreated: null | number;
    createdBy: number;
    userClients: null | any; // Replace 'any' with the appropriate type when available
    nestedUserClients: null | any; // Replace 'any' with the appropriate type when available
    permissionBean: null | any; // Replace 'any' with the appropriate type when available
    xAuthToken: null | string;
    storeId: null | number;
    zoneId: null | number;
    clientId: null | number;
    device: null | string;
    deviceId: null | string;
    template: null | any; // Replace 'any' with the appropriate type when available
    templateId: number;
    clientName: string;
    userType: string;
    parentUserType: null | string;
    parentUserName: null | string;
    parentUserId: null | number;
};

export const fetchgetusers = async () => {

    const url = `${process.env.NEXT_PUBLIC_APIURL2}/admin/user/getUsersList/${store.getState().authReducer.value.username}`;

    try {
        const response = await fetch(url, {
            // mode:'no-cors',
            method: 'POST',
            headers: {
                accept: 'application/json'
            },
        });
        // console.log(response.json())
        const responseData: Array<User> = await response.json();
        console.log("from backend-", responseData);
        return responseData;

    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

interface NewUser {
    id: number;
    allClients: boolean;
    createdDate: null | string;
    createdTime: null | string;
    email: string;
    isAdmin: null | boolean;
    logoName: null | string;
    maxUser: null | number;
    particularClients: boolean;
    password: string;
    permission: boolean;
    profileName: string;
    resetEndTime: null | string;
    resetId: null | number;
    resetStartTime: null | string;
    resetStatus: null | string;
    status: null | string;
    updatedDate: null | string;
    updatedTime: null | string;
    userName: string;
    createdBy: null | string;
    image: null | string;
    deviceId: null | string;
    templateId: number;
    imageName: null | string;
    logo: null | string;
    userType: null | string;
    parentUserType: null | string;
    parentUserName: null | string;
    parentUserId: null | string;
};

type formd = {
    username: string,
    profileName: string,
    email: string,
    password: string,
    confirmPassword: string,
}

export const saveUserData = async (formdata: formd, userperm: userperm, appid: number) => {
    const url = `${process.env.NEXT_PUBLIC_APIURL2}/admin/user/saveUserDetails/${store.getState().authReducer.value.username}`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({

                "userName": formdata.username,
                "profileName": formdata.profileName,
                "password": formdata.password,
                "email": formdata.email,
                "allClients": false,
                "particularClients": true,
                "userClients": store.getState().filterReducer.userClients,
                "image": null,
                "logo": null,
                "imageName": null,
                "logoName": null,
                "userType": null,
                "parentUserType": null,
                "parentUserName": null,
                "parentUserId": null,
                "permission": true,
                "permissionBean": userperm,
                "templateId": appid

            })
        });
        const responseData: NewUser = await response.json();
        return responseData.id;

    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};