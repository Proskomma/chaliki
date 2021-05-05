import Container from "@material-ui/core/Container";
import React from "react";

const Data = props => {
    return (
        <Container>
            <p>Data {JSON.stringify(Object.values(props))}</p>
        </Container>);
}

export default Data;