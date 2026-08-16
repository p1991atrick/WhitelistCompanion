import { Box, Container, Flex } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/react";
import * as React from "react";
import { useQuery } from "react-query";
import { fetchUserList, getQueryParam, HttpError } from "../api";
import { Card } from "./Card";

const AuthContainer: React.FC = ({ children }) => {
    const hasSecret = getQueryParam("secret");

    const { error, isFetching } = useQuery("auth", fetchUserList, {
        retry: 1,
        refetchOnWindowFocus: false,
        refetchInterval: false,
    });

    const httpError = error as HttpError;
    const notAuthorized =
        !hasSecret || (hasSecret && httpError && httpError.statusCode === 401);

    if (error || notAuthorized) {
        return (
            <Card error={true}>
                <Box fontSize="lg" p={2} textAlign="center" minW={320}>
                    {notAuthorized ? (
                        <>Not authorized!</>
                    ) : (
                        <>An unexpected error occurred.</>
                    )}
                </Box>
            </Card>
        );
    }

    if (isFetching && !error) {
        return (
            <Flex direction="column" color="white">
                <Spinner />
            </Flex>
        );
    }

    return <>{children}</>;
};

export { AuthContainer };
