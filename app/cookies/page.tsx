import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Cookies Policy - RefStack',
  description: 'Learn how RefStack uses cookies and similar technologies to provide and improve our services.'
};

export default function CookiesPolicy() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <h1 className="text-4xl font-bold mb-8">Cookies Policy</h1>
        <p className="text-muted-foreground text-lg mb-8">
          Last updated: June 1, 2024
        </p>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. What Are Cookies</h2>
            <p>
              Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently, as well as to provide information to the site owners.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. How We Use Cookies</h2>
            <p className="mb-4">We use cookies for several purposes, including:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>To keep you signed in</li>
              <li>To understand how you use our website</li>
              <li>To improve user experience</li>
              <li>To remember your preferences</li>
              <li>To serve targeted advertisements (with your consent)</li>
              <li>To analyze site traffic and usage patterns</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Types of Cookies We Use</h2>
            
            <h3 className="text-xl font-semibold mt-6 mb-2">3.1 Essential Cookies</h3>
            <p className="mb-4">
              These cookies are necessary for the website to function and cannot be switched off in our systems. They are usually only set in response to actions made by you which amount to a request for services, such as setting your privacy preferences, logging in, or filling in forms.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-2">3.2 Performance and Analytics Cookies</h3>
            <p className="mb-4">
              These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us know which pages are the most and least popular and see how visitors move around the site.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-2">3.3 Functionality Cookies</h3>
            <p className="mb-4">
              These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by third-party providers whose services we have added to our pages.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-2">3.4 Targeting/Advertising Cookies</h3>
            <p className="mb-4">
              These cookies may be set through our site by our advertising partners. They may be used by those companies to build a profile of your interests and show you relevant advertisements on other sites.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Third-Party Cookies</h2>
            <p className="mb-4">
              We may also use various third-party cookies to report usage statistics of the Service, deliver advertisements on and through the Service, and so on. These cookies may be used when you share information using a social media sharing button or "like" button on our website.
            </p>
            <p className="mb-4">
              The following third-party cookies may be placed on your computer or device:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong>Google Analytics</strong>: For analyzing site traffic and usage patterns</li>
              <li><strong>Stripe</strong>: For processing payments</li>
              <li><strong>Facebook Pixel</strong>: For advertising and analytics (if you consent)</li>
              <li><strong>Hotjar</strong>: For understanding user behavior (if you consent)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Managing Cookies</h2>
            <p className="mb-4">
              You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed.
            </p>
            <p className="mb-4">
              If you do this, however, you may have to manually adjust some preferences every time you visit a site and some services and functionalities may not work.
            </p>
            <h3 className="text-xl font-semibold mt-6 mb-2">5.1 Browser Settings</h3>
            <p className="mb-4">
              Most web browsers allow some control of most cookies through the browser settings. To find out more about cookies, including how to see what cookies have been set and how to manage and delete them, visit <a href="https://www.aboutcookies.org/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.aboutcookies.org</a> or <a href="https://www.allaboutcookies.org/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.allaboutcookies.org</a>.
            </p>
            <h3 className="text-xl font-semibold mt-6 mb-2">5.2 Cookie Consent</h3>
            <p className="mb-4">
              When you first visit our website, we will ask you to consent to our use of cookies in accordance with this policy. You can change your cookie settings at any time by clicking the "Cookie Settings" link in the footer of our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Changes to This Policy</h2>
            <p className="mb-4">
              We may update our Cookies Policy from time to time. We will notify you of any changes by posting the new Cookies Policy on this page and updating the "Last updated" date at the top of this Cookies Policy.
            </p>
            <p className="mb-4">
              You are advised to review this Cookies Policy periodically for any changes. Changes to this Cookies Policy are effective when they are posted on this page.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Contact Us</h2>
            <p className="mb-4">
              If you have any questions about this Cookies Policy, you can contact us:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>By email: <Link href="mailto:privacy@refstack.me" className="text-primary hover:underline">privacy@refstack.me</Link></li>
              <li>By visiting this page on our website: <Link href="/contact" className="text-primary hover:underline">Contact Us</Link></li>
              <li>By mail: 123 RefStack Way, San Francisco, CA 94107, United States</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
