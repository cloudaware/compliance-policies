# Description

Ensure that all applicable AWS DMS endpoints are configured to use Secure Sockets Layer (SSL) to encrypt data in transit. AWS DMS establishes connections to your source and target data stores using these endpoints.

Supported SSL modes:

- `require` – Encrypts the connection using SSL/TLS without certificate authority (CA) verification. Provides baseline encryption with minimal configuration.

- `verify-ca` – Encrypts the connection and verifies the server’s certificate against a trusted CA. Enhances authenticity by validating the certificate chain.

- `verify-full` – Encrypts the connection, validates the server’s certificate, and ensures the certificate’s hostname matches the endpoint’s configured hostname. Offers the highest level of trust and integrity.

Not all SSL modes work with all database endpoints. The following table shows which SSL modes are supported for each database engine.

|DB engine | none | require | verify-ca | verify-full|
|---|---|---|---|---|
|`MySQL/MariaDB/Amazon Aurora MySQL` | Default | Not supported | Supported | Supported|
|`Microsoft SQL Server` | Default |  Supported | Not Supported | Supported|
|`PostgreSQL`| Default | Supported | Supported | Supported|
|`Oracle` | Default | Not supported | Supported | Not Supported|
|`MongoDB` | Default | Supported | Not Supported | Supported|
|`Db2 LUW` | Default | Not Supported | Supported | Not Supported|
|`Db2 for z/OS` | Default | Not Supported | Supported | Not Supported|

## Rationale

Without SSL/TLS enforcement, data exchanged between the DMS replication instance and database endpoints may be transmitted in plaintext, exposing sensitive information to interception, eavesdropping, and man-in-the-middle attacks.

## Impact

Enabling SSL/TLS introduces minimal operational overhead, such as certificate management and endpoint configuration, but substantially strengthens the security posture of data migration activities.

## Audit

This policy marks an *AWS DMS Endpoint* as `INCOMPLIANT` if the `SSL Mode` field is set to **none**.

The Endpoint is marked as `INAPPLICABLE` if the database engine version does not support configurable `SSL Modes`.
