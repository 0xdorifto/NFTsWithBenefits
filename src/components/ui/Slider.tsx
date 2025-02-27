import * as SliderPrimitive from '@radix-ui/react-slider';
import { cn } from '@/lib/utils';

interface SliderProps extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  defaultValue?: number | number[];
  value?: number | number[];
}

export function Slider({ className, defaultValue = [0], value, ...props }: SliderProps) {
  // Ensure values are always arrays
  const defaultValues = Array.isArray(defaultValue) ? defaultValue : [defaultValue];
  const values = value !== undefined ? (Array.isArray(value) ? value : [value]) : undefined;

  return (
    <SliderPrimitive.Root
      className={cn('relative flex w-full touch-none select-none items-center', className)}
      defaultValue={defaultValues}
      value={values}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-1.5 w-full grow rounded-full bg-gray-700">
        <SliderPrimitive.Range className="absolute h-full rounded-full bg-blue-500" />
      </SliderPrimitive.Track>
      {defaultValues.map((_, i) => (
        <SliderPrimitive.Thumb
          key={i}
          className="block h-4 w-4 rounded-full border border-blue-500 bg-background ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        />
      ))}
    </SliderPrimitive.Root>
  );
}
