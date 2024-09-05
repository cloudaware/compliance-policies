# Notes

There are different implementations of this policy by different vendors.

The differences:

- Some only checks if MFA Delete has status enabled and doesn't acknowledge the lifecycle configuration.
- Others checks if MFA Delete is enabled and lifecycle configuration has status enabled but doesn't take into consideration that if the status is disabled then you still can't enable MFA. You need to remove the lifecycle rules completely in order to be able to activate MFA delete.

Concerns that competitors do not advise:

- Amazon specifies that versioning is the [security best practice](https://aws.amazon.com/blogs/security/top-10-security-best-practices-for-securing-data-in-amazon-s3/) but MFA Delete is just another optional layer of security.
- How do we determine which objects should have MFA delete enabled? It doesn't make sense to activate MFA delete for every object
- What's a good practice to enable MFA Delete and what's not.
- This should be a best practice that you can implement for some objects and not a policy which violations you need to resolve

Addressed this in the [description.md](description.md)
