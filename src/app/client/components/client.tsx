"use client"

import { useEffect, useState } from "react";
import Link from "next/link";

interface ClientProps {
    callback: (pref: string) => Promise<any[] | undefined>;
    randomCallback: (pref: string) => Promise<any[] | undefined>;
    name: string;
    surname: string;
    pref: string;
}

const Client: React.FC<ClientProps> = ({ callback, pref, name, surname, randomCallback }) => {
    const [otherPref, setOtherPref] = useState("");
    const [picRes, setPicRes] = useState<any[]>([]);
    const [tempIndex, setTempIndex] = useState(0);
    const [approvedImages, setApprovedImages] = useState<string[]>([]);

    useEffect(() => {
        if (pref !== "Other" && pref !== "") {
            fetchImages(pref);
        }
    }, []);

    async function fetchImages(pref: string) {
        const res = await callback(pref);
        setPicRes(res || []);
    }

    async function fetchRandomImage() {
        const res = await randomCallback(pref !== "Other" ? pref : otherPref);
        setTempIndex(0);
        setPicRes(res || []);
    }

    const ImageApprovalView = () => {
        if (tempIndex >= picRes.length) {
            return (
                <div className="my-10">
                    <p>No more images. Search for random image matching preference?</p>
                    <button className="rounded shadow text-black bg-slate-200 p-1" onClick={() => fetchRandomImage()}>Search</button>
                </div>
            );
        }

        return (
            <div className="bg-slate-200 my-10">
                <div className="flex justify-between">
                    <button className="rounded shadow text-black bg-green-300 p-1" onClick={() => {
                        setApprovedImages([...approvedImages, picRes[tempIndex]]);
                        setTempIndex(tempIndex + 1);
                    }}>Approve</button>
                    <button className="rounded shadow text-black bg-red-300 p-1" onClick={() => setTempIndex(tempIndex + 1)}>Reject</button>
                </div>
                <img className="w-full" src={picRes[tempIndex]} alt="Unsplash Image" />
            </div>
        )
    }

    return (
        <div className="flex flex-col items-center justify-center h-full w-full">
            <p className="text-2xl">Welcome {name} {surname}</p>
            <Link href="/">Home</Link>
            {pref === "Other" && (
                <div>
                    <input
                        type="text"
                        id="other"
                        name="other"
                        required
                        placeholder="Other preference"
                        value={otherPref}
                        onChange={(e) => setOtherPref(e.target.value)}
                    />
                    <button onClick={() => fetchImages(otherPref)}>Search</button>
                </div>
            )}
            {
                approvedImages.length > 0 && (
                    <div className="grid grid-cols-10 gap-4">
                        {approvedImages.map((pic) => (
                            <div key={pic} className="flex flex-col items-center justify-center rounded shadow bg-slate-200 p-4">
                                <p className="text-black">{name}</p>
                                <p className="text-black">{surname}</p>
                                <img key={pic} src={pic} alt="Unsplash Image" /></div>
                        ))}
                    </div>)
            }
            <ImageApprovalView />
        </div>
    )
}

export default Client