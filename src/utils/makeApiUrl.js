export default function makeApiRoute(model, query) {
    const protocol = 'http://'
    const domain = 'localhost'
    const port = '3001'
    const apiBase = 'api/'
    const qs = Object.keys(query || {})
        .filter(k => query[k] !== null && query[k] !== undefined)
        .map(k => `${k}=${query[k]}`)
        .join('&');
    return `${protocol}${domain}:${port}/${apiBase}${model}${qs.length ? '?' : ''}${qs}`;
}
  
  