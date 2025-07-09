# Description

This policy checks that all cache behaviors for an AWS CloudFront Web Distribution are configured to enforce encrypted communications by prohibiting the `Viewer Protocol Policy` from being set to **allow-all**, which permits unencrypted HTTP traffic.

You can enforce HTTPS-only communications by configuring the `Viewer Protocol Policy` to one of the following:

- **Redirect HTTP to HTTPS**
    CloudFront listens on both HTTP and HTTPS. Incoming GET and HEAD requests over HTTP receive an `HTTP 301` (Moved Permanently) response code with the corresponding HTTPS URL. The viewer then resubmits the request to CloudFront using the HTTPS URL.
- **HTTPS only**
    CloudFront accepts only HTTPS requests. If a client sends an HTTP request, CloudFront responds with `HTTP 403` (Forbidden) and does not forward the request to the origin.

## Rationale

Enforcing HTTPS for all communication between viewers and CloudFront protects data in transit from eavesdropping and man-in-the‑middle attacks. Allowing unencrypted HTTP traffic exposes sensitive payloads (e.g., authentication tokens, user credentials, and personal information) to interception and replay.

## Impact

### Redirect HTTP to HTTPS

When a viewer sends an HTTP request that is redirected to HTTPS, CloudFront incurs charges for both requests. The HTTP request is billed for the request itself and the response headers returned to the viewer. The HTTPS request is billed separately for the request, response headers, and any content retrieved from the origin.

## Audit

This policy flags an *AWS CloudFront Web Distribution* as `INCOMPLIANT` if any *AWS CloudFront Cache Behaviors* has `Viewer Protocol Policy` set to **allow-all**. This includes the `Default Cache Behavior` and all related *Cache Behaviors*.
