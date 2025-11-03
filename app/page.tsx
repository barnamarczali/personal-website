'use client';

import { useState } from 'react';
import ClickSpark from '@/components/ClickSpark';

const socials = [
  { name: 'github', url: 'https://github.com/barnamarczali' },
  { name: 'linkedin', url: 'https://linkedin.com/in/barnamarczali' },
  { name: 'x', url: 'https://x.com/barnamarczali' },
  { name: 'email', url: 'mailto:marczali.barna@gmail.com' },
  { name: 'discord', url: 'https://discord.com/users/189419600000188416' },
];

const menuItems = [
  { name: 'about me', id: 'about' },
  { name: 'my projects', id: 'projects' },
  { name: 'writing', id: 'writing' },
  { name: 'music', id: 'music' },
  { name: 'contact', id: 'contact' },
];

const AboutContent = () => {
  return (
    <div className="about-content-wrapper relative">
      <div className="section-content">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-light text-brand-accent">whoami?</h2>
          <img 
            src="/git_pfp.png" 
            alt="barna marczali" 
            className="h-16 w-16 md:h-20 md:w-20 rounded-full object-cover relative z-0"
          />
        </div>
        <p className="text-lg font-light leading-relaxed mb-4">
          hi! i'm barna marczali, a builder, tech enthusiast, and entrepreneur on the east-coast of the usa, 
          studying computer science and economics at johns hopkins university. my countless interests include startups, 
          ai, ml, web dev ui/ux, fintech, music, football–the real one ;)–and more.
        </p>
        <p className="text-lg font-light leading-relaxed mb-4">
          always looking for new challenges and opportunities to learn and grow, i am determined to make a positive impact 
          on the world with social-consumer technology that will make the difference. currently building 
          <a href="https://www.dayli.social" className="text-brand-accent hover:text-brand-accent/80 transition-colors" target="_blank" rel="noopener noreferrer"> dayli</a>
        </p>
        <p className="text-lg font-light leading-relaxed mb-8">
          so welcome to my site, i hope you find it–and what i do–useful! please feel free to reach out on any of the platforms 
          if you think we can learn together, build something cool, or just to chat! i love to connect with anyone interested in similar or 
          completely different fields :)
        </p>
      </div>

      <div className="section-content">
        <h2 className="text-2xl font-light text-brand-accent mb-4">education</h2>
        <div className="space-y-8 mb-12">
          <div className="flex items-center gap-4">
            <a 
              href="https://en.wikipedia.org/wiki/Johns_Hopkins_University"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <img 
                src="/jhu.png" 
                alt="Johns Hopkins University" 
                className="h-12 w-12 object-contain"
                style={{
                  filter: 'brightness(0) invert(1)',
                  opacity: 0.95
                }}
              />
            </a>
            <p className="text-lg font-light leading-relaxed">
              computer science & economics [at] johns hopkins university <br />
              [2023-2027]
            </p>
          </div>
          <div className="flex items-center gap-4">
            <a 
              href="https://en.wikipedia.org/wiki/National_University_of_Singapore"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <img 
                src="/nus.png" 
                alt="National University of Singapore" 
                className="h-12 w-12 object-contain"
              />
            </a>
            <p className="text-lg font-light leading-relaxed">
              engineering exchange [at] national university of singapore <br />
              [2025]
            </p>
          </div>
        </div>
      </div>

      <div className="section-content">
        <h2 className="text-2xl font-light text-brand-accent mb-4">experience</h2>
        <div className="relative mb-12 -ml-2">
          {/* Continuous vertical line */}
          <div className="absolute left-[3.8rem] top-0 bottom-0 w-px bg-brand-accent/30"></div>
          
          {/* Timeline entries */}
          <div className="space-y-0">
            {/* 2025 - Startup Founder */}
            <div className="flex gap-2 items-start pb-8">
              <span className="text-lg font-light text-brand-text/60 whitespace-nowrap w-12 text-right">2025</span>
              <div className="relative flex items-start pt-[0.55rem]">
                <div className="w-3 h-3 rounded-full bg-brand-accent z-10"></div>
              </div>
              <div className="flex-1 pt-0">
                <p className="text-lg font-light leading-relaxed">
                  co-founder, cto/coo at dayli <span className="text-brand-text/60">(baltimore, md)</span>
                </p>
              </div>
            </div>
            
            {/* 2025 - VC Intern */}
            <div className="flex gap-2 items-start pb-8">
              <span className="text-lg font-light text-brand-text/60 whitespace-nowrap w-12 text-right">2025</span>
              <div className="relative flex items-start pt-[0.55rem]">
                <div className="w-3 h-3 rounded-full bg-brand-accent z-10"></div>
              </div>
              <div className="flex-1 pt-0">
                <p className="text-lg font-light leading-relaxed">
                  summer vc intern at day1 capital <span className="text-brand-text/60">(budapest, hungary)</span>
                </p>
              </div>
            </div>
            
            {/* 2025 - Johns Hopkins Algorithmic Trading Club */}
            <div className="flex gap-2 items-start pb-8">
              <span className="text-lg font-light text-brand-text/60 whitespace-nowrap w-12 text-right">2025</span>
              <div className="relative flex items-start pt-[0.55rem]">
                <div className="w-3 h-3 rounded-full bg-brand-accent z-10"></div>
              </div>
              <div className="flex-1 pt-0">
                <p className="text-lg font-light leading-relaxed">
                  co-founder & developer at johns hopkins algorithmic trading club <span className="text-brand-text/60">(baltimore, md)</span>
                </p>
              </div>
            </div>

            {/* 2024 - Startup Founder */}
            <div className="flex gap-2 items-start pb-8">
              <span className="text-lg font-light text-brand-text/60 whitespace-nowrap w-12 text-right">2024</span>
              <div className="relative flex items-start pt-[0.55rem]">
                <div className="w-3 h-3 rounded-full bg-brand-accent z-10"></div>
              </div>
              <div className="flex-1 pt-0">
                <p className="text-lg font-light leading-relaxed">
                  co-founder, cto at spark.ai <span className="text-brand-text/60">(baltimore, md)</span>
                </p>
              </div>
            </div>

            {/* 2024 - JHU Sports Analytics */}
            <div className="flex gap-2 items-start pb-8">
              <span className="text-lg font-light text-brand-text/60 whitespace-nowrap w-12 text-right">2024</span>
              <div className="relative flex items-start pt-[0.55rem]">
                <div className="w-3 h-3 rounded-full bg-brand-accent z-10"></div>
              </div>
              <div className="flex-1 pt-0">
                <p className="text-lg font-light leading-relaxed">
                  python developer at johns hopkins sports analytics research group <span className="text-brand-text/60">(baltimore, md)</span>
                </p>
              </div>
            </div>

            {/* 2024 - AMA @ JHU */}
            <div className="flex gap-2 items-start pb-8">
              <span className="text-lg font-light text-brand-text/60 whitespace-nowrap w-12 text-right">2024</span>
              <div className="relative flex items-start pt-[0.55rem]">
                <div className="w-3 h-3 rounded-full bg-brand-accent z-10"></div>
              </div>
              <div className="flex-1 pt-0">
                <p className="text-lg font-light leading-relaxed">
                  vice president of consulting & board member at american marketing association @ jhu - nest strategies consulting <span className="text-brand-text/60">(baltimore, md)</span>
                </p>
              </div>
            </div>

            {/* 2023 - JHU Economics Club */}
            <div className="flex gap-2 items-start pb-8">
              <span className="text-lg font-light text-brand-text/60 whitespace-nowrap w-12 text-right">2023</span>
              <div className="relative flex items-start pt-[0.55rem]">
                <div className="w-3 h-3 rounded-full bg-brand-accent z-10"></div>
              </div>
              <div className="flex-1 pt-0">
                <p className="text-lg font-light leading-relaxed">
                  team lead, leader assistant & board member at johns hopkins university economics club <span className="text-brand-text/60">(baltimore, md)</span>
                </p>
              </div>
            </div>

            {/* 2022 - ASP Group */}
            <div className="flex gap-2 items-start pb-8">
              <span className="text-lg font-light text-brand-text/60 whitespace-nowrap w-12 text-right">2022</span>
              <div className="relative flex items-start pt-[0.55rem]">
                <div className="w-3 h-3 rounded-full bg-brand-accent z-10"></div>
              </div>
              <div className="flex-1 pt-0">
                <p className="text-lg font-light leading-relaxed">
                  private equity associate intern at asp group <span className="text-brand-text/60">(vienna, austria)</span>
                </p>
              </div>
            </div>

            {/* 2022 - Enpulsion */}
            <div className="flex gap-2 items-start pb-8">
              <span className="text-lg font-light text-brand-text/60 whitespace-nowrap w-12 text-right">2022</span>
              <div className="relative flex items-start pt-[0.55rem]">
                <div className="w-3 h-3 rounded-full bg-brand-accent z-10"></div>
              </div>
              <div className="flex-1 pt-0">
                <p className="text-lg font-light leading-relaxed">
                  marketing intern at enpulsion gmbh <span className="text-brand-text/60">(vienna, austria)</span>
                </p>
              </div>
            </div>

            {/* 2022 - Milestone Business Society */}
            <div className="flex gap-2 items-start pb-8">
              <span className="text-lg font-light text-brand-text/60 whitespace-nowrap w-12 text-right">2022</span>
              <div className="relative flex items-start pt-[0.55rem]">
                <div className="w-3 h-3 rounded-full bg-brand-accent z-10"></div>
              </div>
              <div className="flex-1 pt-0">
                <p className="text-lg font-light leading-relaxed">
                  co-founder & president at milestone business society <span className="text-brand-text/60">(budapest, hungary)</span>
                </p>
              </div>
            </div>

            {/* 2021 - Tesztallomas.hu */}
            <div className="flex gap-2 items-start pb-8">
              <span className="text-lg font-light text-brand-text/60 whitespace-nowrap w-12 text-right">2021</span>
              <div className="relative flex items-start pt-[0.55rem]">
                <div className="w-3 h-3 rounded-full bg-brand-accent z-10"></div>
              </div>
              <div className="flex-1 pt-0">
                <p className="text-lg font-light leading-relaxed">
                  co-creator at tesztallomas.hu <span className="text-brand-text/60">(budapest, hungary)</span>
                </p>
              </div>
            </div>

            {/* 2020 - Urban AI Parking Assistant */}
            <div className="flex gap-2 items-start">
              <span className="text-lg font-light text-brand-text/60 whitespace-nowrap w-12 text-right">2020</span>
              <div className="relative flex items-start pt-[0.55rem]">
                <div className="w-3 h-3 rounded-full bg-brand-accent z-10"></div>
              </div>
              <div className="flex-1 pt-0">
                <p className="text-lg font-light leading-relaxed">
                  co-founder at urban ai parking assistant <span className="text-brand-text/60">(budapest, hungary)</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section-content">
        <h2 className="text-2xl font-light text-brand-accent mb-4">skills</h2>
        <div className="space-y-6 mb-8">
          <div className="flex flex-wrap gap-2">
            {[
              { name: 'react', url: 'https://en.wikipedia.org/wiki/React_(software)' },
              { name: 'next.js', url: 'https://en.wikipedia.org/wiki/Next.js' },
              { name: 'html', url: 'https://en.wikipedia.org/wiki/HTML' },
              { name: 'css', url: 'https://en.wikipedia.org/wiki/CSS' },
              { name: 'java', url: 'https://en.wikipedia.org/wiki/Java_(programming_language)' },
              { name: 'javascript', url: 'https://en.wikipedia.org/wiki/JavaScript' },
              { name: 'python', url: 'https://en.wikipedia.org/wiki/Python_(programming_language)' },
              { name: 'pytorch', url: 'https://en.wikipedia.org/wiki/PyTorch' },
              { name: 'c/c++', url: 'https://en.wikipedia.org/wiki/C%2B%2B' },
              { name: 'sql', url: 'https://en.wikipedia.org/wiki/SQL' },
              { name: 'r', url: 'https://en.wikipedia.org/wiki/R_(programming_language)' },
              { name: 'solidity', url: 'https://en.wikipedia.org/wiki/Solidity' },
              { name: 'solidworks', url: 'https://en.wikipedia.org/wiki/SolidWorks' },
            ].map((skill) => (
              <a
                key={skill.name}
                href={skill.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2 py-0.5 rounded-sm text-lg font-light leading-relaxed hover:opacity-80 transition-opacity"
                style={{
                  backgroundColor: 'rgba(229, 143, 101, 0.15)',
                }}
              >
                {skill.name}
              </a>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { name: 'financial analysis', url: 'https://en.wikipedia.org/wiki/Financial_analysis' },
              { name: 'algorithmic trading', url: 'https://en.wikipedia.org/wiki/Algorithmic_trading' },
              { name: 'quantconnect', url: 'https://en.wikipedia.org/wiki/QuantConnect' },
            ].map((skill) => (
              <a
                key={skill.name}
                href={skill.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2 py-0.5 rounded-sm text-lg font-light leading-relaxed hover:opacity-80 transition-opacity"
                style={{
                  backgroundColor: 'rgba(107, 114, 128, 0.15)',
                }}
              >
                {skill.name}
              </a>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { name: 'hungarian', url: 'https://en.wikipedia.org/wiki/Hungarian_language' },
              { name: 'english', url: 'https://en.wikipedia.org/wiki/English_language' },
              { name: 'spanish', url: 'https://en.wikipedia.org/wiki/Spanish_language' },
              { name: 'hebrew', url: 'https://en.wikipedia.org/wiki/Hebrew_language' },
            ].map((skill) => (
              <a
                key={skill.name}
                href={skill.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2 py-0.5 rounded-sm text-lg font-light leading-relaxed hover:opacity-80 transition-opacity"
                style={{
                  backgroundColor: 'rgba(147, 197, 253, 0.15)',
                }}
              >
                {skill.name}
              </a>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { name: 'electric guitar', url: 'https://en.wikipedia.org/wiki/Electric_guitar' },
              { name: 'acoustic guitar', url: 'https://en.wikipedia.org/wiki/Acoustic_guitar' },
              { name: 'flamenco guitar', url: 'https://en.wikipedia.org/wiki/Flamenco_guitar' },
              { name: 'salsa', url: 'https://en.wikipedia.org/wiki/Salsa_(dance)' },
            ].map((skill) => (
              <a
                key={skill.name}
                href={skill.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2 py-0.5 rounded-sm text-lg font-light leading-relaxed hover:opacity-80 transition-opacity"
                style={{
                  backgroundColor: 'rgba(252, 211, 77, 0.15)',
                }}
              >
                {skill.name}
              </a>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { name: 'football', url: 'https://en.wikipedia.org/wiki/Association_football' },
              { name: 'tennis', url: 'https://en.wikipedia.org/wiki/Tennis' },
              { name: 'scuba diving', url: 'https://en.wikipedia.org/wiki/Scuba_diving' },
            ].map((skill) => (
              <a
                key={skill.name}
                href={skill.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2 py-0.5 rounded-sm text-lg font-light leading-relaxed hover:opacity-80 transition-opacity"
                style={{
                  backgroundColor: 'rgba(134, 239, 172, 0.15)',
                }}
              >
                {skill.name}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="section-content">
        <h2 className="text-2xl font-light text-brand-accent mb-4">interests</h2>
        <div className="flex flex-wrap gap-2.5 mb-24">
          {[
            { name: 'startups', url: 'https://en.wikipedia.org/wiki/Startup_company' },
            { name: 'chess', url: 'https://en.wikipedia.org/wiki/Chess' },
            { name: 'ai', url: 'https://en.wikipedia.org/wiki/Artificial_intelligence' },
            { name: 'ml', url: 'https://en.wikipedia.org/wiki/Machine_learning' },
            { name: 'social entrepreneurship', url: 'https://en.wikipedia.org/wiki/Social_entrepreneurship' },
            { name: 'mixing', url: 'https://en.wikipedia.org/wiki/Audio_mixing' },
            { name: 'padel', url: 'https://en.wikipedia.org/wiki/Padel' },
            { name: 'cooking', url: 'https://en.wikipedia.org/wiki/Cooking' },
            { name: 'spy-fictions', url: 'https://en.wikipedia.org/wiki/Spy_fiction' },
            { name: 'classics', url: 'https://en.wikipedia.org/wiki/Classic_book' },
            { name: 'defense/security tech', url: 'https://en.wikipedia.org/wiki/Defense_technology' },
            { name: 'consumer tech', url: 'https://en.wikipedia.org/wiki/Consumer_electronics' },
            { name: 'robotics', url: 'https://en.wikipedia.org/wiki/Robotics' },
            { name: 'writing', url: 'https://en.wikipedia.org/wiki/Writing' },
          ].map((interest) => (
            <a
              key={interest.name}
              href={interest.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 rounded-md text-lg font-light leading-relaxed hover:opacity-80 transition-opacity"
              style={{
                backgroundColor: 'rgba(229, 143, 101, 0.12)',
              }}
            >
              {interest.name}
            </a>
          ))}
          <div className="w-full">
            <div className="h-6 md:h-6" />
            <p className="text-lg font-light leading-relaxed">
              if you share any of these interests or found my site useful, feel free to reach out!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const CONTENT_VIEWS = {
  about: () => <AboutContent />,
  projects: () => (
    <div>
      <h2 className="text-2xl font-light text-brand-accent mb-4">some things i've built...</h2>
      <div className="space-y-4">
        {/* dayli.social */}
        <div 
          className="flex items-start gap-3 p-4 rounded-lg transition-all duration-300 hover:bg-opacity-20"
          style={{ backgroundColor: 'rgba(229, 143, 101, 0.08)' }}
        >
          <div className="flex-1">
            <h3 className="text-xl font-light mb-1 text-brand-accent">dayli</h3>
            <p className="text-base font-light leading-relaxed mb-2">
              a social app to help everyone not lose their friends and people who are important to them, 
              and to encourage real connection in a world where everyone is so preocccupied with work, "social" 
              media, and the other millions of distractions
            </p>
          </div>
          <a
            href="https://www.dayli.social"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-text hover:text-brand-accent transition-colors duration-300 flex-shrink-0 mt-1"
            title="Visit website"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>

        {/* personal website */}
        <div 
          className="flex items-start gap-3 p-4 rounded-lg transition-all duration-300 hover:bg-opacity-20"
          style={{ backgroundColor: 'rgba(229, 143, 101, 0.08)' }}
        >
          <div className="flex-1">
            <h3 className="text-xl font-light mb-1 text-brand-accent">personal website</h3>
            <p className="text-base font-light leading-relaxed mb-2">
              this very site :) let me know how to improve it!
            </p>
          </div>
          <a
            href="https://github.com/barnamarczali/personal-website"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-text hover:text-brand-accent transition-colors duration-300 flex-shrink-0 mt-1"
            title="View on GitHub"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
          </a>
        </div>

        {/* i-know-where-you-live */}
        <div 
          className="flex items-start gap-3 p-4 rounded-lg transition-all duration-300 hover:bg-opacity-20"
          style={{ backgroundColor: 'rgba(229, 143, 101, 0.08)' }}
        >
          <div className="flex-1">
            <h3 className="text-xl font-light mb-1 text-brand-accent">terminail</h3>
            <p className="text-base font-light leading-relaxed mb-2">
              osint profiling tool built for the cursor hackathon singapore where you can look up anyone and get a detailed profile built 
              on them based on publicly available information on the internet
            </p>
          </div>
          <a
            href="https://github.com/budaic/i-know-where-you-live"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-text hover:text-brand-accent transition-colors duration-300 flex-shrink-0 mt-1"
            title="View on GitHub"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
          </a>
        </div>

        {/* usespark.ai */}
        <div 
          className="flex items-start gap-3 p-4 rounded-lg transition-all duration-300 hover:bg-opacity-20"
          style={{ backgroundColor: 'rgba(229, 143, 101, 0.08)' }}
        >
          <div className="flex-1">
            <h3 className="text-xl font-light mb-1 text-brand-accent">spark.ai</h3>
            <p className="text-base font-light leading-relaxed mb-2">
              an ai-powered "online yc" platform to guide founders from idea to mvp
            </p>
          </div>
          <a
            href="https://www.usespark.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-text hover:text-brand-accent transition-colors duration-300 flex-shrink-0 mt-1"
            title="Visit website"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>

        {/* bridgewayworld.com */}
        <div 
          className="flex items-start gap-3 p-4 rounded-lg transition-all duration-300 hover:bg-opacity-20"
          style={{ backgroundColor: 'rgba(229, 143, 101, 0.08)' }}
        >
          <div className="flex-1">
            <h3 className="text-xl font-light mb-1 text-brand-accent">bridgeway world</h3>
            <p className="text-base font-light leading-relaxed mb-2">
              building a community in higher education based on mentorship, collaboration, and professional opportunities
            </p>
          </div>
          <a
            href="https://www.bridgewayworld.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-text hover:text-brand-accent transition-colors duration-300 flex-shrink-0 mt-1"
            title="Visit website"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>

        {/* algorithmic trading services */}
        <div 
          className="flex items-start gap-3 p-4 rounded-lg transition-all duration-300"
          style={{ backgroundColor: 'rgba(229, 143, 101, 0.08)' }}
        >
          <div className="flex-1">
            <h3 className="text-xl font-light mb-1 text-brand-accent">algorithmic trading services</h3>
            <p className="text-base font-light leading-relaxed mb-2">
              algorithmic trading strategies as a service
            </p>
          </div>
          <div className="text-brand-text/40 flex-shrink-0 mt-1 text-sm font-light">
            coming soon...
          </div>
        </div>
      </div>
    </div>
  ),
  writing: () => (
    <div>
      <div className="flex items-center mb-4">
        <p className="text-lg font-light leading-relaxed">
          still typing...
        </p>
        <div className="ml-2 relative inline-block animate-spin" style={{ width: '1.4rem', height: '1.4rem', animationDuration: '1s' }}>
          <img 
            src="/beachball.svg" 
            alt="loading" 
            decoding="async"
            data-nimg="intrinsic"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              boxSizing: 'border-box',
              padding: 0,
              border: 'none',
              margin: 'auto',
              display: 'block',
              width: 0,
              height: 0,
              minWidth: '100%',
              maxWidth: '100%',
              minHeight: '100%',
              maxHeight: '100%'
            }}
            srcSet="/beachball.svg 1x, /beachball.svg 2x"
          />
        </div>
      </div>
    </div>
  ),
  music: () => (
    <div>
      <h2 className="text-2xl font-light text-brand-accent mb-4">music</h2>
      <p className="text-lg font-light leading-relaxed mb-4">
        Music has always been an integral part of my life. Here's a glimpse into my musical journey and the genres that inspire me.
      </p>
      <p className="text-lg font-light leading-relaxed mb-4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </p>
      <p className="text-lg font-light leading-relaxed">
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.
      </p>
    </div>
  ),
  contact: () => (
    <div>
      <h2 className="text-2xl font-light text-brand-accent mb-4">contact</h2>
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
  ),
};

export default function Page() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentView, setCurrentView] = useState<string | null>(null);
  const [previousView, setPreviousView] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');

  const handleExpand = () => {
    setIsExpanded(true);
    // Set initial view to "about me" after animation starts
    setTimeout(() => {
      setCurrentView('about');
    }, 400);
  };

  const handleMenuClick = (itemId: string) => {
    if (currentView === itemId || isTransitioning) return;

    // Determine scroll direction based on menu item order
    const currentIndex = currentView ? menuItems.findIndex(item => item.id === currentView) : -1;
    const newIndex = menuItems.findIndex(item => item.id === itemId);
    
    // If going forward in menu (0->1, 1->2, etc.), scroll down
    // If going backward (1->0, 2->1, etc.), scroll up
    const direction = newIndex > currentIndex ? 'down' : 'up';
    setScrollDirection(direction);

    // Start transition immediately - both animations happen simultaneously
    setPreviousView(currentView);
    setIsTransitioning(true);
    setCurrentView(itemId);
    
    // Clear transition state after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
      setPreviousView(null);
    }, 598);
  };

  const CurrentContent = currentView ? CONTENT_VIEWS[currentView as keyof typeof CONTENT_VIEWS] : null;
  const PreviousContent = previousView ? CONTENT_VIEWS[previousView as keyof typeof CONTENT_VIEWS] : null;

  return (
    <ClickSpark
      sparkColor="#E58F65"
      sparkSize={9}
      sparkRadius={18}
      sparkCount={7}
      duration={500}
    >
      <main className="min-h-screen relative overflow-y-auto">
        {/* Initial centered view */}
        <div
          className={`absolute inset-0 flex items-center justify-center p-4 transition-opacity duration-[330ms] z-30 ${
            isExpanded
              ? 'opacity-0 pointer-events-none'
              : 'opacity-100'
          }`}
        >
          <div className="flex flex-col items-start -translate-x-8 -translate-y-12">
            <button
              onClick={handleExpand}
              className="flex items-center gap-2 group mb-6 cursor-pointer bg-transparent border-none p-0"
            >
              <h1 className="text-3xl md:text-3xl lg:text-4xl font-light text-brand-text group-hover:text-brand-accent transition-colors duration-300">
                barna marczali
              </h1>
              <svg
                className="w-8 h-8 text-brand-text group-hover:text-brand-accent transition-all duration-300 translate-y-0.5 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </button>

            <nav className="flex flex-wrap gap-12 md:gap-18">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-text hover:text-brand-accent transition-colors duration-300 text-sm md:text-lg font-light"
                >
                  {social.name}
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Expanded layout */}
        <div
          className={`absolute inset-0 transition-opacity duration-[390ms] ${
            isExpanded ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          {/* Header with name */}
          <div
            className={`fixed top-8 left-8 transition-all duration-[520ms] delay-[130ms] z-20 ${
              isExpanded ? 'translate-x-0 translate-y-0 scale-100 opacity-100' : 'translate-x-[calc(50vw-2rem)] translate-y-[calc(50vh-2rem)] scale-[0.3] opacity-0'
            }`}
            style={{
              transformOrigin: 'top left',
            }}
          >
            <h1 className="text-2xl md:text-3xl font-light text-brand-text">
              barna marczali
            </h1>
          </div>

          {/* Menu items */}
          <nav
            className={`fixed top-24 left-8 flex flex-col gap-4 transition-all duration-[520ms] delay-[195ms] z-20 ${
              isExpanded ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
            }`}
          >
            {menuItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item.id)}
                className={`text-left text-lg font-light transition-colors duration-0 cursor-pointer bg-transparent border-none p-0 ${
                  currentView === item.id
                    ? 'text-brand-accent'
                    : 'text-brand-text hover:text-brand-accent'
                }`}
                style={{
                  transitionDelay: `${195 + index * 39}ms`,
                  transitionProperty: 'opacity, transform',
                }}
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Main content */}
          <div
            className={`${
              currentView === 'about' 
                ? 'w-full' 
                : 'absolute inset-0 flex items-center justify-center px-8 md:px-16 lg:px-32 pointer-events-none'
            } transition-all duration-[520ms] delay-[325ms] z-10 ${
              isExpanded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
          >
            <div className={`relative ${
              currentView === 'about' 
                ? 'w-full' 
                : 'max-w-2xl w-full h-full flex items-center justify-center page-content-wrapper'
            } text-brand-text ${currentView === 'about' ? '' : 'pointer-events-auto'}`}>
              {/* Previous content (exiting) */}
              {PreviousContent && (
                <div
                  className={`page-content-layer page-content-exit-${scrollDirection}`}
                >
                  <PreviousContent />
                </div>
              )}
              
              {/* Current content (entering) */}
              {CurrentContent && (
                <div
                  className={`page-content-current ${
                    isTransitioning || previousView
                      ? `page-content-enter-${scrollDirection}`
                      : ''
                  }`}
                >
                  <CurrentContent />
                </div>
              )}
            </div>
          </div>

          {/* Social links at bottom - fixed footer */}
          <nav
            className={`fixed bottom-8 left-0 right-0 flex justify-center gap-8 md:gap-12 transition-all duration-[520ms] delay-[260ms] z-20 ${
              isExpanded ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-[calc(-50vh+2rem)] scale-[0.3] opacity-0'
            }`}
            style={{
              transformOrigin: 'bottom center',
            }}
          >
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-text hover:text-brand-accent transition-colors duration-300 text-sm md:text-base font-light"
              >
                {social.name}
              </a>
            ))}
          </nav>
        </div>
      </main>
    </ClickSpark>
  );
}
