import { GuardType } from "~/utils/constants";

export const useGuard = () => {
    const user = useUser();
    const guardDialogType = useState<number>("guardDialogType", () => 0);

    const guardAction = (action: () => void) => {
        if (!user.value) {
            guardDialogType.value = GuardType.NOT_LOGGED_IN;
            return;
        }
        if (user.value.role == UserTypeEnum.Company) {
            guardDialogType.value = GuardType.NOT_NORMAL_USER;
            return;
        }
        action();
    };

    return { guardDialogType, guardAction };
};
