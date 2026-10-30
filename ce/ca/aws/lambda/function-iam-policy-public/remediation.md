# Remediation

## Remove Public Permissions from the Function

### **From Command Line**

1. Retrieve the resource-based policy and note the statement ID (`Sid`) that grants public access:

    ```sh
    aws lambda get-policy \
        --function-name {{function-name}} \
        --output text
    ```

2. Remove the permission statement that grants access to all principals:

    ```sh
    aws lambda remove-permission \
        --function-name {{function-name}} \
        --statement-id {{sid}}
    ```
