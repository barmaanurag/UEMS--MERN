import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Box } from '@mui/material';
import styled from 'styled-components';
import Students from "../assests/exammanage.png"; // Ensure this path is correct
import { BlackButton } from '../components/buttonStyles'; // Import BlackButton

const Homepage = () => {
    return (
        <StyledContainer>
            <Grid container spacing={0}>
                {/* Image Section */}
                <Grid item xs={12} md={6}>
                    <img src={Students} alt="students" style={{ width: '100%' }} />
                </Grid>

                {/* Content Section */}
                <Grid item xs={12} md={6}>
                    <StyledPaper>
                        <StyledTitle>
                            Welcome to
                            <br />
                            University Examination Management
                            <br />
                            System
                        </StyledTitle>
                        <StyledText>
                            Enhance examination management by integrating functionalities to add students and faculty. Efficiently monitor attendance, evaluate performance, and deliver feedback. Ensure seamless access to records, comprehensive mark viewing, and streamlined communication.
                        </StyledText>
                        <StyledBox>
                            {/* Login as user */}
                            <StyledLink to="/choose">
                                <BlackButton variant="contained" fullWidth>
                                    Login
                                </BlackButton>
                            </StyledLink>

                            {/* Sign up link */}
                            <StyledText>
                                Don't have an account?{' '}
                                <Link to="/register" style={{ color: "#550080" }}>
                                    Sign up
                                </Link>
                            </StyledText>
                        </StyledBox>
                    </StyledPaper>
                </Grid>
            </Grid>
        </StyledContainer>
    );
};

export default Homepage;

const StyledContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const StyledPaper = styled.div`
  padding: 24px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 24px;
`;

const StyledTitle = styled.h1`
  font-size: 3rem;
  color: #252525;
  font-weight: bold;
  padding-top: 0;
  letter-spacing: normal;
  line-height: normal;

  @media (max-width: 600px) {
    font-size: 2rem;  /* Smaller font size for mobile screens */
  }
`;

const StyledText = styled.p`
  margin-top: 30px;
  margin-bottom: 30px;
  letter-spacing: normal;
  line-height: normal;
  font-size: 1rem;
  color: #333;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;
