import { Box, Container, Flex } from "@chakra-ui/layout";
import { Button, Spinner, Text } from "@chakra-ui/react";
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
        enabled: !!hasSecret,
    });

    if (!hasSecret) {
        return (
            <Card>
                <Flex
                    direction="column"
                    align="center"
                    p={8}
                    minW={320}
                    gridGap={4}
                >
                    <Text fontSize="lg" textAlign="center">
                        Click below to enter.
                    </Text>
                    <Button
                        onClick={() => (window.location.href = "/join")}
                        colorScheme="blue"
                        size="lg"
                    >
                        Enter
                    </Button>
                </Flex>
            </Card>
        );
    }

    const httpError = error as HttpError;
    const notAuthorized = httpError && httpError.statusCode === 401;

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
