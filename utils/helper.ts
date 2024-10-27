import { differenceInCalendarDays } from "date-fns/esm";
import {
    ProviderTypeEnum,
    UserTypeEnum,
    type ApiValidationError,
    type ZodValidationError,
} from "./types";

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

export async function logOut() {
    await $fetch("/api/logout", {
        method: "POST",
    });

    window.location.href = "/";
}

export function getFileExtensionByFileType(type: string) {
    switch (type) {
        case "application/msword":
            return "doc";
        case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
            return "docx";
        case "application/pdf":
            return "pdf";
    }
}

export async function linkAccount(
    sessionId: string | null,
    data: {
        provider: ProviderTypeEnum;
        provider_id: string;
        provider_account_profile?: string;
    }
): Promise<string> {
    const runtimeConfig = useRuntimeConfig();
    // if user is logged in, then this is for linking the account
    if (sessionId) {
        const { session, user } = await lucia.validateSession(sessionId);
        if (session && user.role === UserTypeEnum.Company) {
            const response = await fetch(
                `${runtimeConfig.public.apiURL}/auth/link-account`,
                {
                    method: "POST",
                    headers: {
                        Cookie: "auth_session=" + sessionId,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                }
            );

            // const text = await response.text();
            // console.log({ text });
            const json: ApiResponse = await response.json();
            if (!json || !json.success) {
                return `/c/account-management?link_type=0&link_message=${encodeURIComponent(
                    json.message ?? "Failed to link account"
                )}`;
            }
            return `/c/account-management?link_type=1&link_message=${encodeURIComponent(
                json.message
            )}`;
        }
    }

    return "";
}
