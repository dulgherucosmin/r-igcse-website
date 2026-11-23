export function FixedDigits({ value }: { value: string }) {
  const digits: { place: number; char: string }[] = [];
  let place = value.length;
  for (const char of value) {
    digits.push({ place, char });
    place -= 1;
  }

  return digits.map(({ place, char }) => (
    <span key={place} className="inline-block w-[1ch] text-center">
      {char}
    </span>
  ));
}
