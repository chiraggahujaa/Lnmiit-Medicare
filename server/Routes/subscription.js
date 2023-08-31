const express = require("express");
const router = express.Router();
const Email = require("../Models/EmailSubscription");
const sgMail = require("@sendgrid/mail");
const cron = require("node-cron");

// Set up SendGrid API key and email template
sgMail.setApiKey(
  "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"
);

const emailTemplate = {
  from: "20ucs057@lnmiit.ac.in",
  subject: "Monthly Body Vitals Checkup",
  html: `<p>Dear {{name}},</p>
  <p>We are glad to inform you that your registration for the monthly body vitals checkup at our LNMIIT Medical Unit has been successfully completed. We would like to thank you for taking the initiative to maintain your health and well-being.</p>
  <p>The body vitals checkup includes monitoring your Sp02, blood glucose level, systolic blood pressure, diastolic blood pressure, height, and weight. Our medical unit will enter your body vitals in our website, and you can check your reports there.</p>
  <p>Regular checkups can help in detecting and preventing potential health issues, so we encourage you to participate in this monthly body vitals checkup.</p>
  <p>Thank you for your cooperation in this matter.</p>
  <p>Best regards,</p>
  <p>Chirag Ahuja</p>
  <p>20ucs057</p>`,
};

// Check if email is already subscribed
router.post("/check-subscription", async (req, res) => {
  const { email } = req.body;
  try {
    const existingEmail = await Email.findOne({ email });
    if (existingEmail) {
      res.status(200).send("Email address is already subscribed.");
    } else {
      res.status(404).send("Email address is not subscribed.");
    }
  } catch (error) {
    console.error("Error checking subscription:", error);
    res.status(500).send("Internal server error.");
  }
});


// Fetch new emails from database and send emails
async function sendMonthlyEmails(email) {
  try {
    const currentMonth = new Date().getMonth();
    const emails = await Email.find({
      email: email,
      subscribedAt: {
        $gte: new Date(new Date().getFullYear(), currentMonth, 1),
      },
    });
    console.log(emails);
    for (const email of emails) {
      const msg = {
        to: email.email,
        ...emailTemplate,
        html: emailTemplate.html.replace(
          "{{name}}",
          email.name || "Faculty member"
        ),
      };
      try {
        await sgMail.send(msg);
      } catch (error) {
        console.error("Error sending email:", error);
        // Delete the email from the database if sending fails
        await Email.findOneAndDelete({ email: email.email });
      }
    }
    console.log("Monthly emails sent successfully.");
  } catch (error) {
    console.error("Error sending monthly emails:", error);
  }
}

// Handle email subscriptions
router.post("/subscribe", async (req, res) => {
  const { email } = req.body;
  console.log(email);
  try {
    const existingEmail = await Email.findOne({ email });
    if (existingEmail) {
      res.status(409).send("Email address is already subscribed.");
      return;
    }
    const newEmail = new Email({ email, subscribedAt: new Date() });
    await newEmail.save();
    // Call the function to send the first batch of emails
    sendMonthlyEmails(email);

    // Schedule the function to run once a month for the new email address only
    cron.schedule("0 0 1 * *", () => {
      sendMonthlyEmails(email);
    });
    res.status(201).send("Email address has been subscribed.");
  } catch (error) {
    console.error("Error subscribing email:", error);
    res.status(500).send("Internal server error.");
  }
});

module.exports = router;
