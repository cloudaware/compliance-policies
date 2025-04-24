# Remediation

Add a line to the app.yaml file controlling the application which enforces secure connections. For example

            handlers: 
            - url: /.* 
            **secure: always** 
            redirect_http_response_code: 301 
            script: auto

<https://cloud.google.com/appengine/docs/standard/python3/config/appref>
