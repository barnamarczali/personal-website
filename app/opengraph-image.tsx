import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'barna marczali';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/** Matches the daytime palette in globals.css. */
const BG = '#063970';
const BG_LIFT = '#0A4A8C';
const BG_DEEP = '#041F3D';
const ACCENT = '#E58F65';
const TEXT = '#F1F1E7';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '90px',
          backgroundColor: BG,
          backgroundImage: `radial-gradient(120% 90% at 20% -10%, ${BG_LIFT} 0%, ${BG} 45%, ${BG_DEEP} 100%)`,
          color: TEXT,
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <div style={{ fontSize: 104, fontWeight: 300, letterSpacing: '-0.035em', lineHeight: 1 }}>
            barna marczali
          </div>
          <div style={{ fontSize: 72, color: ACCENT, lineHeight: 1 }}>→</div>
        </div>

        <div
          style={{ display: 'flex', marginTop: '34px', fontSize: 34, fontWeight: 300, color: 'rgba(241,241,231,0.7)' }}
        >
          building scouty, studying cs + econ at johns hopkins,
        </div>
        <div style={{ display: 'flex', fontSize: 34, fontWeight: 300, color: 'rgba(241,241,231,0.7)' }}>
          playing more guitar than i should
        </div>

        <div style={{ display: 'flex', marginTop: '64px', gap: '14px', alignItems: 'flex-end', height: '34px' }}>
          {[16, 30, 22, 34].map((height, index) => (
            <div key={index} style={{ width: '7px', height: `${height}px`, borderRadius: '4px', background: ACCENT }} />
          ))}
        </div>
      </div>
    ),
    size
  );
}
