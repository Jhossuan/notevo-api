# 💥Notevo - Domain Description💥

## Actors
- **Tenant** - is the company or developer that integrates Notevo into their product to send notifications.
- **Subscriber** - the end user that belongs to a Tenant and receives the notifications.
- **Provider** - external services responsible for the delivery of notifications, those providers could be (Resend, SendGrid, Mailgun).

## Core Concepts
- **Template** - the reusable structure of a notification defined once by a Tenant, containing the subject, body, channel, and variable placeholders like `{{firstName}}`
- **Notification** - a record created when a Tenant triggers a message to Subscriber using a Template. It tracks the entire lifecycle of that send - status, channel, attempts, timestamps.
- **DeliveryAttempt** - a record of a single try at delivering a Notification through a Provider. One Notification can have multiple DeliveryAttempts if retries occur. Each attempt records the status, provider used, error message, and timestamp.
- **Webhook** - a URL registered by a Tenant that Notevo calls automatically via HTTP POST when a Notification is delivered, failed, or any other subscribed event occurs. This allows Tenants to react to delivery in their own systems.


## Main Flow
1. Tenant calls API &rarr; validate if Template exists
2. Notification record created with status: PENDING
3. Producer puts message in queue &rarr; status changes to QUEUED
4. Consumer picks it up and tries to deliver it through a Provider
5. Consumer records each attempt as a DeliveryAttempt
6. If success &rarr; status changes to DELIVERED
7. If failure &rarr; status changes to FAILED
8. In both cases &rarr; call the webhook.