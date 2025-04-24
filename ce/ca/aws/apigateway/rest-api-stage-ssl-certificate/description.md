# Description

API Gateway REST API stages should be configured with SSL certificates to ensure secure communication between API Gateway and backend systems. This configuration guarantees that requests originating from API Gateway are authenticated, allowing the backend systems to trust that the requests come from the API Gateway and not from unauthorized sources. SSL certificates are used to encrypt the communication between these components, adding a layer of security and ensuring integrity.

## Rationale

Configuring SSL certificates for API Gateway REST API stages addresses several important security concerns. It allows backend systems to authenticate the source of incoming requests, ensuring that only trusted entities are interacting with the system. This prevents potential man-in-the-middle attacks and unauthorized access, which could otherwise compromise the confidentiality and integrity of the data being transmitted.

## Audit

This policy marks an *API Gateway Stage* as `INCOMPLIANT` if an SSL Certificate is not configured. This is identified when the `Client Certificate` field is **empty** or the associated certificate has been **deleted** from the CMDB.

A Stage is marked as `INAPPLICABLE` in the following cases:

1. The Stage's API `Endpoint Type` is set to **PRIVATE**.
2. The `Integration Type` of the related *API Gateway Methods* is neither **HTTP** nor **HTTP_PROXY**.
