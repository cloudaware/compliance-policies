# Remediation

Add a line to the app.yaml file controlling the application that enforces secure connections. For example:

```txt
handlers: 
- url: /.* 
**secure: always** 
redirect_http_response_code: 301 
script: auto
```

<https://cloud.google.com/appengine/docs/standard/python3/config/appref>
