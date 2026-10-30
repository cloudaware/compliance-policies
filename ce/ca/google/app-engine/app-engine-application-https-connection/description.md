# Description

To maintain the highest level of security, all connections to an application should be secure by default.

## Rationale

Insecure HTTP connections may be subject to eavesdropping, which can expose sensitive data.

## Impact

All connections to App Engine will automatically be redirected to the HTTPS endpoint, ensuring that all connections are secured by TLS.

## Audit

Verify that the app.yaml file controlling the application contains a line that enforces secure connections. For example:

```txt
handlers: 
- url: /.* 
secure: always 
redirect_http_response_code: 301 
script: auto
```

<https://cloud.google.com/appengine/docs/standard/python3/config/appref>

## Default Value

By default, both HTTP and HTTPS are supported.

## References

1. <https://cloud.google.com/appengine/docs/standard/python3/config/appref>
2. <https://cloud.google.com/appengine/docs/flexible/nodejs/configuring-your-app-with-app-yaml>
