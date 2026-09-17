const inputClass =
  "w-full border-2 border-cream/20 bg-ink/40 px-4 py-2.5 text-[15px] text-cream placeholder:text-cream/35 outline-none transition-colors focus:border-pink";

export function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[13px] font-medium text-cream/80">
        {label}
        {required && <span className="text-pink"> *</span>}
      </span>
      {children}
    </label>
  );
}

export function TextInput({
  label,
  name,
  required,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
}) {
  return (
    <Field label={label} required={required}>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className={inputClass}
      />
    </Field>
  );
}

export function TextareaInput({
  label,
  name,
  required,
}: {
  label: string;
  name: string;
  required?: boolean;
}) {
  return (
    <Field label={label} required={required}>
      <textarea name={name} required={required} rows={3} className={`${inputClass} resize-y`} />
    </Field>
  );
}

export function RadioGroup({
  label,
  name,
  options,
  required,
}: {
  label: string;
  name: string;
  options: string[];
  required?: boolean;
}) {
  return (
    <Field label={label} required={required}>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <label
            key={opt}
            className="flex cursor-pointer items-center gap-2 border-2 border-cream/20 px-3 py-2 text-[13px] text-cream/80 has-checked:border-pink has-checked:text-cream"
          >
            <input type="radio" name={name} value={opt} required={required} className="accent-pink" />
            {opt}
          </label>
        ))}
      </div>
    </Field>
  );
}

export function CheckboxGroup({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: string[];
}) {
  return (
    <Field label={label}>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <label
            key={opt}
            className="flex cursor-pointer items-center gap-2 border-2 border-cream/20 px-3 py-2 text-[13px] text-cream/80 has-checked:border-pink has-checked:text-cream"
          >
            <input type="checkbox" name={name} value={opt} className="accent-pink" />
            {opt}
          </label>
        ))}
      </div>
    </Field>
  );
}

export function SelectInput({
  label,
  name,
  options,
  required,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  required?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <Field label={label} required={required}>
      <select
        name={name}
        required={required}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className={`${inputClass} appearance-none`}
      >
        {placeholder && (
          <option value="" className="bg-ink">
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-ink">
            {opt.label}
          </option>
        ))}
      </select>
    </Field>
  );
}
