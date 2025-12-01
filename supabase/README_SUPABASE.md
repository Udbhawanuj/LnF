# Supabase Edge Function: notify-claim

Create an Edge Function named `notify-claim` in your Supabase project.

The function should:

- Accept JSON body with `claimCode`, `name`, `email`, `details`
- Look up the corresponding item by `claim_code`
- Send an email to the reporter / admin with the claim details

In the React app, we call:

```js
await supabase.functions.invoke('notify-claim', {
  body: { claimCode, name, email, details },
})
```

You can implement email sending using Resend, Mailgun, or any provider supported in your Edge Function.
