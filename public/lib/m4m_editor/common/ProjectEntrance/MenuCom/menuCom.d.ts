import { MenuProps } from 'antd';
interface PropsType {
    menuList: MenuProps['items'];
    emitSetMenuKey: Function;
    currentMenuKey: String;
}
export default function MenuCom(props: PropsType): JSX.Element;
export {};
