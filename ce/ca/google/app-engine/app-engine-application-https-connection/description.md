# Description

In order to maintain the highest level of security all connections to an application should be secure by default.

## Rationale

Insecure HTTP connections maybe subject to eavesdropping which can expose sensitive data.

## Impact

All connections to appengine will automatically be redirected to the HTTPS endpoint ensuring that all connections are secured by TLS.

## Audit

Verify that the app.yaml file controlling the application contains a line which enforces secure connections. For example

            handlers: 
            - url: /.* 
            secure: always 
            redirect_http_response_code: 301 
            script: auto

<https://cloud.google.com/appengine/docs/standard/python3/config/appref>

## Default Value

By default both HTTP and HTTP are supported

## References

1. <https://cloud.google.com/appengine/docs/standard/python3/config/appref>
2. <https://cloud.google.com/appengine/docs/flexible/nodejs/configuring-your-app-with-app-yaml>
