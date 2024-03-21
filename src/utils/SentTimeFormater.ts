export function formatSentTime(date: Date): string {
    const date_ = new Date(date)
    const now = new Date();
    const secondsAgo = Math.floor((now.getTime() - date_.getTime()) / 1000);

    // If message sent less than a minute ago, display "just now"
    if (secondsAgo < 60) {
        return "just now";
    }

    // If message sent less than an hour ago, display minutes
    if (secondsAgo < 3600) {
        const minutes = Math.floor(secondsAgo / 60);
        return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    }

    // If message sent less than a day ago, display hours
    if (secondsAgo < 86400) {
        const hours = Math.floor(secondsAgo / 3600);
        return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    }

    // If message sent yesterday, display "yesterday"
    if (isYesterday(date_)) {
        return "yesterday";
    }

    // Otherwise, format the date as a string
    return date_.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit'
    });
}

// Function to check if a date is yesterday
function isYesterday(date: Date): boolean {
    const today = new Date();
    const yesterday = new Date(today);
    // setDate implementation wow
    yesterday.setDate(today.getDate() - 1);
    return date.getDate() === yesterday.getDate() &&
           date.getMonth() === yesterday.getMonth() &&
           date.getFullYear() === yesterday.getFullYear();
}
