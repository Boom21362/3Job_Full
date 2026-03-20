import { resolve } from "path"

export default async function userLogin(userEmail:string,userPassword:string) {
    
    const response = await fetch("https://3-job-back-end.vercel.app/api/v1/auth/login",{
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email:userEmail,
            password: userPassword
        })
    })

    if(!response.ok){
        throw new Error("Failed to log-in")
    }

    return await response.json()
}