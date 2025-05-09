'use client';

import React from 'react';
import { Box, Container, List, Text, Title } from '@mantine/core';

export const TermsOfService = () => {
    return (
        <Container size='md' py='xl'>
            <Title c='puceRed'
                order={ 2 }
                mb='md'
            >
                University of Batangas Terms of Service
            </Title>

            <Box mb='lg'>
                <Title c='puceRed' order={ 3 } mb='xs'>1. Introduction</Title>
                <Text>
                    These Terms of Service govern your use of University of Batangas’s website and services. By
                    accessing or using our services, you agree to be bound by these Terms.
                </Text>
            </Box>

            <Box mb='lg'>
                <Title c='puceRed' order={ 3 } mb='xs'>2. Use of Service</Title>
                <Text>
                    You agree to use the service only for lawful purposes and in accordance with these Terms.
                </Text>
            </Box>

            <Box mb='lg'>
                <Title c='puceRed' order={ 3 } mb='xs'>3. User Obligations</Title>
                <List withPadding listStyleType='disc'>
                    <List.Item>Provide accurate and up-to-date information.</List.Item>
                    <List.Item>Maintain the security of your account.</List.Item>
                    <List.Item>Comply with all applicable laws and regulations.</List.Item>
                </List>
            </Box>

            <Box mb='lg'>
                <Title c='puceRed' order={ 3 } mb='xs'>4. Intellectual Property</Title>
                <Text>
                    All content, trademarks, and data on this site are the property of University of Batangas or its
                    licensors.
                </Text>
            </Box>

            <Box mb='lg'>
                <Title c='puceRed' order={ 3 } mb='xs'>5. Limitation of Liability</Title>
                <Text>
                    University of Batangas is not liable for any indirect or consequential damages arising from the use
                    of our services.
                </Text>
            </Box>

            <Box mb='lg'>
                <Title c='puceRed' order={ 3 } mb='xs'>6. Governing Law</Title>
                <Text>
                    These Terms are governed by the laws of the Republic of the Philippines.
                </Text>
            </Box>

            <Box mb='lg'>
                <Title c='puceRed' order={ 3 } mb='xs'>7. Changes to Terms</Title>
                <Text>
                    We may update these Terms periodically. Continued use of the service constitutes acceptance of the
                    changes.
                </Text>
            </Box>

            <Box mb='lg'>
                <Title c='puceRed' order={ 3 } mb='xs'>8. Contact Information</Title>
                <Text>
                    If you have any questions about these Terms, please contact us at dpo@ub.edu.ph.
                </Text>
            </Box>
        </Container>
    );
}