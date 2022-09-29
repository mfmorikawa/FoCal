import { ImageDescriptorProps } from "../vite-env";

export default function Avatar(props: ImageDescriptorProps) {
    return (
        <div className="flex -space-x-1 overflow-hidden">
          <img
            className="rounded-full w-8"
            src={props.url}
            alt={props.alt_text}
          />
        </div>
    )
  }
  