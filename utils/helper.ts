import { differenceInCalendarDays } from "date-fns/esm";
import type { ZodValidationError } from "./types";

export function queryBuilder(
    path: string,
    query: Record<string, string | number | boolean>
): string {
    const queryString = Object.keys(query)
        .map((key) => `${key}=${encodeURIComponent(query[key])}`)
        .join("&");
    return `${path}?${queryString}`;
}

export function formatToCurrency(amount: number): string {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
    }).format(amount);
}

export function formatDate(date: Date): string {
    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}

export function formatJobPostDate(date: Date): string {
    const daysAgo = differenceInCalendarDays(new Date(), date);
    if (daysAgo === 0) {
        return "Today";
    } else if (daysAgo === 1) {
        return "Yesterday";
    } else if (daysAgo < 7) {
        return `${daysAgo} days ago`;
    } else {
        return formatDate(date);
    }
}

export function transformValidationError(error: {
    [key: string]: string;
}): ZodValidationError[] {
    return Object.keys(error).map((key) => ({
        path: key,
        message: error[key],
    }));
}

export function toastErrorMessage(
    toast: ReturnType<typeof useToast>,
    message: string
) {
    toast.add({
        title: message,
        timeout: 10000,
        color: "red",
        icon: "ic:baseline-error-outline",
        closeButton: {
            icon: "i-heroicons-x-mark-20-solid",
            color: "red",
            variant: "ghost",
            padded: false,
        },
        ui: {
            title: "text-sm font-medium text-red-700 dark:text-white",
        },
    });
}

export function toastSuccessMessage(
    toast: ReturnType<typeof useToast>,
    message: string
) {
    toast.add({
        title: message,
        timeout: 10000,
        color: "green",
        icon: "ic:outline-check-circle-outline",
        closeButton: {
            icon: "i-heroicons-x-mark-20-solid",
            color: "green",
            variant: "ghost",
            padded: false,
        },
        ui: {
            title: "text-sm font-medium text-green-700 dark:text-white",
        },
    });
}

export function prefixStorageUrl(
    url: string | null | undefined
): string | null {
    const runtimeConfig = useRuntimeConfig();

    if (!url) return null;
    return `${runtimeConfig.public.storageUrlPrefix}${url}`;
}
