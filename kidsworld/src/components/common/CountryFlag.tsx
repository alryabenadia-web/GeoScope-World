interface CountryFlagProps {
  countryCode: string;
  size?: number;
  className?: string;
}

export function CountryFlag({ countryCode, size = 64, className = '' }: CountryFlagProps) {
  const flagUrl = `https://flagsapi.com/${countryCode}/flat/${size}.png`;

  return (
    <img
      src={flagUrl}
      alt={`Flag of ${countryCode}`}
      className={`rounded-lg shadow-md ${className}`}
      style={{ width: `${size}px`, height: `${size}px`, objectFit: 'cover' }}
      loading="lazy"
    />
  );
}
