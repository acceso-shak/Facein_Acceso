import {Helmet as H} from "react-helmet";

export default function Head({children}){
    return (
        <H>
            {children}
        </H>
    )
}