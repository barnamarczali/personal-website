import SiteLayout from '@/components/SiteLayout';

export default function AboutMePage() {
  return (
    <SiteLayout>
      <div>
        <h2 className="text-2xl font-light mb-4">About Me</h2>
        <p className="text-lg font-light leading-relaxed mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <p className="text-lg font-light leading-relaxed mb-4">
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <p className="text-lg font-light leading-relaxed">
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </p>
      </div>
    </SiteLayout>
  );
}

