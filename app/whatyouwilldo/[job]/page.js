"use client"
import { useEffect,useState } from "react";
export default function CareerSuggestion({ params }) {
    
    const [mydata, setMydata] = useState("")
    
    useEffect(() => {
        params
        .then((data) => setMydata(data.job))
        .catch((e)=>console.log("Some error occured !"))
    },[mydata])

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 to-gray-700 text-white p-6">
            <div className="bg-gray-800 p-10 rounded-2xl shadow-lg text-center max-w-lg w-full">
                <h1 className="text-3xl md:text-4xl font-bold mb-4 text-blue-400">Your Future Career</h1>
                <p className="text-xl md:text-2xl font-medium"><span className="text-blue-300">{mydata?.replaceAll("-"," ")}</span></p>
            </div>
        </div>
    );
}
