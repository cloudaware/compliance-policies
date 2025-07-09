# Description

Ensure that AWS CloudFront Web Distributions are configured with a Default Root Object.

A Default Root Object (for example `index.html`) is the object that CloudFront returns when a client requests the distribution’s root URL (e.g., `https://example.com/`) rather than specifying a particular object in the distribution (e.g., `https://www.example.com/product-description.html`).

A Default Root Object is most appropriate when your distribution serves a website or static content entry point and you expect clients to access `/` directly. Common scenarios include:

- Static websites or landing pages, ensuring that `GET /` returns an `index.html` or equivalent landing page.
- Documentation hubs or single‑page apps.

Conversely, you typically omit a Default Root Object when:

- Your distribution fronts APIs or microservices and clients always request specific paths.
- Your origin itself (e.g., a dynamic web server behind an ALB) handles root requests.
- You rely on routing logic via Lambda@Edge, CloudFront Functions, or S3 website‑endpoint error‑page configurations.

## Rationale

Specifying a Default Root Object guarantees that requests to the distribution’s root URL return a predictable object, rather than exposing origin contents or triggering errors. Without this setting:

- If your origin is an S3 bucket and its permissions are overly permissive or misconfigured, users may see a directory listing of all bucket objects.

- For private distributions, authenticated users accessing the S3 origin root URL might view the bucket’s private contents if signed URLs or cookies are not correctly enforced.

- CloudFront will return a 403 Forbidden response when it cannot access either the bucket or the requested object due to restrictive IAM or bucket ACL settings.

## Audit

This policy flags an *AWS CloudFront Web Distribution* as `INCOMPLIANT` if the `Default Root Object` field is **empty**.
