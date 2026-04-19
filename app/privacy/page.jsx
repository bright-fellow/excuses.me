export default function Privacy() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem', fontFamily: 'system-ui' }}>
      <h1>Privacy Policy</h1>
      <p><strong>Last updated: April 2026</strong></p>

      <h2>Information We Collect</h2>
      <p>We collect minimal information necessary to provide our service:</p>
      <ul>
        <li><strong>User-submitted excuses:</strong> Text content you voluntarily submit, stored anonymously.</li>
        <li><strong>Usage analytics:</strong> Via Google Analytics and advertising pixels for service improvement.</li>
        <li><strong>IP addresses:</strong> Temporarily for rate limiting and security.</li>
      </ul>

      <h2>How We Use Information</h2>
      <ul>
        <li>To display user-submitted excuses publicly on our site.</li>
        <li>To prevent abuse through rate limiting.</li>
        <li>To analyze usage patterns and improve our service.</li>
        <li>To fund operations through targeted advertising.</li>
      </ul>

      <h2>Data Sharing</h2>
      <p>We do not sell personal data. Submitted excuses are public and may be used on the site. Analytics and advertising data may be shared with partners to help fund deployment and related services.</p>

      <h2>Your Rights (GDPR)</h2>
      <p>As an EU resident, you have rights to access, delete, or export your data. Contact us at privacy@excuses.me.</p>

      <h2>Cookies</h2>
      <p>We use cookies for analytics and advertising. You can opt out via browser settings.</p>

      <p>For questions, email privacy@excuses.me</p>
    </div>
  );
}