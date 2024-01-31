export const loginapi = async(username:string,password:string) =>{
    const response = await fetch(process.env.APIURL + "/admin/user/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "userName": username , "password": password  })
    });
    const data = await response.json();
    if(response.ok){
        return data
    }
    else{
        return null
    }

}