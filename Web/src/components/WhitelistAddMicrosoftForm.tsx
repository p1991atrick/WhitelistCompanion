import { Button } from "@chakra-ui/button";
import Icon from "@chakra-ui/icon";
import { Spinner } from "@chakra-ui/spinner";
import React, { useState } from "react";
import { getQueryParam } from "../api";

export function WhitelistAddMicrosoftForm() {
    const [buttonDisabled, setButtonDisabled] = useState(false);

    const onClick = () => {
        setButtonDisabled(true);
        window.location.href = `/auth?ApiKey=${getQueryParam(
            "secret"
        )}&state=${getQueryParam("secret")}`;
    };

    return (
        <Button
            leftIcon={
                !buttonDisabled ? (
                    <Icon viewBox="0 0 23 23">
                        <path fill="#f35325" d="M1 1h10v10H1z" />
                        <path fill="#81bc06" d="M12 1h10v10H12z" />
                        <path fill="#05a6f0" d="M1 12h10v10H1z" />
                        <path fill="#ffba08" d="M12 12h10v10H12z" />
                    </Icon>
                ) : (
                    <Spinner />
                )
            }
            disabled={buttonDisabled}
            w="full"
            size="lg"
            background="blackAlpha.900"
            colorScheme="blackAlpha"
            color="white"
            onClick={onClick}
        >
            {!buttonDisabled
                ? "Add with Microsoft Account"
                : "Processing..."}
        </Button>
    );
}
