export const metadata = {
  title: 'Terms of Service — excuses.me',
  description: 'Terms of Service for excuses.me',
};

export default function TermsPage() {
  return (
    <main style={{ maxWidth: 720, margin: '0 auto', padding: '6rem 2rem 4rem', fontFamily: 'var(--f)', color: 'var(--black)', lineHeight: 1.7 }}>
      <h1 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '2rem', letterSpacing: '-.03em' }}>Terms of Service</h1>
      <p style={{ color: 'var(--gray)', fontSize: '.85rem', marginBottom: '2.5rem' }}>Last updated: April 2026</p>

      <h2 style={{ fontSize: '1.1rem', fontWeight: 600, margin: '2rem 0 .5rem' }}>1. Acceptance</h2>
      <p>By using excuses.me you agree to these terms. If you do not agree, do not use the service.</p>

      <h2 style={{ fontSize: '1.1rem', fontWeight: 600, margin: '2rem 0 .5rem' }}>2. Use of the Service</h2>
      <p>excuses.me is a free tool for generating excuses for personal, non-commercial use. You may not use the service to generate content that is illegal, harmful, harassing, or deceptive in a way that causes harm to others.</p>

      <h2 style={{ fontSize: '1.1rem', fontWeight: 600, margin: '2rem 0 .5rem' }}>3. User Submissions</h2>
      <p>When you submit an excuse to the public feed, you grant excuses.me a non-exclusive, royalty-free licence to display that content. You are responsible for what you submit. Submissions are moderated and may be removed at our discretion.</p>

      <h2 style={{ fontSize: '1.1rem', fontWeight: 600, margin: '2rem 0 .5rem' }}>4. Accounts</h2>
      <p>You may sign in via Google or Apple. You are responsible for keeping your account secure. We may suspend accounts that violate these terms.</p>

      <h2 style={{ fontSize: '1.1rem', fontWeight: 600, margin: '2rem 0 .5rem' }}>5. Disclaimer</h2>
      <p>The service is provided &quot;as is&quot; without warranties of any kind. We are not responsible for how excuses are used in the real world.</p>

      <h2 style={{ fontSize: '1.1rem', fontWeight: 600, margin: '2rem 0 .5rem' }}>6. Limitation of Liability</h2>
      <p>To the maximum extent permitted by law, excuses.me shall not be liable for any indirect, incidental, or consequential damages arising from your use of the service.</p>

      <h2 style={{ fontSize: '1.1rem', fontWeight: 600, margin: '2rem 0 .5rem' }}>7. Changes</h2>
      <p>We may update these terms at any time. Continued use of the service after changes constitutes acceptance of the new terms.</p>

      <h2 style={{ fontSize: '1.1rem', fontWeight: 600, margin: '2rem 0 .5rem' }}>8. Contact</h2>
      <p>Questions? <a href="mailto:hello@excuses.me" style={{ color: 'var(--acc)' }}>hello@excuses.me</a></p>
    </main>
  );
}
