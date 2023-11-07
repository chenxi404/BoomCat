class Utils{
    formatString(template: string, ...args: any[]): string {
        return template.replace(/{(\d+)}/g, (match, index) => {
            const argIndex = parseInt(index, 10);
            return args[argIndex] !== undefined ? args[argIndex] : match;
        });
    }
}

export const UtilsInstance = new Utils();