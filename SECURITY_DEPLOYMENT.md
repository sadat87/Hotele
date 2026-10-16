# 🔒 Security & Deployment Guide

## Table of Contents
1. [Security Best Practices](#security-best-practices)
2. [Environment Configuration](#environment-configuration)
3. [Backend Deployment](#backend-deployment)
4. [Frontend Deployment](#frontend-deployment)
5. [Database Security](#database-security)
6. [API Security](#api-security)
7. [Monitoring & Logging](#monitoring--logging)

---

## Security Best Practices

### 1. Authentication & Authorization
✅ **Implemented:**
- JWT tokens with short expiry (15 minutes)
- Refresh token rotation strategy
- Secure password hashing with bcrypt
- HTTP-only cookies for sensitive tokens
- Role-based access control (RBAC)

⚠️ **Additional Measures:**
```bash
# In .env (PRODUCTION)
JWT_ACCESS_SECRET=<generate with: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")>
JWT_REFRESH_SECRET=<generate with: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")>
```

### 2. Data Validation
✅ **Implemented:**
- Zod schemas for request validation
- Mongoose schema validation
- Type checking on both client and server

### 3. Input Sanitization
✅ **Implemented:**
- Helmet.js for HTTP headers
- CORS configuration
- Request size limits
- Rate limiting

### 4. Password Security
✅ **Implemented:**
- Bcrypt hashing with 10 rounds
- Minimum 6 characters required
- Can be enhanced: require uppercase, numbers, special chars

**Enhance password requirements:**
```javascript
// backend/src/validators/auth.validator.js
password: z.string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Must contain uppercase letter")
  .regex(/[0-9]/, "Must contain number")
  .regex(/[!@#$%^&*]/, "Must contain special character")
```

### 5. SQL/NoSQL Injection Prevention
✅ **Implemented:**
- Mongoose parameterized queries prevent injection
- No string concatenation in queries

### 6. HTTPS/SSL
⚠️ **ACTION REQUIRED:**
```bash
# Use Let's Encrypt (free)
# For Node.js/Express
sudo certbot certonly --standalone -d yourdomain.com

# Add to server.js
import fs from 'fs';
import https from 'https';

const httpsOptions = {
  key: fs.readFileSync('/path/to/private-key.pem'),
  cert: fs.readFileSync('/path/to/certificate.pem'),
};

https.createServer(httpsOptions, app).listen(443);
```

### 7. Secure Headers
✅ **Implemented via Helmet.js:**
- Content Security Policy
- X-Frame-Options
- X-Content-Type-Options
- Strict-Transport-Security

### 8. Database Security
✅ **Implemented:**
- Mongoose schema validation
- No sensitive data in queries

⚠️ **ACTION REQUIRED:**
- Use MongoDB Atlas with IP whitelist
- Enable authentication
- Use strong database password
- Enable encryption at rest

---

## Environment Configuration

### Development (.env)
```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/hotel_management_system

JWT_ACCESS_SECRET=dev_secret_access_token_min_32_chars_long
JWT_REFRESH_SECRET=dev_secret_refresh_token_min_32_chars_long
JWT_ACCESS_EXPIRY=15m
JWT_REFRESH_EXPIRY=7d

CORS_ORIGIN=http://localhost:3000

BCRYPT_ROUNDS=10
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

LOG_LEVEL=debug
```

### Production (.env)
```env
NODE_ENV=production
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/hotel_management_system?retryWrites=true&w=majority

# Generate with: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
JWT_ACCESS_SECRET=<generate_strong_secret_32_chars>
JWT_REFRESH_SECRET=<generate_strong_secret_32_chars>
JWT_ACCESS_EXPIRY=15m
JWT_REFRESH_EXPIRY=7d

CORS_ORIGIN=https://yourdomain.com

BCRYPT_ROUNDS=12
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=50

LOG_LEVEL=warn

# Optional: Payment Gateway
STRIPE_SECRET_KEY=your_stripe_secret_key
```

⚠️ **CRITICAL:** Never commit .env files to git!

```bash
# Add to .gitignore
echo ".env" >> backend/.gitignore
echo ".env.local" >> frontend/.gitignore
```

---

## Backend Deployment

### Option 1: Heroku (Easiest)

1. **Install Heroku CLI:**
   ```bash
   npm install -g heroku
   ```

2. **Create Heroku App:**
   ```bash
   heroku create your-hotel-app-name
   ```

3. **Set Environment Variables:**
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set MONGO_URI=<your_mongodb_atlas_uri>
   heroku config:set JWT_ACCESS_SECRET=<strong_secret>
   heroku config:set JWT_REFRESH_SECRET=<strong_secret>
   heroku config:set CORS_ORIGIN=https://your-frontend-domain.com
   ```

4. **Ensure Procfile Exists:**
   ```
   # backend/Procfile
   web: node server.js
   ```

5. **Deploy:**
   ```bash
   git push heroku main
   heroku logs --tail
   ```

### Option 2: Railway.app

1. **Connect Repository:**
   - Go to railway.app
   - Create new project
   - Connect GitHub repository

2. **Configure Services:**
   - Add MongoDB service
   - Set environment variables

3. **Deploy:**
   - Automatic on git push

### Option 3: AWS/DigitalOcean VPS

1. **SSH into Server:**
   ```bash
   ssh root@your_server_ip
   ```

2. **Install Dependencies:**
   ```bash
   sudo apt update
   sudo apt install nodejs npm mongodb
   ```

3. **Clone Repository:**
   ```bash
   git clone <your-repo>
   cd hotele/backend
   npm install
   ```

4. **Create .env:**
   ```bash
   nano .env
   # Add production environment variables
   ```

5. **Use PM2 for Process Management:**
   ```bash
   npm install -g pm2
   pm2 start server.js --name "hotel-api"
   pm2 startup
   pm2 save
   ```

6. **Setup Reverse Proxy (Nginx):**
   ```bash
   sudo apt install nginx
   ```

   ```nginx
   # /etc/nginx/sites-available/default
   server {
     listen 80;
     server_name your-domain.com;

     location / {
       proxy_pass http://localhost:5000;
       proxy_http_version 1.1;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection 'upgrade';
       proxy_set_header Host $host;
       proxy_cache_bypass $http_upgrade;
     }
   }
   ```

   ```bash
   sudo systemctl restart nginx
   ```

7. **Enable SSL with Certbot:**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com
   ```

---

## Frontend Deployment

### Option 1: Vercel (Recommended)

1. **Connect to Vercel:**
   - Go to vercel.com
   - Import GitHub repository
   - Select frontend folder

2. **Set Environment Variables:**
   ```
   NEXT_PUBLIC_API_URL=https://your-api-domain.com/api
   ```

3. **Deploy:**
   - Automatic on git push

### Option 2: Netlify

1. **Connect Repository:**
   - Go to netlify.com
   - New site from Git
   - Select repository

2. **Build Settings:**
   ```
   Build command: npm run build
   Publish directory: .next
   ```

3. **Environment Variables:**
   ```
   NEXT_PUBLIC_API_URL=https://your-api-domain.com/api
   ```

### Option 3: AWS S3 + CloudFront

1. **Build for Static Export:**
   ```bash
   npm run build
   npm run export
   ```

2. **Upload to S3:**
   ```bash
   aws s3 sync out/ s3://your-bucket-name/
   ```

3. **Configure CloudFront:**
   - Create distribution pointing to S3
   - Enable caching

---

## Database Security

### MongoDB Atlas Setup

1. **Create Cluster:**
   - Go to mongodb.com/cloud/atlas
   - Create free tier cluster
   - Choose closest region

2. **Enable Authentication:**
   ```javascript
   // User created during setup
   // Enable IP whitelist: Only production server IPs
   ```

3. **Backup Strategy:**
   - Enable daily backups
   - Test restore procedures

4. **Monitoring:**
   - Enable performance advisor
   - Set up alerts for high CPU/memory

### Encryption

```bash
# Enable encryption at rest (MongoDB Atlas)
# Admin > Security > Encryption at Rest > Enable

# Encryption in transit (handled by TLS by default)
```

---

## API Security

### Rate Limiting
```javascript
// backend/src/config/env.js
RATE_LIMIT_WINDOW_MS=900000    // 15 minutes
RATE_LIMIT_MAX_REQUESTS=50     // Production: 50 req/15min

// Can be adjusted per endpoint if needed
```

### CORS Configuration
```javascript
// backend/src/config/cors.js
// Only allow your frontend domain in production
CORS_ORIGIN=https://your-frontend-domain.com
```

### API Key Rotation
```javascript
// Implement monthly JWT secret rotation:
// 1. Keep old secret active for 30 days
// 2. Generate new secret
// 3. Update all clients
// 4. Disable old secret
```

### DDoS Protection
```bash
# Use Cloudflare or AWS Shield
# Enable rate limiting at edge
# Implement bot detection
```

---

## Monitoring & Logging

### Backend Logging

**Current Implementation:**
```javascript
// backend/src/utils/logger.js
logger.error(message, error)
logger.warn(message)
logger.info(message)
logger.debug(message)
```

### Enhanced Monitoring

```bash
# Install Winston for better logging
npm install winston

# Install Sentry for error tracking
npm install @sentry/node
```

**Sentry Setup:**
```javascript
// backend/server.js
import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: env.NODE_ENV,
  tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.errorHandler());
```

### Performance Monitoring

```bash
# New Relic
npm install newrelic

# DataDog
npm install dd-trace
```

### Database Monitoring

- MongoDB Atlas has built-in metrics
- Monitor slow queries
- Set up alerts for:
  - High CPU usage
  - High memory usage
  - Connection limits
  - Disk space

---

## Security Checklist for Production

- [ ] All environment variables set with strong secrets
- [ ] HTTPS/SSL enabled
- [ ] CORS limited to frontend domain only
- [ ] Rate limiting configured
- [ ] Helmet.js protecting HTTP headers
- [ ] MongoDB Atlas IP whitelist enabled
- [ ] Database authentication enabled
- [ ] Database backups enabled and tested
- [ ] Error logging configured (Sentry/Winston)
- [ ] Performance monitoring configured
- [ ] DDoS protection enabled (Cloudflare)
- [ ] Security headers verified with https://securityheaders.com
- [ ] SSL certificate valid and auto-renewed
- [ ] Database encryption enabled
- [ ] Access logs enabled
- [ ] API versioning implemented
- [ ] Deprecation notices for endpoints
- [ ] Load balancing configured (if needed)
- [ ] WAF (Web Application Firewall) configured
- [ ] API documentation secured

---

## Common Security Mistakes to Avoid

❌ **DON'T:**
- Store secrets in code or .env files in git
- Use default database passwords
- Skip HTTPS in production
- Allow all CORS origins
- Trust user input without validation
- Store passwords in plain text
- Use old library versions (npm audit)
- Log sensitive data
- Expose stack traces to users

✅ **DO:**
- Use environment variables for secrets
- Rotate secrets periodically
- Validate all user inputs
- Use HTTPS everywhere
- Keep dependencies updated
- Implement comprehensive logging
- Use principle of least privilege
- Regular security audits
- Backup and disaster recovery plans

---

## Incident Response

### If Credentials Are Leaked

1. **Immediately:**
   ```bash
   # Regenerate all secrets
   NODE_ENV=production node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   
   # Update .env in production
   # Restart application
   ```

2. **Within 24 hours:**
   - Reset all user passwords
   - Audit access logs
   - Check for suspicious activity

### If Database Is Compromised

1. **Backup:**
   ```bash
   # Restore from clean backup
   # Only lose data after last backup
   ```

2. **Notify Users:**
   - Email all users about breach
   - Recommend password reset
   - Advise on next steps

---

## Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Node.js Security Checklist](https://blog.risingstack.com/node-js-security-checklist/)
- [Express.js Security Guide](https://expressjs.com/en/advanced/best-practice-security.html)
- [MongoDB Security](https://docs.mongodb.com/manual/security/)
- [JWT Best Practices](https://tools.ietf.org/html/rfc7519)

---

**Last Updated:** 2024
**Next Review:** Before production launch
