import { Box, Divider, Flex, Text } from "@chakra-ui/layout";
import React, { useState } from "react";
import { Card } from "./Card";
import { WhitelistAddManualForm } from "./WhitelistAddManualForm";
import { WhitelistAddMicrosoftForm } from "./WhitelistAddMicrosoftForm";

export function WhitelistAddCard() {
    return (
        <Card>
            <Box p={4}>
                <WhitelistAddMicrosoftForm />
                <Flex direction="row" align="center" my={4}>
                    <Divider />
                    <Text
                        fontSize="sm"
                        color="gray.600"
                        flexGrow={1}
                        px={2}
                        whiteSpace="nowrap"
                    >
                        or manually
                    </Text>
                    <Divider />
                </Flex>
                <WhitelistAddManualForm />
            </Box>
        </Card>
    );
}
