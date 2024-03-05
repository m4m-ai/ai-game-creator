export const menuItems: {
    title: string;
    submenu: ({
        title: string;
        submenu: ({
            title: string;
            submenu?: undefined;
        } | {
            title: string;
            submenu: {
                title: string;
            }[];
        })[];
    } | {
        title: string;
        submenu?: undefined;
    })[];
}[];
