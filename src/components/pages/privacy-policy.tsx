'use client'

import React from 'react';
import { Anchor, Box, Container, List, Space, Text, Title } from '@mantine/core';

export const PrivacyPolicy = () => {
    return (
        <Container size='md' py='xl'>
            <Title c='puceRed' order={ 2 } mb='md'>University of Batangas Privacy Policy and Terms of
                Agreement</Title>

            <Box mb='lg'>
                <Title c='puceRed' order={ 3 } mb='xs'>Introduction</Title>
                <Text>
                    Welcome to University of Batangas. This Privacy Notice informs you about our policy regarding the
                    data that we
                    collect, store, process, and share including your personal data. If you are the parent or legal
                    guardian of an
                    applicant, a student who is minor (below 18 years old), understand that this Policy refers to the
                    personal data
                    of your child/ward.
                </Text>
                <Space h='md' />
                <Text>
                    It is our policy to respect and uphold data privacy rights and to ensure that all personal data
                    collected from
                    students, their parents or guardians are processed pursuant to the general principles of
                    transparency,
                    legitimate purpose, and proportionality as stated in the Data Privacy Act of 2012 (DPA).
                </Text>
            </Box>

            <Box mb='lg'>
                <Title c='puceRed' order={ 3 } mb='xs'>How Does the School Collect or Acquire Personal
                    Information?</Title>
                <Text>University of Batangas collects or acquires personal information through various means. The
                    collected information may require the following:</Text>
                <List withPadding listStyleType='disc' mt='sm'>
                    <List.Item>Written records</List.Item>
                    <List.Item>Photographic</List.Item>
                    <List.Item>Video image, and/or</List.Item>
                    <List.Item>Digital material</List.Item>
                </List>
            </Box>

            <Box mb='lg'>
                <Title c='puceRed' order={ 3 } mb='xs'>What Kind of Personal Information Does the School
                    Collect?</Title>
                <List withPadding listStyleType='disc'>
                    <List.Item>Personal information, such as name, addresses, telephone numbers, email addresses, date
                        and place of birth, nationality, immigration status, religion, civil status, student ID,
                        government-issued IDs, etc.</List.Item>
                    <List.Item>Family background, including information on parents, guardian, siblings, estimated family
                        income (for scholarship applicants), etc.</List.Item>
                    <List.Item>Photographic data such as photo, handwriting, signature specimens and video
                        clips.</List.Item>
                    <List.Item>Student’s school works, including data gathered using third party online learning tools,
                        such as Google Classroom and other Learning Management Software.</List.Item>
                    <List.Item>Health records, psychological evaluation results and disciplinary records.</List.Item>
                    <List.Item>Student Cumulative Guidance Folder, which includes interviews, entrance exam results, and
                        guidance assessments, special needs, or behavior information, etc.</List.Item>
                    <List.Item>Permanent Student’s Academic Records and Transcript.</List.Item>
                    <List.Item>Student curricular and extra-curricular activities.</List.Item>
                    <List.Item>Financial and billing information.</List.Item>
                </List>
            </Box>

            <Box mb='lg'>
                <Title c='puceRed' order={ 3 } mb='xs'>How We Use Your Personal Information</Title>
                <Text>Data collected are used solely for the following purposes:</Text>
                <List withPadding listStyleType='disc'>
                    <List.Item>Processing admission application</List.Item>
                    <List.Item>Verifying authenticity of student records and documents</List.Item>
                    <List.Item>Processing of scholarship applications</List.Item>
                    <List.Item>Processing of enrollment and registration</List.Item>
                    <List.Item>Supporting student’s learning, and validating students’ program of study based on
                        curriculum requirements, and other activities and experiences forming part of the student’s
                        information and education.</List.Item>
                    <List.Item>Supporting the student’s well-being and providing medical services and guidance
                        counseling</List.Item>
                    <List.Item>Monitoring and reporting on student progress; processing of evaluations, exam results,
                        and grades</List.Item>
                    <List.Item>Monitoring and ensuring the safety of all students when inside the school premises and
                        off-campus activities</List.Item>
                    <List.Item>Processing and generating statements of accounts</List.Item>
                    <List.Item>Processing of application for recognition and graduation</List.Item>
                    <List.Item>Evaluation and verification for board/bar examination</List.Item>
                    <List.Item>For accreditation, professional development of teachers and staff, and
                        research.</List.Item>
                    <List.Item>Posting and displaying of academic and non-academic achievements within the University
                        premises, website and social media.</List.Item>
                    <List.Item>Marketing and promoting University of Batangas.</List.Item>
                    <List.Item>Monitoring student’s attendance.</List.Item>
                    <List.Item>Academic background verification of students.</List.Item>
                    <List.Item>Yearbook production.</List.Item>
                </List>
            </Box>

            <Box mb='lg'>
                <Title c='puceRed' order={ 3 } mb='xs'>How We Share and Transfer Your Information</Title>
                <Text>University of Batangas discloses data only to authorized recipients. Otherwise, data is shared
                    with third parties only with consent or as required by law:</Text>
                <List withPadding listStyleType='disc' mt='sm'>
                    <List.Item>Regulatory authorities, courts, and government agencies</List.Item>
                    <List.Item>Accreditation bodies (e.g., PACUCOA, PAASCU, PTC/ACBET)</List.Item>
                    <List.Item>Service Providers supporting operations and learning tools</List.Item>
                    <List.Item>Business partners for internships and job opportunities</List.Item>
                </List>
                <Space h='md' />
                <Text>We may transfer your data within or outside the Philippines under conditions of confidentiality
                    and security safeguards.</Text>
            </Box>

            <Box mb='lg'>
                <Title c='puceRed' order={ 3 } mb='xs'>How We Store and Retain Your Information</Title>
                <Text>We implement organizational, administrative, technical, and physical security measures to
                    safeguard data. Paper and digital files are stored securely and retained only as long as necessary.
                    CCTV recordings are stored on a rolling basis and overwritten weekly.</Text>
            </Box>

            <Box mb='lg'>
                <Title c='puceRed' order={ 3 } mb='xs'>Your Rights</Title>
                <Text>You have the right to be informed, access, rectify, suspend or withdraw your personal data. To
                    exercise your rights, contact our Data Protection Officer:</Text>
                <List withPadding listStyleType='disc' mt='sm'>
                    <List.Item>Email: <Anchor href='mailto:dpo@ub.edu.ph'>dpo@ub.edu.ph</Anchor></List.Item>
                    <List.Item>Tel No.: 723-1446 local 101</List.Item>
                    <List.Item>Write to: Ms. Sharlene A. Perico, Data Protection Officer, University of
                        Batangas</List.Item>
                </List>
            </Box>

            <Box>
                <Text size='sm' c='dimmed'>
                    If you are not satisfied with how your data is handled, you may lodge a complaint at <Anchor
                    href='mailto:dpo@ub.edu.ph'>dpo@ub.edu.ph</Anchor>.
                </Text>
            </Box>
        </Container>
    );
}
