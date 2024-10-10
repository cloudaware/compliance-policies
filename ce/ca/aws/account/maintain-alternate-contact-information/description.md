# Description

AWS provides customers with the option of specifying the contact information for
account's security team. It is recommended that this information be provided.

## Rationale

Specifying security-specific contact information will help ensure that security advisories
sent by AWS reach the team in your organization that is best equipped to respond to
them.

## Audit

Perform the following to determine if security contact information is present:

### From Console

1. Click on your account name at the top right corner of the console.
2. From the drop-down menu Click `My Account`.
3. Scroll down to the `Alternate Contacts` section.
4. Ensure contact information is specified in the `Security` section.

### From Command Line

1. Run the following command:

```sh
aws account get-alternate-contact --alternate-contact-type SECURITY
```

2. Ensure proper contact information is specified for the `Security` contact.

## References

1. CCE-79200-2
