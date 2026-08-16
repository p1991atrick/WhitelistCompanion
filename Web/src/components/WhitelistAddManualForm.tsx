import { Spinner } from "@chakra-ui/spinner";
import React, { useEffect, useRef, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { getQueryParam, postWhitelist, removeQueryParam } from "../api";
import { Input, Button, Flex, useToast } from "@chakra-ui/react";

export function WhitelistAddManualForm() {
    const queryClient = useQueryClient();
    const mutation = useMutation(postWhitelist);
    const [user, setUser] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const toast = useToast();

    async function addToWhitelist(user: string) {
        try {
            await mutation.mutateAsync(user);
            queryClient.invalidateQueries();
            setUser("");
            toast({
                description: "Successfully added.",
                status: "success",
                duration: 5000,
                position: "top",
                isClosable: true,
            });

            inputRef?.current?.focus();
        } catch {
            toast({
                description:
                    "Invalid nickname or already on the whitelist.",
                status: "error",
                duration: 5000,
                position: "top",
                isClosable: true,
            });
        }
    }

    useEffect(() => {
        inputRef?.current?.focus();
    });

    const userToAdd = getQueryParam("addUser");
    if (userToAdd) {
        removeQueryParam("addUser");
        addToWhitelist(userToAdd);
    }

    return (
        <>
            <Flex direction="column" gridGap={4}>
                <Input
                    value={user}
                    onChange={(e) =>
                        setUser((e.target as HTMLInputElement).value)
                    }
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            addToWhitelist(user);
                        }
                    }}
                    type="text"
                    placeholder="Nickname"
                    ref={inputRef}
                    size="lg"
                    disabled={mutation.isLoading}
                />
                <Button
                    leftIcon={mutation.isLoading ? <Spinner /> : undefined}
                    onClick={() => addToWhitelist(user)}
                    disabled={mutation.isLoading || user === ""}
                    w="full"
                    size="lg"
                    background="blue.600"
                    colorScheme="blue"
                >
                    {mutation.isLoading
                        ? "Processing..."
                        : "Add to whitelist"}
                </Button>
            </Flex>
        </>
    );
}
