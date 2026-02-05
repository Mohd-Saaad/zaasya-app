# Token Policy – SmartIDH

## Access Token
- Purpose: Authorize API requests
- Type: JWT
- Expiry: 48 hours
- Stored on client side
- Sent via Authorization: Bearer <token>

## Refresh Token
- Purpose: Generate new access tokens
- Type: JWT (type=refresh)
- Expiry: 7 days
- Stored in database (refresh_tokens collection)
- Can be revoked at any time

## Refresh Flow
1. Client sends refresh token to /auth/refresh-token
2. Server validates token & DB record
3. New access token is issued
4. Refresh token remains valid until expiry or revocation

## Security Considerations
- Refresh tokens are checked against DB
- Access tokens are short-lived
- Signed S3 URLs have strict expiry
- Unauthorized access is blocked at middleware level
