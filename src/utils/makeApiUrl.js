export default function makeRoute(url, query) {
    const qs = Object.keys(query || {})
      .filter(k => query[k] !== null && query[k] !== undefined)
      .map(k => `${k}=${query[k]}`)
      .join('&');
    return `${url}${qs.length ? '?' : ''}${qs}`;
  }
  
  