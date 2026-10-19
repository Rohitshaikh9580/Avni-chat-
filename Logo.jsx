export default function Logo({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <defs><linearGradient id="bf" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#7c3aed" /><stop offset=".55" stopColor="#ec4899" /><stop offset="1" stopColor="#3b82f6" />
      </linearGradient></defs>
      <path d="M32 30C26 6 4 6 6 22c1 10 12 12 26 8z" fill="url(#bf)" />
      <path d="M32 30C38 6 60 6 58 22c-1 10-12 12-26 8z" fill="url(#bf)" />
      <path d="M32 34C20 34 10 42 15 54c6 5 15-5 17-20z" fill="url(#bf)" opacity=".8" />
      <path d="M32 34c12 0 22 8 17 20-6 5-15-5-17-20z" fill="url(#bf)" opacity=".8" />
      <rect x="30.5" y="20" width="3" height="28" rx="1.5" fill="#fff" />
      <path d="M31 20c-3-6-6-8-8-8M33 20c3-6 6-8 8-8" stroke="#fff" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  )
}
export const Brand = ({ size = 32 }) => (
  <span className="brand"><Logo size={size} /><b>Avni Chat</b><Logo size={size * 0.7} /></span>
)
export function Avatar({ name, photo, online, size = 44 }) {
  const hue = [...name].reduce((a, c) => a + c.charCodeAt(0), 0) * 7 % 360
  return (
    <span className="av" style={{ width: size, height: size, fontSize: size * 0.42,
      background: photo ? `center/cover url(${photo})` : `linear-gradient(135deg,hsl(${hue} 70% 50%),hsl(${(hue + 60) % 360} 70% 40%))` }}>
      {!photo && name[0]}{online && <i className="dot" />}
    </span>
  )
}
