import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Legal - RefStack',
  description: 'Legal information and terms for RefStack users.'
};

export default function LegalPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <h1 className="text-4xl font-bold mb-8">Legal Information</h1>
        <p className="text-muted-foreground text-lg mb-8">
          Last updated: June 1, 2024
        </p>

        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Terms of Service</h2>
            <p className="mb-4">
              By accessing and using RefStack, you accept and agree to be bound by the terms and provisions of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.
            </p>
            <h3 className="text-xl font-semibold mt-6 mb-2">1. User Responsibilities</h3>
            <p className="mb-4">
              As a user of the Site, you may be asked to register with us. When you do so, you will choose a user identifier, which may be your email address or another term, as well as a password. You may also provide personal information, including, but not limited to, your name. You are responsible for ensuring the accuracy of this information.
            </p>
            <h3 className="text-xl font-semibold mt-6 mb-2">2. Privacy Policy</h3>
            <p className="mb-4">
              We respect your privacy and are committed to protecting it. Please review our <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link> for details about what information we collect and how we use it.
            </p>
            <h3 className="text-xl font-semibold mt-6 mb-2">3. Intellectual Property</h3>
            <p className="mb-4">
              The Site and its original content, features, and functionality are owned by RefStack and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Refund Policy</h2>
            <p className="mb-4">
              We want you to be satisfied with your purchase on RefStack. If you're not completely satisfied, we're here to help.
            </p>
            <h3 className="text-xl font-semibold mt-6 mb-2">1. Subscription Plans</h3>
            <p className="mb-4">
              You may cancel your RefStack subscription at any time. If you cancel your subscription, you will continue to have access to the paid features until the end of your current billing period. We do not provide refunds for partial billing periods.
            </p>
            <h3 className="text-xl font-semibold mt-6 mb-2">2. Add-ons</h3>
            <p className="mb-4">
              Add-ons are non-refundable once purchased. If you have any issues with an add-on, please contact our support team for assistance.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Service Level Agreement (SLA)</h2>
            <p className="mb-4">
              RefStack is committed to providing a reliable and high-quality service to all our users. Our SLA outlines our commitments regarding service uptime and support.
            </p>
            <h3 className="text-xl font-semibold mt-6 mb-2">1. Uptime Commitment</h3>
            <p className="mb-4">
              We strive to maintain 99.9% uptime for our service. Scheduled maintenance windows will be announced in advance whenever possible.
            </p>
            <h3 className="text-xl font-semibold mt-6 mb-2">2. Support</h3>
            <p className="mb-4">
              We offer email support to all users. Pro users receive priority support with a guaranteed response time of 24 hours or less.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Acceptable Use Policy</h2>
            <p className="mb-4">
              You agree not to use the Service to:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Engage in any illegal or fraudulent activity</li>
              <li>Distribute spam, malware, or other harmful content</li>
              <li>Impersonate any person or entity</li>
              <li>Violate the intellectual property rights of others</li>
              <li>Interfere with or disrupt the Service or servers</li>
              <li>Use the Service for any purpose that is harmful to others</li>
            </ul>
            <p className="mb-4">
              We reserve the right to terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Governing Law</h2>
            <p className="mb-4">
              These Terms shall be governed and construed in accordance with the laws of the State of California, United States, without regard to its conflict of law provisions.
            </p>
            <p className="mb-4">
              Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Changes to These Terms</h2>
            <p className="mb-4">
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
            </p>
            <p className="mb-4">
              By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, you must stop using the Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p className="mb-4">
              If you have any questions about these Legal Terms, please contact us:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>By email: <Link href="mailto:legal@refstack.me" className="text-primary hover:underline">legal@refstack.me</Link></li>
              <li>By visiting our <Link href="/contact" className="text-primary hover:underline">Contact page</Link></li>
              <li>By mail: 123 RefStack Way, San Francisco, CA 94107, United States</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
