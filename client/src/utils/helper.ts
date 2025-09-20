export function greeting() {
    const currentTime = new Date()
    const hours = currentTime.getHours()
    if (hours < 11) return "Good Morning"
    else if (hours > 12 && hours < 20) return "Good Afternoon"
    else return "Good Night"
}
