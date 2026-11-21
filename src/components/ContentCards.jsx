import { useEffect, useRef, useState } from 'react'

export function SectionHeading({ kicker, title, description, align = 'center' }) {
  const alignment = align === 'left'
    ? 'mx-0 max-w-[42rem] text-left'
    : 'mx-auto mb-10 max-w-[49rem] text-center max-[560px]:mb-8'

  return (
    <div className={alignment}>
      {kicker && (
        <p className="mb-4 text-[.63rem] font-bold uppercase leading-[1.5] tracking-[.17em] text-[#286673]">
          {kicker}
        </p>
      )}
      <h2 className="m-0 text-[clamp(2.25rem,4vw,3.5rem)] font-semibold leading-[1.1] tracking-[-.055em] text-[#0c1e2d] max-[560px]:text-[clamp(2rem,9vw,2.8rem)] [&_em]:font-display [&_em]:font-normal [&_em]:text-[#286673]">
        {title}
      </h2>
      {description && (
        <p className="mx-auto mt-4 max-w-[43rem] text-[.82rem] leading-[1.8] text-[#64716b] max-[560px]:text-[.76rem]">
          {description}
        </p>
      )}
    </div>
  )
}

export function ServiceCard({ service, index }) {
  const [isHovered, setIsHovered] = useState(false)
  const [isPinned, setIsPinned] = useState(false)
  const isFlipped = isHovered || isPinned
  const frontButtonRef = useRef(null)
  const backButtonRef = useRef(null)
  const previousPinned = useRef(isPinned)

  useEffect(() => {
    if (previousPinned.current === isPinned) return
    previousPinned.current = isPinned
    if (isPinned) {
      backButtonRef.current?.focus()
    } else {
      frontButtonRef.current?.focus()
    }
  }, [isPinned])

  return (
    <article
      className="relative min-h-[19rem] rounded-xl transition duration-200 hover:z-10 hover:-translate-y-1 hover:shadow-[0_16px_35px_rgb(12_30_45_/_9%)] max-[560px]:min-h-[18rem]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="relative min-h-[19rem] rounded-xl [transform-style:preserve-3d] transition-transform duration-700 max-[560px]:min-h-[18rem]"
        style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
      >
        <div
          className={`absolute inset-0 rounded-xl p-7 backface-hidden max-[560px]:p-5 ${service.featured ? 'bg-[#e3f1eb]' : 'bg-white'}`}
          aria-hidden={isFlipped}
          inert={isFlipped}
        >
          <div className="mb-7 flex items-center justify-between max-[560px]:mb-4">
            <span className="grid h-[2.65rem] w-[2.65rem] place-items-center rounded-lg bg-[#e9f7f0] text-xl text-[#09525e]" aria-hidden="true">
              {service.icon}
            </span>
            <span className="text-[.63rem] font-semibold tracking-[.1em] text-[#89968f]">0{index + 1}</span>
          </div>
          {service.featured && (
            <span className="absolute left-20 top-8 rounded-full bg-[#fff4d8] px-2.5 py-1 text-[.53rem] font-extrabold uppercase tracking-[.1em] text-[#826b31]">
              Most Popular
            </span>
          )}
          <h3 className="mb-3 text-base font-bold tracking-[-.02em] text-[#223343]">{service.title}</h3>
          <p className="mb-0 min-h-[4.2rem] text-[.73rem] leading-[1.8] text-[#63716a] max-[560px]:min-h-0">
            {service.description}
          </p>
          <button
            ref={frontButtonRef}
            className="absolute inset-0 z-10 cursor-pointer rounded-none text-left focus-visible:outline-2 focus-visible:outline-offset-[-6px] focus-visible:outline-[#286673]"
            type="button"
            aria-label={`Show details for ${service.title}`}
            aria-expanded={isFlipped}
            onClick={() => setIsPinned(true)}
          />
          <span className="pointer-events-none absolute bottom-7 left-7 z-20 text-[.67rem] font-bold text-[#286673] max-[560px]:bottom-5 max-[560px]:left-5">
            Explore service <span aria-hidden="true">↗</span>
          </span>
        </div>
        <div
          className="absolute inset-0 flex flex-col items-start rounded-xl bg-[#0c1e2d] p-7 backface-hidden max-[560px]:p-5"
          style={{ transform: 'rotateY(180deg)' }}
          aria-hidden={!isFlipped}
          inert={!isFlipped}
        >
          <div className="mb-5 flex w-full items-center justify-between">
            <span className="text-[.63rem] font-bold uppercase tracking-[.14em] text-[#a6d9cd]">Service details</span>
            <span className="text-[.63rem] font-semibold tracking-[.1em] text-white/55">0{index + 1}</span>
          </div>
          <h3 className="mb-3 text-base font-bold tracking-[-.02em] text-white">{service.title}</h3>
          <p className="mb-5 text-[.73rem] leading-[1.8] text-white/75">{service.detailedDescription}</p>
          <a className="relative z-20 mt-auto inline-flex items-center gap-3 text-[.67rem] font-bold text-[#a6d9cd] transition-all hover:gap-4 hover:text-white" href="#contact">
            Discuss this service <span aria-hidden="true">↗</span>
          </a>
          <button
            ref={backButtonRef}
            className="absolute inset-0 z-10 cursor-pointer rounded-none text-left focus-visible:outline-2 focus-visible:outline-offset-[-6px] focus-visible:outline-[#a6d9cd]"
            type="button"
            aria-label={`Return to ${service.title} overview`}
            aria-expanded={isFlipped}
            onClick={() => {
              setIsHovered(false)
              setIsPinned(false)
            }}
          />
        </div>
      </div>
    </article>
  )
}

export function CaseStudyCard({ study, className = '' }) {
  return (
    <article className={`min-w-0 overflow-hidden rounded-2xl bg-[#e9f7f0] shadow-sm ${className}`}>
      <div className="group relative flex justify-center overflow-hidden bg-[#e9f7f0]" aria-label={`Discuss ${study.title}`}>
        <video
          src={study.video}
          autoPlay
          loop
          muted
          controls
          playsInline
          className="block h-auto w-[50%] object-contain"
          loading="lazy"
        />
        <span className="absolute bottom-4 left-4 rounded-full bg-white/[.94] px-3 py-2 text-[.59rem] font-bold text-[#223343]">
          {study.category}
        </span>
      </div>
      {/* <div className="flex items-center justify-between gap-4 px-5 pb-2 pt-5 max-[560px]:px-4">
        <div className="grid gap-1">
          <strong className="text-[.72rem] font-extrabold tracking-[.04em] text-[#09525e]">{study.result}</strong>
          <span className="text-[.61rem] text-[#77837d]">{study.detail}</span>
        </div>
        <span className="text-right text-[.61rem] text-[#77837d]">{study.client}</span>
      </div>
      <h3 className="mx-5 mb-2 mt-1 text-[clamp(1rem,1.55vw,1.28rem)] font-bold leading-[1.35] tracking-[-.03em] text-[#223343] max-[560px]:mx-4 max-[560px]:text-[1.08rem]">
        <a className="transition-colors hover:text-[#286673]" href="#contact">{study.title}</a>
      </h3>
      <p className="mx-5 mb-0 max-w-[38rem] text-[.7rem] leading-[1.8] text-[#68746e] max-[560px]:mx-4 max-[560px]:text-[.68rem]">
        {study.description}
      </p>
      <a className="mx-5 mb-5 mt-3 inline-flex items-center gap-2 text-[.62rem] font-bold text-[#286673] transition-all hover:gap-4 max-[560px]:mx-4" href="#contact">
        {study.channel} <span aria-hidden="true">↗</span>
      </a> */}
    </article>
  )
}
