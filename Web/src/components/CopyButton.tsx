import { useClipboard } from "@chakra-ui/hooks";
import { CheckIcon, CopyIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
import * as React from "react";

export function CopyButton({ value }: { value: string }) {
    const { hasCopied, onCopy } = useClipboard(value);

    return (
        <IconButton
            aria-label="Copy address"
            icon={hasCopied ? <CheckIcon /> : <CopyIcon />}
            onClick={onCopy}
            variant="unstyled"
            cursor="pointer"
        />
    );
}
