import { useState, useRef } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import {LoaderCircle, Users, CalendarDays, Clapperboard, Megaphone, Video, Camera} from 'lucide-react'
import {
  workSamples,
  stitchImages,
} from './data/content.js'
import {submitQuestion, submitRequest} from "./services/requestService.js"
import { CaseStudyCard, SectionHeading, ServiceCard } from './components/ContentCards.jsx'
import { SiteFooter, SiteHeader } from './components/SiteChrome.jsx'

const services = [
  {
    icon: <Users />,
    title: 'Influencer Marketing',
    description: 'Creator discovery, end-to-end campaign operations, authentic talent partnerships, and rigorous attribution reporting.',
    detailedDescription: 'We identify creators whose audiences and values align with your brand, manage outreach and campaign logistics, and give each partnership a clear creative brief. After launch, we track deliverables and campaign results to understand what resonated and where to focus next.',
  },
  {
    icon: <Clapperboard />,
    title: 'UGC',
    description: 'High-converting, creator-led videos and photos designed specifically for organic reach, Spark Ads, and Meta Whitelisting.',
    detailedDescription: 'We plan and produce creator-led videos and photography that make your product feel natural in a social feed. Each asset is shaped around a clear hook, relatable storytelling, and platform-specific formats, giving your team versatile content for organic posts and paid campaigns.',
    featured: true,
  },
  {
    icon: <CalendarDays />,
    title: 'Social Media Management',
    description: 'Channel strategy, content calendars, community engagement, and performance reporting across the platforms that matter most.',
    detailedDescription: 'We build an end-to-end social operating system for your brand: planning the content mix, scheduling publication, managing audience interactions, and turning performance signals into smarter creative decisions that keep your channels active and strategic.',
  },
  {
    icon: <Megaphone />,
    title: 'Social Media Marketing',
    description: 'Strategic planning, content calendars, platform curation, and community growth tailored to current algorithmic realities.',
    detailedDescription: 'We shape a channel strategy around your audience, goals, and brand voice, then turn it into a practical publishing calendar. From platform selection and content direction to community engagement, we refine the approach using performance signals so your social presence grows with purpose.',
  },
  {
    icon: <Video />,
    title: 'Content Production',
    description: 'Bespoke studio product photography, on-location lifestyle shoots, high-fashion short films, and multi-format campaign assets.',
    detailedDescription: 'We bring campaigns to life with considered production, from studio product photography to on-location lifestyle shoots and short-form film. Our team coordinates the creative direction, shoot details, and final formats so the finished assets feel cohesive across your channels.',
  },
  {
    icon: <Camera />,
    title: 'Brand Shoots',
    description: 'Editorial product, founder, and lifestyle imagery designed to give your brand a premium, recognizable visual identity.',
    detailedDescription: 'We direct elevated brand shoots that balance polish with personality, capturing product details, founder stories, and aspirational lifestyle moments in a cohesive visual language. The resulting imagery is built to support campaigns, paid creative, website content, and social storytelling without losing authenticity.',
  },
]
const questions = [
  ['What does a typical UGC package include?', 'A typical sprint includes a tailored creative brief, creator-led video and photo assets, a range of hook variations, and platform-ready files. Scope and usage are agreed together before production begins.'],
  ['How do you find the right creators?', 'We match creators to your audience, values, and visual direction, then review their content and audience fit before making an introduction.'],
  ['How long does a project take?', 'Timing depends on the scope, product shipping, and approvals. We set a clear schedule at kickoff and keep you updated at every milestone.'],
  ['Who owns the final content?', 'Usage, licensing, and ownership are agreed in writing for each project so your team knows exactly how and where the content can be used.'],
  ['Can we work together on an ongoing basis?', 'Yes. We offer ongoing creative and creator partnerships, with regular planning and fresh iterations shaped by what your audience responds to.'],
]

function HomePage() {
  const [formMessage, setFormMessage] = useState('')
  const [sendingEmail, setSendingEmail] = useState(false)
  const [questionMessage, setQuestionMessage] = useState('')
  const [questionError, setQuestionError] = useState(false)
  const [sendingQuestion, setSendingQuestion] = useState(false)
  const nameRef = useRef();
  const emailRef = useRef();
  const brandRef = useRef();
  const serviceRef = useRef();
  const budgetRef = useRef();
  const projectDetailsRef = useRef();
  const questionEmailRef = useRef();
  const questionRef = useRef();

  async function handleInquirySubmit(event) {
    event.preventDefault()
    setSendingEmail(true)
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const brand = brandRef.current.value;
    const service = serviceRef.current.value;
    const budget = budgetRef.current.value;
    const projectDetails = projectDetailsRef.current.value;
    try {
      const res = await submitRequest({name, email, brand, service, budget, projectDetails})
      setFormMessage(
        'Request Received! Our team will reach out to you shortly.',
      )
    } catch (error) {
      console.error('Error submitting inquiry:', error)
      setFormMessage('Failed to submit inquiry. Please try again.')
    }
    setSendingEmail(false)
  }

  async function handleQuestionSubmit(event) {
    event.preventDefault()
    const form = event.currentTarget
    setSendingQuestion(true)
    setQuestionMessage('')
    setQuestionError(false)
    const email = questionEmailRef.current.value
    const question = questionRef.current.value
    try {
      await submitQuestion({email, question})
      setQuestionMessage('Your question has been sent. We’ll get back to you soon.')
      form.reset()
    } catch (error) {
      console.error('Error submitting question:', error)
      setQuestionMessage('We couldn’t send your question. Please try again.')
      setQuestionError(true)
    } finally {
      setSendingQuestion(false)
    }
  }

  return (
    <div className="min-w-[320px] bg-[#eefdf6] font-sans text-[#121e1a] antialiased selection:bg-[#b0ecfb] selection:text-[#001f25] [&_*:focus-visible]:outline-2 [&_*:focus-visible]:outline-offset-[3px] [&_*:focus-visible]:outline-[#286673] [&_*]:motion-reduce:animate-none [&_*]:motion-reduce:transition-none">
      <SiteHeader />
      <main className="pt-20 max-[800px]:pt-[4.5rem]">
        <section
          className="relative isolate scroll-mt-20 overflow-hidden bg-[linear-gradient(180deg,#f7faf8_0%,#f3f6f4_54%,#eefdf6_100%)] px-6 py-14 max-[800px]:py-16 max-[560px]:px-4 max-[560px]:py-14"
          id="home"
        >
          <div className="pointer-events-none absolute -left-32 top-1/4 h-80 w-80 rounded-full bg-[#bdcbc5]/[.35] blur-3xl" />
          <div className="pointer-events-none absolute -right-32 top-1/4 h-80 w-80 rounded-full bg-[#b69a50]/[.16] blur-3xl" />
          <div className="pointer-events-none absolute left-1/2 top-[-8rem] h-[31rem] w-[44rem] -translate-x-1/2 rounded-full bg-[#b0ecfb]/[.24] blur-3xl" />

          <div className="pointer-events-none absolute left-5 top-1/2 z-10 hidden -translate-y-1/2 flex-col gap-7 xl:flex 2xl:left-12">
            <div className="pointer-events-auto w-52 -rotate-6 rounded-xl bg-white p-3 shadow-xl transition-transform duration-300 hover:rotate-0">
              <img src={stitchImages.unboxing} alt="Creator filming a beauty unboxing" className="mb-2 h-32 w-full rounded-lg object-cover" />
              <div className="flex items-center justify-between px-1 text-[.62rem] text-[#63716a]">
                <span>Creator stories</span><strong className="text-[#09525e]">450+</strong>
              </div>
            </div>
            <div className="pointer-events-auto flex w-56 translate-x-4 rotate-2 items-center gap-3 rounded-xl border border-[#c4c6cc]/20 bg-white/95 px-4 py-3 shadow-lg backdrop-blur-md">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#b0ecfb]/50 text-[#286673]" aria-hidden="true">↗</span>
              <span className="grid gap-1"><strong className="text-[.72rem] text-[#223343]">Creative that connects</strong><small className="text-[.6rem] text-[#77837d]">Built for real people</small></span>
            </div>
            <span className="pointer-events-auto w-max -rotate-3 translate-x-2 rounded-full bg-[#09525e] px-4 py-2 text-[.59rem] font-bold uppercase tracking-[.14em] text-white">Made to connect</span>
          </div>

          <div className="pointer-events-none absolute right-5 top-1/2 z-10 hidden -translate-y-1/2 flex-col items-end gap-7 xl:flex 2xl:right-12">
            <span className="pointer-events-auto -translate-x-4 rotate-3 rounded-full bg-[#e2c375] px-4 py-2 text-[.59rem] font-bold uppercase tracking-[.14em] text-[#223343]">Intentional craft</span>
            <div className="pointer-events-auto w-52 rotate-6 rounded-xl bg-white p-3 shadow-xl transition-transform duration-300 hover:rotate-0">
              <img src={stitchImages.skincare} alt="Skincare product in natural light" className="mb-2 h-32 w-full rounded-lg object-cover" />
              <div className="flex items-center justify-between px-1 text-[.62rem] text-[#63716a]">
                <span>Average reach</span><strong className="text-[#09525e]">240K+</strong>
              </div>
            </div>
            <div className="pointer-events-auto flex w-56 -translate-x-2 -rotate-2 items-center gap-3 rounded-xl border border-[#c4c6cc]/20 bg-white/95 px-4 py-3 shadow-lg backdrop-blur-md">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#bdcbc5]/50 text-[#223343]" aria-hidden="true">✳</span>
              <span className="grid gap-1"><strong className="text-[.72rem] text-[#223343]">Performance minded</strong><small className="text-[.6rem] text-[#77837d]">Story meets strategy</small></span>
            </div>
          </div>

          <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-0 text-center">
            <h1 className="m-0 max-w-[57rem] text-[clamp(3.2rem,7vw,6.6rem)] font-bold leading-[.99] tracking-[-.065em] text-[#0c1e2d] max-[800px]:text-[clamp(3rem,10vw,5rem)] max-[560px]:text-[clamp(2.8rem,13vw,4.2rem)]">
              Make your brand{' '}
              <span className="inline-block bg-[#d8e6df] px-[.13em] pb-[.04em]">impossible</span>{' '}
              to scroll <em className="font-display font-normal tracking-[-.05em] text-[#286673]">past.</em>
            </h1>
            <p className="mt-5 font-display text-[clamp(1.15rem,2.1vw,1.55rem)] italic leading-relaxed text-[#286673]">
              “Intentional craft, thumb-stopping speed.”
            </p>
            <p className="mt-4 max-w-[43rem] text-[clamp(.92rem,1.35vw,1.1rem)] leading-[1.8] text-[#43474c]">
              We turn creative ideas into content that connects, communities that engage, and campaigns that move brands forward.
            </p>
            <p className="mt-2 max-w-[38rem] text-[.76rem] leading-[1.7] text-[#74777c]">
              Performance-driven creator partnerships and social creative made to feel human.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <a className="inline-flex min-h-12 items-center gap-3 rounded-lg bg-[#223343] px-6 py-3 text-[.76rem] font-bold text-white shadow-[0_4px_20px_rgb(12_30_45_/_12%)] transition hover:-translate-y-0.5 hover:bg-[#09525e]" href="#contact">
                Let&apos;s Grow Together <span aria-hidden="true">↗</span>
              </a>
              <a className="inline-flex min-h-12 items-center gap-3 rounded-lg bg-[#e3f1eb] px-6 py-3 text-[.76rem] font-bold text-[#223343] transition hover:-translate-y-0.5 hover:bg-[#d8e6df]" href="#work">
                Explore Our Work <span aria-hidden="true">↗</span>
              </a>
            </div>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3 text-[.68rem] text-[#63716a]">
              <span className="flex -space-x-2" aria-hidden="true">
                {['CL', 'MR', 'EK', 'SL'].map((initials, index) => (
                  <span className={`grid h-8 w-8 place-items-center rounded-full border-2 border-[#f7faf8] text-[.52rem] font-bold text-[#223343] ${['bg-[#e2c375]', 'bg-[#bdcbc5]', 'bg-[#d8e6df]', 'bg-[#b0ecfb]'][index]}`} key={initials}>{initials}</span>
                ))}
              </span>
              <span>Trusted by ambitious brands and creators</span>
              <span className="hidden text-[#b69a50] sm:inline" aria-hidden="true">✳</span>
              <span className="font-display text-sm italic text-[#286673]">4.8 / 5 partner rating</span>
            </div>
            <div className="mt-10 grid w-full grid-cols-3 gap-3 border-t border-[#c4c6cc]/35 pt-6 xl:hidden max-[560px]:gap-2 max-[560px]:pt-5">
              {[['240K+', 'average reel reach'], ['4.8×', 'average paid ROAS'], ['450+', 'active creators']].map(([value, label]) => (
                <div className="rounded-lg border border-[#c4c6cc]/25 bg-white/70 px-2 py-3" key={label}>
                  <strong className="block text-lg tracking-[-.04em] text-[#0c1e2d] max-[560px]:text-base">{value}</strong>
                  <span className="mt-1 block text-[.55rem] text-[#74777c] max-[560px]:text-[.5rem]">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-[#c4c6cc]/20 bg-[#e9f7f0] py-9 max-[560px]:py-7" aria-label="Trusted by consumer brands">
          <div className="mx-auto flex w-full max-w-7xl items-center gap-10 px-6 lg:px-12 max-[800px]:flex-col max-[800px]:items-start max-[800px]:gap-5 max-[560px]:px-4">
            <p className="m-0 max-w-56 shrink-0 text-[.65rem] leading-[1.6] text-[#63716a] max-[800px]:max-w-none">
              Trusted by 80+ ambitious consumer brands &amp; 450+ verified creators
            </p>
            <div className="w-full overflow-hidden" role="group" aria-label="Featured brands">
              <div className="brand-marquee flex w-max">
                {[0, 1].map((copy) => (
                  <div className="flex shrink-0 items-center gap-16 pr-16 text-[#223343] max-[560px]:gap-9 max-[560px]:pr-9" key={copy} aria-hidden={copy === 1}>
                    <span className="text-[.62rem] font-semibold uppercase tracking-[.14em] text-[#75837b] max-[560px]:text-[.55rem]">Lifestyle |</span>
                    <img src="/images/mamaearth.png" alt="mamaearth" className="h-4 w-auto object-contain max-[560px]:h-4" />
                    <span className="text-[.62rem] font-semibold uppercase tracking-[.14em] text-[#75837b] max-[560px]:text-[.55rem]">Skin Care |</span>
                    <img src="/images/ponds.png" alt="Ponds" className="h-5 w-auto object-contain max-[560px]:h-5" />
                    <span className="font-display text-xl italic max-[560px]:text-base">Hola Hoop</span>
                    <span className="text-[.62rem] font-semibold uppercase tracking-[.14em] text-[#75837b] max-[560px]:text-[.55rem]">Protein |</span>
                    <img src="/images/muscle blaze.png" alt="Muscle Blaze" className="h-6 w-auto object-contain max-[560px]:h-6" />
                    <span className="text-[.78rem] font-extrabold tracking-[.16em] max-[560px]:text-[.65rem]">Maiva</span>
                    <img src="/images/goodbug.png" alt="Goodbug" className="h-6 w-auto object-contain max-[560px]:h-6" />
                    <img src="/images/oziva.png" alt="Oziva" className="h-6 w-auto object-contain max-[560px]:h-6" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="scroll-mt-[5.5rem] bg-[#eefdf6] px-6 py-24 max-[560px]:px-4 max-[560px]:py-16" id="services">
          <div className="mx-auto w-full max-w-7xl">
            <div className="mb-12 flex items-end justify-between gap-8 max-[800px]:mb-9 max-[800px]:flex-col max-[800px]:items-start max-[800px]:gap-3">
              <SectionHeading kicker="Capabilities" title={<>Good content. Bigger <em>impact.</em></>} align="left" />
              <p className="mb-10 max-w-[34rem] text-[.82rem] leading-[1.8] text-[#63716a] max-[800px]:mb-0">
                We bring strategic clarity and native social storytelling together—so every idea can earn attention and make a difference.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-5 max-[800px]:grid-cols-2 max-[560px]:grid-cols-1">
              {services.map((service, index) => (
                <ServiceCard key={service.title} service={service} index={index} />
              ))}
            </div>
          </div>
        </section>

        <section className="scroll-mt-[5.5rem] bg-[#e9f7f0] px-6 py-24 max-[560px]:px-4 max-[560px]:py-16" id="work">
          <div className="mx-auto w-full max-w-7xl">
            <div className="mb-10 flex items-end justify-between gap-6 max-[560px]:flex-col max-[560px]:items-start max-[560px]:gap-4">
              <SectionHeading kicker="Selected cases" title={<>Work that speaks<br className="max-[560px]:hidden" /> for itself.</>} align="left" />
              <a className="mb-10 inline-flex min-h-11 items-center gap-3 rounded-lg bg-[#223343] px-5 py-3 text-[.7rem] font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#09525e] max-[560px]:mb-0" href="#contact">
                Discuss a project <span aria-hidden="true">↗</span>
              </a>
            </div>
            <p className="mb-10 max-w-[34rem] text-[.82rem] leading-[1.8] text-[#63716a] max-[800px]:mb-0">
                Scroll-stopping creativity. Impact that goes beyond the feed. See our work with ambitious brands and creators, and the results that followed.
              </p>
            <div className="grid grid-cols-12 gap-5 max-[800px]:grid-cols-2 max-[560px]:grid-cols-1">
              {workSamples.map((study, index) => (
                <CaseStudyCard
                  key={study.title}
                  study={study}
                  className='col-span-4 max-[800px]:col-span-1'
                />
              ))}
            </div>
          </div>
        </section>

        {/* <section className="scroll-mt-[5.5rem] bg-[#eefdf6] px-6 py-24 max-[560px]:px-4 max-[560px]:py-16" id="about">
          <div className="mx-auto grid w-full max-w-7xl grid-cols-12 items-center gap-8 max-[800px]:grid-cols-1 max-[800px]:gap-10">
            <div className="relative col-span-5 min-h-[31rem] max-[800px]:col-span-1 max-[560px]:min-h-[23rem]">
              <div className="absolute inset-[3%_9%_9%_3%] rotate-[-4deg] rounded-2xl bg-[#d8e6df]" />
              <img src={stitchImages.studio} alt="Studio desk with mood boards, magazine cutouts, and color swatches" className="absolute inset-0 h-full w-[91%] rounded-2xl object-cover shadow-[0_20px_50px_rgb(12_30_45_/_12%)]" loading="lazy" />
              <span className="absolute -bottom-2 right-0 rotate-2 rounded-lg bg-white px-4 py-3 font-display text-sm italic text-[#34483f] shadow-lg max-[560px]:right-[-.25rem]">
                The atelier, in motion <span className="ml-2 text-[#b69a50]" aria-hidden="true">✳</span>
              </span>
              <div className="absolute -left-2 top-8 rounded-lg bg-[#223343] px-4 py-3 text-[.6rem] font-bold leading-[1.6] tracking-[.1em] text-white">
                EST. 2021<br /><span className="text-[.5rem] text-[#bdcbc5]">PARIS &amp; NEW YORK</span>
              </div>
            </div>
            <div className="col-span-7 pl-8 max-[800px]:col-span-1 max-[800px]:pl-0">
              <SectionHeading kicker="The atelier manifesto" title={<>We believe good marketing feels <em>human.</em></>} align="left" />
              <p className="mt-5 max-w-[46rem] text-[.87rem] leading-[1.9] text-[#43474c]">
                In a world of crowded feeds and predictable formulas, people respond to work that feels thoughtful, honest, and unmistakably human.
              </p>
              <p className="mb-7 mt-3 max-w-[43rem] text-[.77rem] leading-[1.8] text-[#74777c]">
                We work at the meeting point of cultural instinct and measurable progress.
              </p>
              <div className="border-t border-[#c4c6cc]/50">
                {principles.map(([number, title, description]) => (
                  <article className="grid grid-cols-[2.4rem_1fr] gap-4 border-b border-[#c4c6cc]/50 py-4 max-[560px]:grid-cols-[1.8rem_1fr]" key={number}>
                    <span className="pt-0.5 font-display text-lg text-[#286673]">{number}</span>
                    <div>
                      <h3 className="m-0 text-[.79rem] font-bold text-[#223343]">{title}</h3>
                      <p className="mb-0 mt-1 text-[.7rem] leading-[1.7] text-[#68746e]">{description}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section> */}

        {/* <section className="scroll-mt-[5.5rem] bg-[#e9f7f0] px-6 py-24 max-[560px]:px-4 max-[560px]:py-16" id="process">
          <div className="mx-auto w-full max-w-7xl">
            <div className="mx-auto mb-12 max-w-2xl text-center max-[560px]:mb-9">
              <SectionHeading kicker="Our methodology" title={<>A seamless path to <em>scale.</em></>} description="A clear, collaborative process makes room for great ideas—and gives them the structure to deliver." />
            </div>
            <div className="grid grid-cols-4 gap-5 max-[800px]:grid-cols-2 max-[560px]:grid-cols-1">
              {processSteps.map(([number, title, description, timing]) => (
                <article className="flex min-h-[17rem] flex-col justify-between rounded-xl bg-white p-6 shadow-sm transition-transform hover:-translate-y-1 max-[800px]:min-h-[15rem] max-[560px]:min-h-0 max-[560px]:p-5" key={number}>
                  <div>
                    <span className="font-display text-3xl text-[#286673]">{number}</span>
                    <div className="my-5 h-px bg-[#d8e6df] max-[560px]:my-4" />
                    <h3 className="m-0 text-base font-bold text-[#223343]">{title}</h3>
                    <p className="mb-5 mt-3 text-[.7rem] leading-[1.8] text-[#69756f]">{description}</p>
                  </div>
                  <span className="inline-flex w-max rounded-full bg-[#e9f7f0] px-3 py-1.5 text-[.57rem] font-bold text-[#286673]">{timing}</span>
                </article>
              ))}
            </div>
          </div>
        </section> */}

        <section className="relative scroll-mt-[5.5rem] overflow-hidden bg-[#09525e] px-6 py-24 text-white max-[560px]:px-4 max-[560px]:py-16" id="creators">
          <div className="pointer-events-none absolute -bottom-24 -right-20 h-96 w-96 rounded-full bg-[#b69a50]/20 blur-3xl" />
          <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-12 items-center gap-10 max-[800px]:grid-cols-1 max-[800px]:gap-8">
            <div className="col-span-7 max-[800px]:col-span-1">
              <p className="mb-4 text-[.64rem] font-bold uppercase tracking-[.17em] text-[#b0ecfb]">For Brands</p>
              <h2 className="m-0 max-w-[42rem] text-[clamp(2.3rem,4.5vw,4.2rem)] font-semibold leading-[1.08] tracking-[-.055em] text-white max-[560px]:text-[clamp(2rem,9vw,2.8rem)]">
                Your brand deserves the <em className="font-display font-normal text-[#b0ecfb]">right creative partners.</em>
              </h2>
              <p className="mb-7 mt-5 max-w-[39rem] text-[.83rem] leading-[1.9] text-white/75">
                We connect ambitious brands with influential voices, creative storytellers, and content creators who turn attention into meaningful engagement.
              </p>
              <div className="mb-8 grid grid-cols-3 gap-4 max-[560px]:grid-cols-1 max-[560px]:gap-3">
                {[
                  ['✧', 'Curated Creators', 'Find influencers who genuinely align with your brand.'],
                  ['◈', 'Authentic Campaigns', 'Build meaningful collaborations that audiences connect with.'],
                  ['↗', 'Measurable Impact', 'Turn creator partnerships into measurable brand growth.Build partnerships that grow with you.'],
                ].map(([icon, title, description]) => (
                  <article className="rounded-lg border border-white/15 bg-white/[.07] p-4" key={title}>
                    <span className="text-lg text-[#e2c375]" aria-hidden="true">{icon}</span>
                    <h3 className="mb-1 mt-2 text-[.7rem] font-bold text-white">{title}</h3>
                    <p className="m-0 text-[.62rem] leading-[1.7] text-white/65">{description}</p>
                  </article>
                ))}
              </div>
              <a className="inline-flex min-h-12 items-center gap-3 rounded-lg bg-white px-5 py-3 text-[.72rem] font-bold text-[#09525e] transition hover:-translate-y-0.5 hover:bg-[#e9f7f0]" href="#contact">
                Let's grow your brand <span aria-hidden="true">↗</span>
              </a>
            </div>
            <div className="col-span-5 rounded-2xl border border-white/15 bg-white/[.08] p-6 shadow-[0_22px_55px_rgb(0_0_0_/_10%)] backdrop-blur-sm max-[800px]:col-span-1 max-[560px]:p-4">
              <div className="flex items-center justify-between border-b border-white/15 pb-4 text-[.7rem] font-bold uppercase tracking-[.08em]">
                <span>Creator roster</span>
                <span className="inline-flex items-center gap-2 text-[.57rem] font-medium normal-case tracking-normal text-white/70"><i className="h-1.5 w-1.5 rounded-full bg-[#b0ec99]" /> Curated talent</span>
              </div>
              {[
                ['SB', 'Shreya Bharadwaj', 'Beauty & minimalist living', '240k', 'bg-[#e7d4c0]'],
                ['Y', 'Yash', 'Editorial streetwear & POV', '410k', 'bg-[#d7e3de]'],
                ['AB', 'Anshika Bhatnagar', 'Wellness & clean nutrition', '185k', 'bg-[#eee3c5]'],
              ].map(([initials, name, category, followers, color]) => (
                <div className="grid grid-cols-[2.7rem_1fr_auto] items-center gap-3 border-b border-white/10 py-4 max-[560px]:grid-cols-[2.4rem_1fr_auto] max-[560px]:gap-2" key={initials}>
                  <span className={`grid h-10 w-10 place-items-center rounded-full font-display text-[.82rem] text-[#223343] max-[560px]:h-9 max-[560px]:w-9 ${color}`}>{initials}</span>
                  <span className="grid gap-1"><strong className="text-[.7rem] text-white">{name}</strong><small className="text-[.58rem] text-white/65 max-[560px]:text-[.53rem]">{category}</small></span>
                  <b className="grid gap-1 text-right text-[.68rem] text-[#b0ecfb]">{followers}<small className="text-[.58rem] font-medium text-white/60">Active</small></b>
                </div>
              ))}
              <blockquote className="mb-0 mt-5 font-display text-base italic leading-relaxed text-white/85">
                “CreatorLens treats creators like true artistic partners.”
              </blockquote>
            </div>
          </div>
        </section>

        <section className="scroll-mt-[5.5rem] bg-[#e9f7f0] px-6 py-24 max-[560px]:px-4 max-[560px]:py-16" id="contact">
          <div className="mx-auto grid w-full max-w-7xl grid-cols-12 gap-8 max-[800px]:grid-cols-1 max-[800px]:gap-8">
            <div className="col-span-5 flex flex-col justify-between max-[800px]:col-span-1">
              <div>
                <p className="mb-4 text-[.63rem] font-bold uppercase tracking-[.17em] text-[#286673]">Start a conversation</p>
                <h2 className="m-0 text-[clamp(2.4rem,4.5vw,4rem)] font-semibold leading-[1.08] tracking-[-.055em] text-[#0c1e2d] max-[560px]:text-[clamp(2rem,9vw,2.8rem)]">
                  Let&apos;s make something people <em className="font-display font-normal text-[#286673]">remember.</em>
                </h2>
                <p className="mb-7 mt-4 max-w-[31rem] text-[.78rem] leading-[1.8] text-[#65716b]">
                  Tell us about your brand goals. We&apos;ll get back to you with thoughtful next steps and ideas tailored to your project.
                </p>
              </div>
              <div>
                <a className="flex items-center gap-4 text-inherit no-underline hover:[&>span:last-child>strong]:text-[#286673]" href="mailto:admin@creatorlensstudio.com">
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-white text-lg text-[#286673]" aria-hidden="true">✉</span>
                  <span className="grid gap-1"><small className="text-[.58rem] text-[#859089]">Email</small><strong className="text-[.69rem] text-[#223343]">admin@creatorlensstudio.com</strong></span>
                </a>
                <p className="mt-8 font-display text-lg italic text-[#617068]">“A bespoke partnership from the very first conversation.”</p>
              </div>
            </div>

            <form className="col-span-7 rounded-2xl bg-white p-8 shadow-md max-[800px]:col-span-1 max-[560px]:p-5" onSubmit={handleInquirySubmit}>
              <div className="grid grid-cols-2 gap-x-4 gap-y-4 max-[560px]:grid-cols-1">
                <label className="grid gap-2 text-[.61rem] font-bold text-[#34443f]">
                  Full name<input ref={nameRef} className="min-h-11 w-full rounded-lg border border-[#d5ded8] bg-white px-3 py-2 text-[.68rem] font-normal text-[#223343] outline-none transition placeholder:text-[#9aa49e] focus:border-[#286673] focus:ring-[3px] focus:ring-[#286673]/10" name="name" autoComplete="name" placeholder="Your name" required />
                </label>
                <label className="grid gap-2 text-[.61rem] font-bold text-[#34443f]">
                  Work email<input ref={emailRef} className="min-h-11 w-full rounded-lg border border-[#d5ded8] bg-white px-3 py-2 text-[.68rem] font-normal text-[#223343] outline-none transition placeholder:text-[#9aa49e] focus:border-[#286673] focus:ring-[3px] focus:ring-[#286673]/10" name="email" type="email" autoComplete="email" placeholder="you@brand.com" required />
                </label>
                <label className="col-span-full grid gap-2 text-[.61rem] font-bold text-[#34443f] max-[560px]:col-span-1">
                  Brand or company<input ref={brandRef} className="min-h-11 w-full rounded-lg border border-[#d5ded8] bg-white px-3 py-2 text-[.68rem] font-normal text-[#223343] outline-none transition placeholder:text-[#9aa49e] focus:border-[#286673] focus:ring-[3px] focus:ring-[#286673]/10" name="company" autoComplete="organization" placeholder="Your brand" required />
                </label>
                <label className="grid gap-2 text-[.61rem] font-bold text-[#34443f]">
                  Service of interest
                  <select ref={serviceRef} className="min-h-11 w-full rounded-lg border border-[#d5ded8] bg-white px-3 py-2 text-[.68rem] font-normal text-[#223343] outline-none transition invalid:text-[#9aa49e] focus:border-[#286673] focus:ring-[3px] focus:ring-[#286673]/10" name="service" defaultValue="" required>
                    <option value="" disabled>Select a service</option>
                    <option>Influencer Marketing</option>
                    <option>UGC Creation</option>
                    <option>Social Media Management</option>
                    <option>Social Media Marketing</option>
                    <option>Content Production</option>
                    <option>Brand Shoots</option>
                  </select>
                </label>
                <label className="grid gap-2 text-[.61rem] font-bold text-[#34443f]">
                  Monthly growth budget
                  <select ref={budgetRef} className="min-h-11 w-full rounded-lg border border-[#d5ded8] bg-white px-3 py-2 text-[.68rem] font-normal text-[#223343] outline-none transition invalid:text-[#9aa49e] focus:border-[#286673] focus:ring-[3px] focus:ring-[#286673]/10" name="budget" defaultValue="" required>
                    <option value="" disabled>Select a range</option>
                    <option value="$5k – $10k">$5k – $10k</option>
                    <option value="$10k – $25k">$10k – $25k</option>
                    <option value="$25k – $50k">$25k – $50k</option>
                    <option value="$50k+">$50k+</option>
                  </select>
                  {/* <input type="number" name="budget_custom" className="mt-2 min-h-11 w-full rounded-lg border border-[#d5ded8] bg-white px-3 py-2 text-[.68rem] font-normal text-[#223343] outline-none transition placeholder:text-[#9aa49e] focus:border-[#286673] focus:ring-[3px] focus:ring-[#286673]/10" placeholder="Or enter a custom amount" /> */}
                </label>
                <label className="col-span-full grid gap-2 text-[.61rem] font-bold text-[#34443f] max-[560px]:col-span-1">
                  Project details &amp; targets<textarea ref={projectDetailsRef} className="min-h-24 w-full resize-y rounded-lg border border-[#d5ded8] bg-white px-3 py-2 text-[.68rem] font-normal text-[#223343] outline-none transition placeholder:text-[#9aa49e] focus:border-[#286673] focus:ring-[3px] focus:ring-[#286673]/10" name="details" rows="4" placeholder="Tell us what you’re looking to make…" required />
                </label>
              </div>
              <button className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-lg bg-[#223343] px-5 py-3 text-[.75rem] font-bold text-white transition hover:bg-[#09525e]" type="submit" disabled={sendingEmail}>
                {sendingEmail ? (
                  <>
                    Sending... <LoaderCircle className="animate-spin" size={24} />
                  </>
                ) : (
                  'Send Service Request'
                )}
                <span aria-hidden="true">↗</span>
              </button>
              <p className="mt-3 text-center text-[.56rem] text-[#86918b]">Strict confidentiality assured. NDA provided upon request.</p>
              {formMessage && <p className="mt-4 rounded-lg border border-[#b7cfc0] bg-[#eef7f0] p-3 text-[.66rem] leading-relaxed text-[#244c34]" role="status">{formMessage}</p>}
            </form>
          </div>
        </section>

        <section className="bg-[#eefdf6] px-6 py-24 max-[560px]:px-4 max-[560px]:py-16" aria-label="Partner testimonials">
          <div className="mx-auto w-full max-w-7xl">
            <div className="mx-auto mb-10 max-w-2xl text-center">
              <SectionHeading kicker="Kind words" title={<>Words from partners<br className="max-[560px]:hidden" /> we champion.</>} />
            </div>
            <div className="mb-5 overflow-hidden rounded-2xl bg-[#e9f7f0] p-8 shadow-sm md:p-12">
              <div className="relative z-10 max-w-4xl">
                <span className="font-display text-6xl leading-none text-[#b69a50]" aria-hidden="true">“</span>
                <div className="mt-1 text-sm tracking-[.18em] text-[#b69a50]" aria-label="5 out of 5 stars">★★★★★</div>
                <blockquote className="mx-0 my-4 font-display text-[clamp(1.45rem,3vw,2.35rem)] leading-[1.4] text-[#223343] max-[560px]:text-[1.3rem]">
                  CreatorLens Studio transformed how our brand connects with our audience. Authentic, effortlessly creative, and mathematically sound.
                </blockquote>
                <div className="flex items-center gap-3">
                  <img src={stitchImages.founder} alt="Helena Rostova, founder and CMO" className="h-11 w-11 rounded-full object-cover" loading="lazy" />
                  <span className="grid gap-1"><strong className="text-[.7rem] text-[#223343]">Priyanshi</strong></span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-5 max-[560px]:grid-cols-1">
              {[
                ['“The team understood our world from day one. The work felt like us, only sharper.”', 'Maya Sharma', 'Brand Director'],
                ['“A genuinely collaborative partner—and a creative process we look forward to.”', 'Dinesh Chauhan', 'Marketing Lead'],
              ].map(([quote, name, role]) => (
                <blockquote className="m-0 rounded-xl bg-white p-6 shadow-sm" key={name}>
                  <span className="text-[.7rem] tracking-[.12em] text-[#b69a50]" aria-label="5 out of 5 stars">★★★★★</span>
                  <p className="mb-5 mt-3 font-display text-lg italic leading-[1.6] text-[#34443f]">{quote}</p>
                  <footer className="text-[.62rem] text-[#74777c]"><strong className="text-[#223343]">{name}</strong><span> · {role}</span></footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        {/* <section className="scroll-mt-[5.5rem] bg-[#e9f7f0] px-6 py-24 max-[560px]:px-4 max-[560px]:py-16" id="insights">
          <div className="mx-auto w-full max-w-7xl">
            <div className="mb-10 flex items-end justify-between gap-6 max-[560px]:flex-col max-[560px]:items-start max-[560px]:gap-3">
              <SectionHeading kicker="The journal" title={<>Ideas worth <em>sharing.</em></>} align="left" />
              <p className="mb-10 max-w-[26rem] text-[.75rem] leading-[1.8] text-[#74777c] max-[560px]:mb-0">Notes on creator culture, content, and the details that make a brand memorable.</p>
            </div>
            <div className="grid grid-cols-3 gap-5 max-[800px]:grid-cols-2 max-[560px]:grid-cols-1">
              {insights.map((article) => (
                <article className="overflow-hidden rounded-xl bg-white shadow-sm" key={article.title}>
                  <a className="group relative block aspect-[1.35] overflow-hidden bg-[#dce7df]" href="#contact" aria-label={`Discuss ${article.title}`}>
                    <img src={article.image} alt={article.imageAlt} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.045]" loading="lazy" />
                    <span className="absolute bottom-3 right-3 grid h-9 w-9 place-items-center rounded-full bg-white text-[#223343] transition group-hover:rotate-45 group-hover:bg-[#223343] group-hover:text-white" aria-hidden="true">↗</span>
                  </a>
                  <div className="p-5">
                    <p className="mb-2 text-[.58rem] font-extrabold uppercase tracking-[.14em] text-[#286673]">{article.category}</p>
                    <h3 className="m-0 text-[.95rem] font-bold leading-[1.45] tracking-[-.025em] text-[#223343]">
                      <a className="transition-colors hover:text-[#286673]" href="#contact">{article.title}</a>
                    </h3>
                    <p className="mb-3 mt-2 text-[.68rem] leading-[1.8] text-[#68746e]">{article.description}</p>
                    <span className="text-[.57rem] text-[#859089]">{article.readTime} min read</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section> */}

        <section className="scroll-mt-[5.5rem] bg-[#e9f7f0] px-6 py-24 max-[560px]:px-4 max-[560px]:py-16" id="faq">
          <div className="mx-auto grid w-full max-w-4xl grid-cols-12 gap-10 max-[800px]:grid-cols-1 max-[800px]:gap-8">
            <div className="col-span-4 max-[800px]:col-span-1">
              <p className="mb-4 text-[.63rem] font-bold uppercase tracking-[.17em] text-[#286673]">Common inquiries</p>
              <h2 className="m-0 text-[clamp(2rem,3.8vw,3rem)] font-semibold leading-[1.1] tracking-[-.05em] text-[#0c1e2d] max-[560px]:text-[clamp(2rem,9vw,2.8rem)]">
                Frequently asked <em className="font-display font-normal text-[#286673]">questions.</em>
              </h2>
              <p className="mb-5 mt-4 text-[.75rem] leading-[1.8] text-[#74777c]">Have a question that isn&apos;t covered here? We&apos;d love to hear from you.</p>
              <a className="inline-flex items-center gap-3 text-[.72rem] font-bold text-[#223343] transition-all hover:gap-4 hover:text-[#09525e]" href="#contact">
                Talk to CreatorLens <span aria-hidden="true">↗</span>
              </a>
            </div>
            <div className="col-span-8 flex flex-col gap-3 max-[800px]:col-span-1">
              {questions.map(([question, answer]) => (
                <details className="group overflow-hidden rounded-xl bg-white shadow-sm" key={question}>
                  <summary className="flex min-h-[4.2rem] cursor-pointer list-none items-center justify-between gap-6 px-5 py-4 text-[.74rem] font-bold leading-[1.5] text-[#223343] marker:hidden max-[560px]:min-h-16 max-[560px]:px-4 max-[560px]:text-[.69rem]">
                    {question}
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#e9f7f0] text-base font-normal text-[#286673] transition group-open:rotate-45" aria-hidden="true">+</span>
                  </summary>
                  <p className="mb-5 mt-[-.25rem] px-5 text-[.7rem] leading-[1.85] text-[#637069] max-[560px]:px-4 max-[560px]:text-[.67rem]">{answer}</p>
                </details>
              ))}
            </div>
            <div className="col-span-12 flex flex-col gap-3 max-[800px]:col-span-1">
              <form className="mt-2 grid gap-4 rounded-xl bg-white p-5 shadow-sm max-[560px]:p-4" onSubmit={handleQuestionSubmit}>
                <div>
                  <h3 className="m-0 text-[.85rem] font-bold text-[#223343]">Something On Your Mind?</h3>
                  <p className="mb-0 mt-1 text-[.68rem] leading-[1.7] text-[#68746e]">Tell Us Right Away.</p>
                </div>
                <label className="grid gap-2 text-[.61rem] font-bold text-[#34443f]">
                  Your email
                  <input ref={questionEmailRef} className="min-h-11 w-full rounded-lg border border-[#d5ded8] bg-white px-3 py-2 text-[.68rem] font-normal text-[#223343] outline-none transition placeholder:text-[#9aa49e] focus:border-[#286673] focus:ring-[3px] focus:ring-[#286673]/10" name="email" type="email" autoComplete="email" placeholder="you@brand.com" required />
                </label>
                <label className="grid gap-2 text-[.61rem] font-bold text-[#34443f]">
                  Your question
                  <textarea ref={questionRef} className="min-h-24 w-full resize-y rounded-lg border border-[#d5ded8] bg-white px-3 py-2 text-[.68rem] font-normal text-[#223343] outline-none transition placeholder:text-[#9aa49e] focus:border-[#286673] focus:ring-[3px] focus:ring-[#286673]/10" name="question" rows="3" maxLength="5000" placeholder="Ask us anything…" required />
                </label>
                <button className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#223343] px-5 py-3 text-[.7rem] font-bold text-white transition hover:bg-[#09525e] disabled:cursor-not-allowed disabled:opacity-60" type="submit" disabled={sendingQuestion}>
                  {sendingQuestion ? 'Sending…' : 'Send your question'}
                  {!sendingQuestion && <span aria-hidden="true">↗</span>}
                </button>
                {questionMessage && <p className={`m-0 rounded-lg border p-3 text-[.66rem] leading-relaxed ${questionError ? 'border-[#e7b9b3] bg-[#fff4f2] text-[#8b3028]' : 'border-[#b7cfc0] bg-[#eef7f0] text-[#244c34]'}`} role={questionError ? 'alert' : 'status'}>{questionMessage}</p>}
              </form>
            </div>
          </div>
        </section>

        
      </main>
      <SiteFooter />
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
