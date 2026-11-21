import { useState } from 'react'
import { Link } from 'react-router-dom'
import { stitchImages } from '../data/content.js'

const navigation = [
  ['Home', '#home'],
  ['Services', '#services'],
  ['Our Work', '#work'],
  ['For Creators', '#creators'],
]

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-20 border-b border-[#c4c6cc]/15 bg-[#eefdf6]/[.88] shadow-[0_1px_8px_rgb(0_0_0_/_4%)] backdrop-blur-sm max-[800px]:h-[4.5rem]">
      <div className="relative mx-auto flex h-full w-full max-w-7xl items-center justify-between gap-8 px-6 lg:px-12 max-[560px]:px-4">
        <Link className="flex items-center gap-3 whitespace-nowrap text-[#0c1e2d] no-underline max-[560px]:gap-2" to="/" onClick={closeMenu} aria-label="Studio Novo Atelier home">
          <img src={stitchImages.logo} alt="" className="h-9 w-9 rounded-lg object-contain max-[560px]:h-8 max-[560px]:w-8" />
          <span className="flex flex-col leading-none">
            <strong className="text-[.83rem] font-bold tracking-[.04em] max-[560px]:text-[.74rem]">CreatorLens</strong>
            <i className="mt-1 font-display text-[.62rem] font-normal lowercase tracking-[.12em] text-[#286673]">Studio</i>
          </span>
        </Link>
        <button
          className={`flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-lg border border-[#d4dfd8] bg-white min-[801px]:hidden ${menuOpen ? '[&>span:first-child]:translate-y-[3px] [&>span:first-child]:rotate-45 [&>span:last-child]:-translate-y-[3px] [&>span:last-child]:-rotate-45' : ''}`}
          type="button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="h-px w-[1.1rem] bg-[#223343] transition-transform" />
          <span className="h-px w-[1.1rem] bg-[#223343] transition-transform" />
        </button>
        <nav
          className={`absolute inset-x-0 top-[4.5rem] z-10 flex-col items-stretch gap-0 border-t border-[#e2e9e4] bg-[#eefdf6] px-5 pb-5 pt-2 shadow-[0_18px_24px_rgb(12_30_45_/_9%)] min-[801px]:static min-[801px]:flex min-[801px]:flex-row min-[801px]:items-center min-[801px]:gap-[clamp(.7rem,1.3vw,1.5rem)] min-[801px]:border-0 min-[801px]:bg-transparent min-[801px]:p-0 min-[801px]:shadow-none ${menuOpen ? 'max-[800px]:flex' : 'max-[800px]:hidden'}`}
          id="primary-navigation"
          aria-label="Main navigation"
        >
          {navigation.map(([label, href]) => (
            <a className="relative border-b border-[#edf1ed] py-3.5 text-[.75rem] font-medium text-[#43474c] no-underline transition-colors hover:text-[#09525e] after:absolute after:inset-x-0 after:-bottom-2 after:h-px after:origin-left after:scale-x-0 after:bg-[#286673] after:transition-transform hover:after:scale-x-100 min-[801px]:border-0 min-[801px]:py-0 min-[801px]:text-[.7rem]" href={href} key={label} onClick={closeMenu}>
              {label}
            </a>
          ))}
          <a className="mt-4 inline-flex min-h-11 items-center justify-center gap-3 rounded-lg bg-[#223343] px-4 text-[.72rem] font-semibold text-white no-underline shadow-sm transition hover:-translate-y-0.5 hover:bg-[#09525e] min-[801px]:mt-0 min-[801px]:min-h-[2.7rem] min-[801px]:px-4 min-[801px]:whitespace-nowrap" href="#contact" onClick={closeMenu}>
            Let&apos;s Talk <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </div>
    </header>
  )
}

export function SiteFooter() {
  return (
    <footer className="bg-[#f3f6f4] pb-5 pt-16 text-[#43474c] max-[560px]:pt-12">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-12 max-[560px]:px-4">
        <div className="mb-12 grid grid-cols-[1.4fr_.8fr_.8fr_1.1fr] gap-10 max-[1050px]:grid-cols-[1.2fr_.8fr_.8fr] max-[1050px]:gap-8 max-[800px]:grid-cols-2 max-[800px]:gap-8 max-[560px]:gap-x-5 max-[560px]:gap-y-8">
          <div className="max-[560px]:col-span-full">
            <Link className="flex items-baseline gap-2 text-[#0c1e2d] no-underline" to="/">
              <span className="text-base font-bold tracking-[.08em]">CreatorLens</span>
              <i className="font-display text-lg font-normal lowercase text-[#286673]">Studio</i>
            </Link>
            <p className="my-4 max-w-80 text-[.67rem] leading-[1.8] text-[#63716a]">
              High-touch editorial craft fused with performance-driven marketing for cultural icons and forward-thinking enterprises.
            </p>
            <div className="mt-4 flex gap-2">
              {['Delhi'].map((city) => (
                <span className="rounded-full bg-white px-2.5 py-1.5 text-[.55rem] text-[#63716a]" key={city}>{city}</span>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-start gap-3">
            <h2 className="mb-2 text-[.65rem] font-bold uppercase tracking-[.12em] text-[#0c1e2d]">Services</h2>
            <a className="text-[.62rem] text-[#63716a] no-underline transition-colors hover:text-[#09525e]" href="#services">Influencer Marketing</a>
            <a className="text-[.62rem] text-[#63716a] no-underline transition-colors hover:text-[#09525e]" href="#services">UGC</a>
            <a className="text-[.62rem] text-[#63716a] no-underline transition-colors hover:text-[#09525e]" href="#services">Social Media Marketing</a>
            <a className="text-[.62rem] text-[#63716a] no-underline transition-colors hover:text-[#09525e]" href="#services">Social Media Management</a>
            <a className="text-[.62rem] text-[#63716a] no-underline transition-colors hover:text-[#09525e]" href="#services">Content Production</a>
            <a className="text-[.62rem] text-[#63716a] no-underline transition-colors hover:text-[#09525e]" href="#services">Brand Shoots</a>
          </div>
          <div className="flex flex-col items-start gap-3">
            <h2 className="mb-2 text-[.65rem] font-bold uppercase tracking-[.12em] text-[#0c1e2d]">Explore</h2>
            <a className="text-[.62rem] text-[#63716a] no-underline transition-colors hover:text-[#09525e]" href="#home">The CreatorLens manifesto</a>
            <a className="text-[.62rem] text-[#63716a] no-underline transition-colors hover:text-[#09525e]" href="#work">Our Work</a>
            <a className="text-[.62rem] text-[#63716a] no-underline transition-colors hover:text-[#09525e]" href="#creators">Creator talent <span className="ml-1 text-[#286673]">↗</span></a>
            <a className="text-[.62rem] text-[#63716a] no-underline transition-colors hover:text-[#09525e]" href="#contact">Service Requests</a>
          </div>
          <div className="flex flex-col items-start gap-3 max-[1050px]:col-span-full">
            <h2 className="mb-2 text-[.65rem] font-bold uppercase tracking-[.12em] text-[#0c1e2d]">Notes from CreatorLens Studio</h2>
            <p className="my-0 max-w-80 text-[.67rem] leading-[1.8] text-[#63716a]">
              A considered perspective on creative culture, brand building, and the work that stays with us.
            </p>
            <a className="inline-flex items-center gap-3 text-[.62rem] font-bold text-[#286673] no-underline transition-colors hover:text-[#09525e]" href="mailto:admin@creatorlensstudio.com">
              Get in touch <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
        <div className="flex items-center gap-6 border-t border-[#c4c6cc]/30 pt-4 max-[800px]:flex-wrap max-[800px]:gap-x-4 max-[800px]:gap-y-3">
          <span className="mr-auto text-[.55rem] text-[#74777c] max-[560px]:w-full max-[560px]:mr-0">© 2026 CreatorLens Studio. All rights reserved.</span>
          <a className="text-[.55rem] text-[#286673] no-underline transition-colors hover:text-[#09525e]" href="#home">Back to top ↑</a>
        </div>
      </div>
    </footer>
  )
}
