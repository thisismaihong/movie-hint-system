"use client";

import { Flex, Switch } from "antd";

export default function LanguageSwitch({ isVietnamese, disabled, onChange, loading }) {
    return (
        <Switch
            checked={isVietnamese}
            disabled={disabled}
            checkedChildren={
                <Flex gap={4} align="center" justify="center">
                    English
                </Flex>
            }
            unCheckedChildren={
                <Flex gap={4} align="center" justify="center">
                    Tiếng Việt
                </Flex>
            }
            onChange={onChange}
            loading={loading}
        />
    );
}