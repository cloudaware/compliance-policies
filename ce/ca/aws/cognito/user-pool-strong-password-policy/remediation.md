# Remediation

## Strengthen the User Pool Password Policy

Update the Cognito user pool password policy to require a minimum length of at least 8 characters, uppercase and lowercase letters, numbers, symbols, and a temporary password validity period of 7 days or fewer.

### **From Command Line**

```sh
aws cognito-idp update-user-pool \
    --region {{region}} \
    --user-pool-id {{user-pool-id}} \
    --policies '{
      "PasswordPolicy": {
        "MinimumLength": 8,
        "RequireUppercase": true,
        "RequireLowercase": true,
        "RequireNumbers": true,
        "RequireSymbols": true,
        "TemporaryPasswordValidityDays": 7
      }
    }'
```

If you intentionally rely on alternative authentication patterns, verify that the user pool configuration and application design are formally approved before accepting weaker password settings.
