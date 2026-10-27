import {useAppDispatch, useAppSelector} from "@/app/configureStore";
import {AlertList, dismissAlert, selectAllAlerts, type StyledErrorAlert} from "@chumsinc/alert-list";

export default function AppAlertsList() {
    const dispatch = useAppDispatch();
    const alerts = useAppSelector(selectAllAlerts);

    const onDismiss = (alert:StyledErrorAlert) => {
        dispatch(dismissAlert(alert));
    }

    return (
        <AlertList list={alerts} onDismiss={onDismiss} alertProps={{className: 'my-1'}} />
    )
}
