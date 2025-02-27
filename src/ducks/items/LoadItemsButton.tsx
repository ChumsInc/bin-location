import {useSelector} from "react-redux";
import {selectItemsStatus} from "./index";
import {Button} from "react-bootstrap";

const LoadItemsButton = () => {
    const loading = useSelector(selectItemsStatus);

    return (
        <Button type="submit" disabled={loading !== 'idle'} size="sm" color="primary">
            Load
        </Button>
    )
}

export default LoadItemsButton;
