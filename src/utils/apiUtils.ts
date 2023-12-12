export function apiGET(route: string): any {
    const currentUrl = window.location.href;
    const baseUrl = currentUrl.split('/').slice(0, 3).join('/');
    return new Promise((resolve, err) => {
        fetch(baseUrl + '/api/' + route)
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(error => err(error));
    });
}