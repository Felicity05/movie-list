"use client";

import {useRouter} from "next/navigation";

export function BackButton() {
    const router = useRouter();

    // back() keeps the list's filters, page and search; a page opened directly has no history, so go to the list
    function goBack() {
        if (window.history.length > 1) {
            router.back();
        } else {
            router.push("/");
        }
    }

    return (
        <button onClick={goBack}
                className="w-fit bg-bright-green hover:bg-ink hover:text-white text-black font-bold py-2 px-4 rounded cursor-pointer mx-auto">
            ← Back to movie list
        </button>
    )
}
