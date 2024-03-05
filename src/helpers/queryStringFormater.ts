export const queryStringFormater = (params: Record<string, unknown> | undefined): string => {
    if (params && Object.keys(params).length) {
        let result = '';
        for(const [key, value] of Object.entries(params)) {
            result += `${key}=${value}&`;
        }
        return result;
    }
    return '';
}