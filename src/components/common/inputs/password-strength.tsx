import {
    Box,
    Center,
    Group,
    PasswordInput as Input,
    PasswordInputProps,
    Progress,
    Text
} from '@mantine/core';
import { IconCheck, IconX } from '@tabler/icons-react';
import { getStrength, requirements } from '@utils/password';

const PasswordRequirement = ({ meets, label }: { meets: boolean; label: string }) => {
    return (
        <Text component='div' c={ meets ? 'teal' : 'red' } mt={ 5 } size='sm'>
            <Center inline>
                { meets ? <IconCheck size='0.9rem' stroke={ 1.5 } /> : <IconX size='0.9rem' stroke={ 1.5 } /> }
                <Box ml={ 7 }>{ label }</Box>
            </Center>
        </Text>
    );
}

export const PasswordStrength = (props: PasswordInputProps) => {
    const value = props.value as string || '';
    const strength = getStrength(value);
    const checks = requirements.map((requirement, index) => (
        <PasswordRequirement
            key={ index }
            label={ requirement.label }
            meets={ requirement.re.test(value) }
        />
    ));
    const bars = Array(4)
        .fill(0)
        .map((_, index) => (
            <Progress
                styles={ { section: { transitionDuration: '0ms' } } }
                value={
                    value.length > 0 && index === 0 ? 100 : strength >= ((index + 1) / 4) * 100 ? 100 : 0
                }
                color={ strength > 80 ? 'teal' : strength > 50 ? 'yellow' : 'red' }
                key={ index }
                size={ 4 }
            />
        ));

    const { placeholder, label, onChange, ...rest } = props;

    return (
        <Box { ...rest }>
            <Input
                label={ label }
                placeholder={ placeholder }
                onChange={ onChange }
            />

            <Group gap={ 5 } grow mt='xs' mb='md'>
                { bars }
            </Group>

            <PasswordRequirement label='Has at least 6 characters' meets={ (value as string).length > 5 } />
            { checks }
        </Box>
    );
}
