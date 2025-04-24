# Remediation

## From Google Cloud Console

### Leaving Keys in Place

1. Go to `APIs & Services\Credentials` using <https://console.cloud.google.com/apis/credentials>
2. In the section `API Keys`, Click the `API Key Name`. The API Key properties display on a new page.
3. In the `Key restrictions` section, set the application restrictions to any of `HTTP referrers`, `IP addresses`, `Android apps`, `iOS apps`.
4. Click `Save`.
5. Repeat steps 2,3,4 for every unrestricted API key.

    Note: Do not set `HTTP referrers` to wild-cards `(* or *.[TLD] or .[TLD]/)` allowing access to any/wide HTTP referrer(s)
    Do not set `IP addresses` and referrer to `any host (0.0.0.0 or 0.0.0.0/0 or ::0)`

### Removing Keys

Another option is to remove the keys entirely.

1. Go to `APIs & Services\Credentials` using <https://console.cloud.google.com/apis/credentials>
2. In the section `API Keys`, select the checkbox next to each key you wish to remove
3. Select `Delete` and confirm.
