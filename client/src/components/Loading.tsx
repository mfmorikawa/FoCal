import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"

export function Loading(): JSX.Element {
    return (
        <div className="text-center">
            <h1 className="text-5xl font-bold m-10">Loading...</h1>
            <FontAwesomeIcon
                title="Loading"
                icon={faSpinner} 
                size={"8x"}  
                spinReverse={true}
                pulse={true}
            />
        </div>
    );
}