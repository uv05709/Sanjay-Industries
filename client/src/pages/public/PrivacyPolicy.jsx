import SEOHead from '../../components/common/SEOHead';
import Breadcrumb from '../../components/common/Breadcrumb';

const PrivacyPolicy = () => (
  <>
    <SEOHead title="Privacy Policy" description="Privacy Policy of Sanjay Industries — how we collect, use, and protect your data." canonical="/privacy-policy" />
    <section className="pt-28 pb-12 bg-primary"><div className="container-custom"><Breadcrumb items={[{ label: 'Privacy Policy' }]} /><h1 className="font-heading text-display-sm text-white font-bold mt-4">Privacy Policy</h1></div></section>
    <section className="section-padding bg-cream">
      <div className="container-narrow">
        <div className="card p-8 md:p-10 prose prose-sm max-w-none text-text [&_h2]:font-heading [&_h2]:text-primary [&_h2]:text-heading-3 [&_h2]:mt-8 [&_h2]:mb-3">
          <p className="text-text-light text-sm">Last updated: January 2024</p>
          <h2>Information We Collect</h2>
          <p>When you submit an enquiry form, bulk order request, dealer registration, or contact us, we collect personal information such as your name, email address, phone number, company name, city, and business details. This information is provided voluntarily by you.</p>
          <h2>How We Use Your Information</h2>
          <p>We use the information you provide to: respond to your enquiries and wholesale requests; process bulk order enquiries; evaluate dealer applications; send you product updates and offers (only if you subscribe); improve our website and services.</p>
          <h2>Data Protection</h2>
          <p>We implement reasonable security measures to protect your personal information. Your data is stored securely and is accessible only to authorised personnel at Sanjay Industries.</p>
          <h2>Third-Party Sharing</h2>
          <p>We do not sell, trade, or share your personal information with third parties, except when required by law or to fulfil a service you have requested (e.g., shipping partners for delivery).</p>
          <h2>Cookies</h2>
          <p>Our website may use cookies to enhance your browsing experience. Cookies are small files stored on your device. You can disable cookies in your browser settings.</p>
          <h2>Contact</h2>
          <p>For any questions regarding our privacy practices, please contact us at info@sanjayindustries.com.</p>
        </div>
      </div>
    </section>
  </>
);
export default PrivacyPolicy;
