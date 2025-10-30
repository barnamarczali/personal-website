import SiteLayout from '@/components/SiteLayout';

export default function ContactPage() {
  return (
    <SiteLayout>
      <div>
        <h2 className="text-2xl font-light mb-4">Contact</h2>
        <p className="text-lg font-light leading-relaxed mb-6">
          I'd love to hear from you! Feel free to reach out through any of the social links below, or send me an email directly.
        </p>
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-light mb-2 text-brand-accent">Email</h3>
            <a 
              href="mailto:marczali.barna@gmail.com"
              className="text-base font-light leading-relaxed hover:text-brand-accent transition-colors duration-300"
            >
              marczali.barna@gmail.com
            </a>
          </div>
          <div>
            <h3 className="text-xl font-light mb-2 text-brand-accent">Social Media</h3>
            <p className="text-base font-light leading-relaxed">
              Connect with me on GitHub, LinkedIn, X, or Threads. You'll find all the links at the bottom of the page.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-light mb-2 text-brand-accent">Availability</h3>
            <p className="text-base font-light leading-relaxed">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}

