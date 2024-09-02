export function queryBuilder(
    path: string,
    query: Record<string, string>
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

export function calculateDaysAgo(date: Date): number {
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - date.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export function formatJobPostDate(date: Date): string {
    const daysAgo = calculateDaysAgo(date);
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
