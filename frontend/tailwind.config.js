/** @type {import('tailwindcss').Config} */
// 토큰 출처: docs/DESIGN.md (BMW M 시스템). 인라인 hex 금지 — 항상 이 토큰을 참조.
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Surface
        canvas: '#000000',
        'surface-soft': '#0d0d0d',
        'surface-card': '#1a1a1a',
        'surface-elevated': '#262626',
        carbon: '#2b2b2b',
        // Hairline
        hairline: '#3c3c3c',
        'hairline-strong': '#262626',
        // Text
        'on-dark': '#ffffff',
        body: '#bbbbbb',
        'body-strong': '#e6e6e6',
        muted: '#7e7e7e',
        // M tricolor (브랜드 액센트 전용 — CTA/배경 금지)
        'm-blue-light': '#0066b1',
        'm-blue-dark': '#1c69d4',
        'm-red': '#e22718',
        'electric-blue': '#0653b6',
        // Semantic
        warning: '#f4b400',
        success: '#0fa336',
        // Accent
        coral: '#FF6B6B',
        mint: '#4ECDC4',
      },
      spacing: {
        // 4px 베이스
        xxs: '4px',
        xs: '8px',
        sm: '12px',
        md: '16px',
        lg: '24px',
        xl: '40px',
        xxl: '64px',
        section: '96px',
      },
      borderRadius: {
        // 기본은 0 — full만 예외(원형 아이콘 버튼)
        DEFAULT: '0',
        none: '0',
        xs: '2px',
        sm: '4px',
        md: '6px',
        full: '9999px',
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'sans-serif',
        ],
      },
      fontSize: {
        // 디스플레이는 Inter 보정용 트래킹 -0.5px (DESIGN.md 폰트 대체 노트)
        'display-xl': ['80px', { lineHeight: '1.0', letterSpacing: '-0.5px', fontWeight: '700' }],
        'display-lg': ['56px', { lineHeight: '1.05', letterSpacing: '-0.5px', fontWeight: '700' }],
        'display-md': ['40px', { lineHeight: '1.1', letterSpacing: '-0.5px', fontWeight: '700' }],
        'display-sm': ['32px', { lineHeight: '1.15', fontWeight: '700' }],
        'title-lg': ['24px', { lineHeight: '1.3', fontWeight: '700' }],
        'title-md': ['20px', { lineHeight: '1.4', fontWeight: '400' }],
        'title-sm': ['18px', { lineHeight: '1.4', fontWeight: '400' }],
        // 대문자 라벨/버튼은 1.5px 트래킹 ("machined" 느낌)
        label: ['14px', { lineHeight: '1.3', letterSpacing: '1.5px', fontWeight: '700' }],
        button: ['14px', { lineHeight: '1.0', letterSpacing: '1.5px', fontWeight: '700' }],
        'body-md': ['16px', { lineHeight: '1.5', fontWeight: '300' }],
        'body-sm': ['14px', { lineHeight: '1.5', fontWeight: '300' }],
        caption: ['12px', { lineHeight: '1.4', letterSpacing: '0.5px', fontWeight: '400' }],
      },
    },
  },
  plugins: [],
}
