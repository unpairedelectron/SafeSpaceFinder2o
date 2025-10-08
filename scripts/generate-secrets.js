/**
 * Generate secure random secrets for environment variables
 * Usage: node scripts/generate-secrets.js
 */

const crypto = require('crypto');

console.log('\n🔐 Generating Secure Secrets\n');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

const secret1 = crypto.randomBytes(32).toString('base64');
const secret2 = crypto.randomBytes(32).toString('base64');

console.log('Copy these to your .env.local file:\n');
console.log(`JWT_SECRET=${secret1}`);
console.log(`NEXTAUTH_SECRET=${secret2}\n`);
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
console.log('⚠️  Keep these secret! Never commit to git.\n');
