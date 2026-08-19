function LemonMark() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <rect width="64" height="64" rx="14" fill="#495E57" />
      <ellipse cx="32" cy="36" rx="18" ry="16" fill="#F4CE14" />
      <ellipse cx="32" cy="36" rx="14" ry="12" fill="#E4C00A" />
      <path
        d="M32 16c4 4 6 8 6 12"
        fill="none"
        stroke="#495E57"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <ellipse cx="38" cy="14" rx="6" ry="3.5" fill="#495E57" transform="rotate(-25 38 14)" />
    </svg>
  )
}

export default function Logo({ title = 'Little Lemon' }) {
  return (
    <span className="logo">
      <LemonMark />
      <span>{title}</span>
    </span>
  )
}
