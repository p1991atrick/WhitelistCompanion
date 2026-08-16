import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
    Box,
    Flex,
    Link,
    LinkBox,
    LinkOverlay,
    Spacer,
    Text,
} from "@chakra-ui/layout";
import { IconButton, Spinner, Tooltip, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { useQuery } from "react-query";
import { fetchUiConfig } from "../api";
import { Card } from "./Card";

export function MapCard() {
    const { data, isFetching } = useQuery("uiConfig", fetchUiConfig, {
        retry: 1,
        refetchOnWindowFocus: false,
        refetchInterval: false,
    });

    const openMapInNewTabTooltip = "Open map in new tab";

    return (
        <Card>
            <Flex p={4}>
                <Text fontSize="xl">Map</Text>
                <Spacer />
                {data?.data && (
                    <Tooltip label={openMapInNewTabTooltip} fontSize="md">
                        <Link href={data?.data?.mapUri} isExternal>
                            <IconButton
                                aria-label="Open map in new tab"
                                size="sm"
                                icon={<ExternalLinkIcon />}
                            />
                        </Link>
                    </Tooltip>
                )}
            </Flex>
            {isFetching ? (
                <Flex
                    w="100%"
                    h="265px"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Spinner size="xl" />
                </Flex>
            ) : (
                data && (
                    <Tooltip label={openMapInNewTabTooltip} fontSize="md">
                        <LinkBox>
                            <Box
                                as="iframe"
                                src={data.data.mapPreviewUri}
                                w="100%"
                                h="265px"
                            />
                            <LinkOverlay href={data?.data?.mapUri} isExternal />
                        </LinkBox>
                    </Tooltip>
                )
            )}
        </Card>
    );
}
