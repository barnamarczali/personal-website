import SiteLayout from '@/components/SiteLayout';

export default function ProjectsPage() {
  return (
    <SiteLayout>
      <div>
        <h2 className="text-2xl font-light mb-4">My Projects</h2>
        <p className="text-lg font-light leading-relaxed mb-4">
          Here are some of the projects I've been working on. Each project represents a unique challenge and learning opportunity.
        </p>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-light mb-2 text-brand-accent">Project One</h3>
            <p className="text-base font-light leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-light mb-2 text-brand-accent">Project Two</h3>
            <p className="text-base font-light leading-relaxed">
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-light mb-2 text-brand-accent">Project Three</h3>
            <p className="text-base font-light leading-relaxed">
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}

