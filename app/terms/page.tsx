import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service - RefStack',
  description: 'Terms of Service for using RefStack'
};

export default function TermsOfService() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        <p className="text-muted-foreground text-lg mb-8">
          Last updated: June 1, 2024
        </p>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
            <p className="mb-4">
              Welcome to RefStack. These Terms of Service ("Terms") govern your access to and use of the RefStack website, services, and applications (collectively, the "Service").
            </p>
            <p className="mb-4">
              By accessing or using the Service, you agree to be bound by these Terms. If you are using the Service on behalf of an organization, you are agreeing to these Terms for that organization and representing that you have the authority to bind that organization to these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Accounts and Registration</h2>
            <p className="mb-4">
              To access certain features of the Service, you must register for an account. When you register, you agree to provide accurate, current, and complete information and to keep this information up to date.
            </p>
            <p className="mb-4">
              You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. User Content</h2>
            <p className="mb-4">
              You retain ownership of any content you submit, post, or display on or through the Service ("User Content"). By making any User Content available through the Service, you grant us a worldwide, non-exclusive, royalty-free license to use, copy, modify, create derivative works based on, distribute, publicly display, and otherwise exploit your User Content in connection with operating and providing the Service.
            </p>
            <p className="mb-4">
              You are responsible for your User Content and the consequences of posting or publishing it. By uploading, posting, or otherwise making available any User Content, you represent and warrant that you own or have the necessary rights to the User Content and that the User Content does not infringe or violate any third-party rights.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Prohibited Conduct</h2>
            <p className="mb-4">
              You agree not to use the Service to:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Violate any applicable law or regulation</li>
              <li>Infringe the intellectual property or other rights of any third party</li>
              <li>Upload, post, or transmit any content that is unlawful, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, or otherwise objectionable</li>
              <li>Impersonate any person or entity or falsely state or otherwise misrepresent your affiliation with a person or entity</li>
              <li>Interfere with or disrupt the Service or servers or networks connected to the Service</li>
              <li>Use any robot, spider, site search/retrieval application, or other automated device to retrieve or index any portion of the Service</li>
              <li>Transmit any viruses, worms, defects, Trojan horses, or any items of a destructive nature</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Subscription Plans and Payments</h2>
            <p className="mb-4">
              RefStack offers both free and paid subscription plans. By signing up for a paid subscription, you agree to pay all applicable fees as described on the Service at the time of purchase.
            </p>
            <h3 className="text-xl font-semibold mt-6 mb-2">5.1 Billing</h3>
            <p className="mb-4">
              Payments are processed through our third-party payment processor. You agree to provide current, complete, and accurate purchase and account information for all purchases made via the Service.
            </p>
            <h3 className="text-xl font-semibold mt-6 mb-2">5.2 Renewals and Cancellations</h3>
            <p className="mb-4">
              Subscriptions automatically renew at the end of each billing cycle unless you cancel your subscription before the end of the current billing period. You may cancel your subscription at any time through your account settings.
            </p>
            <h3 className="text-xl font-semibold mt-6 mb-2">5.3 Refunds</h3>
            <p className="mb-4">
              We do not provide refunds for partial subscription periods. For more information about our refund policy, please see our <Link href="/legal" className="text-primary hover:underline">Legal page</Link>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Termination</h2>
            <p className="mb-4">
              We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.
            </p>
            <p className="mb-4">
              All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Disclaimers</h2>
            <p className="mb-4">
              THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. REFSTACK MAKES NO REPRESENTATIONS OR WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, AS TO THE OPERATION OF THE SERVICE OR THE INFORMATION, CONTENT, OR MATERIALS INCLUDED THEREIN.
            </p>
            <p className="mb-4">
              TO THE FULL EXTENT PERMISSIBLE BY APPLICABLE LAW, REFSTACK DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Limitation of Liability</h2>
            <p className="mb-4">
              IN NO EVENT SHALL REFSTACK, NOR ITS DIRECTORS, EMPLOYEES, PARTNERS, AGENTS, SUPPLIERS, OR AFFILIATES, BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM (I) YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE SERVICE; (II) ANY CONDUCT OR CONTENT OF ANY THIRD PARTY ON THE SERVICE; (III) ANY CONTENT OBTAINED FROM THE SERVICE; AND (IV) UNAUTHORIZED ACCESS, USE, OR ALTERATION OF YOUR TRANSMISSIONS OR CONTENT, WHETHER BASED ON WARRANTY, CONTRACT, TORT (INCLUDING NEGLIGENCE), OR ANY OTHER LEGAL THEORY, WHETHER OR NOT WE HAVE BEEN INFORMED OF THE POSSIBILITY OF SUCH DAMAGE.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">9. Changes to These Terms</h2>
            <p className="mb-4">
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
            </p>
            <p className="mb-4">
              By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, you must stop using the Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">10. Contact Us</h2>
            <p className="mb-4">
              If you have any questions about these Terms, please contact us:
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
