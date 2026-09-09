interface CheckIconProps {
  size?: number
}

export const CheckIcon = ({ size = 14 }: CheckIconProps) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M3 8.4 6.2 11.6 13 5"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
