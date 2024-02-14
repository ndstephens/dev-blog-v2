import Image from 'next/image';

interface ProjectImageProps {
  gradient: string;
  imgUrl: string;
  imgAlt: string;
}

export default function ProjectImage({
  gradient,
  imgUrl,
  imgAlt,
}: ProjectImageProps) {
  return (
    <div className="relative min-h-[380px] pt-[56%]">
      <div className="absolute inset-0">
        <div
          className={`${gradient} flex h-full items-center justify-center overflow-hidden rounded-2xl bg-white py-[50px] pl-6 md:py-[7%]`}
        >
          <div className="relative aspect-[16/10] h-full overflow-hidden rounded-md shadow-2xl">
            <Image
              alt={imgAlt}
              src={imgUrl}
              className="object-cover object-left-top"
              priority
              fill
              sizes="(max-width: 740px) 450px, (max-width: 940px) 65vw, 600px"
            />
          </div>
          <div className="shrink-[9999] basis-4" />
        </div>
      </div>
    </div>
  );
}
