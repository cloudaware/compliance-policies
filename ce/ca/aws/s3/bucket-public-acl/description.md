# Description

This policy identifies AWS S3 Buckets that do not have Block Public ACLs enabled and whose Access Control List (ACLs) grants such public permissions as `READ`, `WRITE`, `READ_ACP`, `WRITE_ACP`, or `FULL_CONTROL`.
Access is considered public if any of these permissions are granted to either the **AllUsers** group (anyone on the Internet) or the **AuthenticatedUsers** group (any AWS account holder).

## Rationale

Granting public access through ACLs poses a serious security risk. Public read access can lead to unintentional exposure of sensitive data, while public write access may allow unauthorized users to modify, delete, or upload objects. Such exposure can result in data breaches, service disruptions, or unexpected costs due to malicious uploads or misuse.

## Audit

This policy flags an *AWS S3 Bucket* as `INCOMPLIANT` if:

* `Block Public ACLs` is not set to **Yes**, and
* The `Access Control Policy` grants any of the following permissions: **READ**, **WRITE**, **READ_ACP**, **WRITE_ACP**, or **FULL_CONTROL** to either grantee:

  * **<http://acs.amazonaws.com/groups/global/AllUsers>**, or
  * **<http://acs.amazonaws.com/groups/global/AuthenticatedUsers>**.
