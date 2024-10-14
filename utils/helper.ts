import { differenceInCalendarDays } from "date-fns/esm";
import type { ApiValidationError, ZodValidationError } from "./types";

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

/**
 * Check if the error is an ApiValidationError
 * This is done by checking if error is a truthy value, an object, as well as all the keys and values are strings
 *
 * @export
 * @param {*} error
 * @return {*}  {error is ApiValidationError}
 */
export function isValidationError(error: any): error is ApiValidationError {
    return (
        error &&
        typeof error === "object" &&
        Object.keys(error).every(
            (key) =>
                typeof key === "string" &&
                Array.isArray(error[key]) &&
                error[key].every((value) => typeof value === "string")
        )
    );
}

/**
 * Transform an ApiValidationError to a ZodValidationError
 *
 * @export
 * @param {{ [key: string]: string }} error
 * @return {*}  {ZodValidationError[]}
 */
export function transformValidationError(error: {
    [key: string]: string[];
}): ZodValidationError[] {
    return Object.keys(error).map((key) => ({
        path: key,
        message: error[key][0],
    }));
}

/**
 * Convert an error object to an array of ZodValidationError, if possible
 *
 * @export
 * @param {*} errors
 * @return {*}  {ZodValidationError[]}
 */
export function getValidationErrors(errors: any): ZodValidationError[] {
    if (isValidationError(errors)) {
        return transformValidationError(errors);
    }
    return [];
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
