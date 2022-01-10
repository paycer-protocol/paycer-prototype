export default function (ts, m) {
    var years = Math.floor(m / 12);
    var months = m - (years * 12);
    if (years) ts.setFullYear(ts.getFullYear() + years);
    if (months) ts.setMonth(ts.getMonth() + months);
    return ts
}