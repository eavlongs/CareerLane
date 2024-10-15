export const useGuard = () => {
    const user = useUser();
    const isGuardDialogOpen = useState<boolean>(
        "isGuardDialogOpen",
        () => false
    );
    const guardAction = (action: () => void) => {
        if (!user.value) {
            isGuardDialogOpen.value = true;
            return;
        }
        action();
    };

    return { isGuardDialogOpen, guardAction };
};
