import ProjectWindow from "./MainCom/ProjectWindow/projectWindow";
import StudyWindow from "./MainCom/StudyWindow/studyWindow";
import CommunityWindow from "./MainCom/CommunityWindow/communityWindow";
import InstallationWindow from "./MainCom/InstallationWindow/installationWindow";
import RoutineWindow from "./MainCom/RoutineWindow/routineWindow";
import LicenseWindow from "./MainCom/LicenseWindow/licenseWindow";
import AdvancedWindow from "./MainCom/AdvancedWindow/advancedWindow";
export declare const data: {
    preferencesMenu: {
        label: string;
        key: string;
    }[];
    settingMenu: {
        label: string;
        key: string;
    }[];
    renderComMap: {
        project: typeof ProjectWindow;
        study: typeof StudyWindow;
        community: typeof CommunityWindow;
        installation: typeof InstallationWindow;
        routine: typeof RoutineWindow;
        license: typeof LicenseWindow;
        advance: typeof AdvancedWindow;
    };
};
