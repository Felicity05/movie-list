"use client"
import {useTransition} from "react";
import {usePathname, useRouter, useSearchParams} from "next/navigation";

const buttonClass = 'flex border-2 border-ink bg-bright-green px-4 py-3 cursor-pointer font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none';
const currentPageClass = 'flex border-2 border-ink bg-ink text-cream px-4 py-3 font-semibold';
const maxPageButtons = 5;

export function Pagination({currentPage, lastPage}: { currentPage: number, lastPage: number }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();

    if (lastPage <= 1) {
        return null;
    }

    // a window of up to 5 page numbers around the current page, kept inside 1..lastPage
    const firstShownPage = Math.max(1, Math.min(currentPage - Math.floor(maxPageButtons / 2), lastPage - maxPageButtons + 1));
    const lastShownPage = Math.min(lastPage, firstShownPage + maxPageButtons - 1);
    const pageNumbers = Array.from({length: lastShownPage - firstShownPage + 1}, (_, index) => firstShownPage + index);

    const goToPage = (page: number) => {
        if (page < 1 || page > lastPage || page === currentPage || isPending) {
            return;
        }

        const params = new URLSearchParams(searchParams);
        params.set("page", page.toString());
        startTransition(() => router.push(`${pathname}?${params.toString()}`));
    }

    return (
        <nav aria-label="Pagination" className="flex justify-center m-5 flex-wrap">
            <button className={buttonClass} disabled={isPending || currentPage === 1}
                    onClick={() => goToPage(currentPage - 1)}>Prev</button>

            {pageNumbers.map((page) => page === currentPage ?
                <span key={page} className={currentPageClass} aria-current="page">{page}</span> :
                <button key={page} className={buttonClass} disabled={isPending}
                        onClick={() => goToPage(page)}>{page}</button>)}

            <button className={buttonClass} disabled={isPending || currentPage >= lastPage}
                    onClick={() => goToPage(currentPage + 1)}>Next</button>
        </nav>
    );
}
