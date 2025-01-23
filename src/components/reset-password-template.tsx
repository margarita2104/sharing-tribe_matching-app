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

export const ResetPasswordTemplate = ({
  confirmEmailLink,
  name,
}: DropboxResetPasswordEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Sharing Tribe confimation email</Preview>
      <Body style={main}>
        <Container style={container}>
          <Container style={{ display: "flex", justifyContent: "center" }}>
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
              We received a request to reset your Sharing Tribe password. If
              this was you, simply click the link below to set a new password:
            </Text>
            <Button style={button} href={confirmEmailLink}>
              Reset Password
            </Button>
            <Text style={text}>
              If you did not request a password reset or believe this message
              was sent in error, please ignore it or contact our support team
              for assistance.
            </Text>
            <Text style={text}>Thank you, and stay safe!</Text>
            <Text style={text}>Best regards,</Text>
            <Text style={text}>The Sharing Tribe Team</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default ResetPasswordTemplate;

const main = {
  backgroundColor: "#f6f9fc",
  padding: "10px 0",
};

const container = {
  backgroundColor: "#ffffff",
  border: "1px solid #f0f0f0",
  padding: "45px",
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
