import { Input } from "../../../components/ui/input";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({
  value,
  onChange,
}: SearchBarProps) {
  return (
    <Input
      type="search"
      value={value}
      onChange={(event) =>
        onChange(event.target.value)
      }
      placeholder="Search restaurants"
      aria-label="Search restaurants"
      className="h-11 border-slate-200 bg-white shadow-sm focus-visible:border-amber-500"
    />
  );
}
