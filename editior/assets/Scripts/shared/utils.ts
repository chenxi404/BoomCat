import * as fgui from "fairygui-cc";
class Utils{
    formatString(template: string, ...args: any[]): string {
        return template.replace(/{(\d+)}/g, (match, index) => {
            const argIndex = parseInt(index, 10);
            return args[argIndex] !== undefined ? args[argIndex] : match;
        });
    }

    cacheUIPackage(pkg:fgui.UIPackage){
        if(game.UIPackageCache[pkg.id] == null){
            game.UIPackageCache[pkg.id] = 0;
        }
        game.UIPackageCache[pkg.id] = game.UIPackageCache[pkg.id] + 1;
    }

    freeUIPackage(pkg:fgui.UIPackage){
        if(game.UIPackageCache[pkg.id] != null){
            game.UIPackageCache[pkg.id] = game.UIPackageCache[pkg.id] - 1;
            if(game.UIPackageCache[pkg.id] == 0){
                fgui.UIPackage.removePackage(pkg.id);
            }
        }
    }
}

export const UtilsInstance = new Utils();