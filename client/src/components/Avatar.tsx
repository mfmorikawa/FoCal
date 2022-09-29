import { ImageDescriptorProps } from "../vite-env";

export default function Avatar(props: ImageDescriptorProps) {
    return (
        <div className="flex -space-x-1 overflow-hidden">
          <img
            className="inline-block h-7 w-7 rounded-full ring-2 ring-white"
            src={props.url}
            alt={props.alt_text}
          />
        </div>
    )
  }
  