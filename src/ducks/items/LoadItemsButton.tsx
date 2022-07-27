import {SpinnerButton} from "chums-components";
import {useSelector} from "react-redux";
import {selectItemsLoading} from "./index";

const LoadItemsButton = () => {
    const loading = useSelector(selectItemsLoading);

    return (
        <SpinnerButton type="submit" spinning={loading} size="sm" color="primary">
            Load
        </SpinnerButton>
    )
}

export default LoadItemsButton;
