# Remediation

Perform the following to establish security contact information:

## From Console

1. Click on your account name at the top right corner of the console.
2. From the drop-down menu Click `My Account`.
3. Scroll down to the `Alternate Contacts` section.
4. Enter contact information in the `Security` section.

## From Command Line

Run the following command with the following input parameters: `--email-address`, `--name`, and `--phone-number`.

```sh
aws account put-alternate-contact --alternate-contact-type SECURITY
```

**Note**: Consider specifying an internal email distribution list to ensure emails are regularly monitored by more than one individual.
