import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface DropboxResetPasswordEmailProps {
  confirmEmailLink?: string;
  name?: string;
}

export const RegistrationEmailTemplate = ({
  confirmEmailLink,
  name,
}: DropboxResetPasswordEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Sharing Tribe confimation email</Preview>
      <Body style={main}>
        <Container style={container}>
          <Container style={imgContainer}>
            <Img
              src={"https://app.sharingtribe.tech/logo.svg"}
              width="170"
              height="70"
              alt="Sharing Tribe Logo"
            />
          </Container>
          <Section>
            <Text style={text}>Hello {name},</Text>
            <Text style={text}>
              Thank you for joining Sharing Tribe! We’re excited to have you as
              part of our community. To get started, please confirm your email
              address by clicking the link below:
            </Text>
            <Button style={button} href={confirmEmailLink}>
              Confirm email
            </Button>
            <Text style={text}>
              If you have any questions, feel free to reach out to our support
              team.
            </Text>
            <Text style={text}>Welcome aboard!</Text>
            <Text style={text}>Best regards,</Text>
            <Text style={text}>The Sharing Tribe Team</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default RegistrationEmailTemplate;

const main = {
  backgroundColor: "#f6f9fc",
  padding: "10px 0",
};

const container = {
  backgroundColor: "#ffffff",
  border: "1px solid #f0f0f0",
  padding: "45px",
};

const imgContainer = {
  display: "flex",
  justifyContent: "center",
};

const text = {
  fontSize: "16px",
  fontFamily:
    "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
  fontWeight: "300",
  color: "#404040",
  lineHeight: "26px",
};

const button = {
  backgroundColor: "#FF931E",
  borderRadius: "4px",
  color: "#000000",
  fontFamily: "'Open Sans', 'Helvetica Neue', Arial",
  fontSize: "15px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "210px",
  padding: "14px 7px",
};
