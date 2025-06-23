"use client";
import { ExternalLink, Terminal, Construction, Github } from "lucide-react";
import Link from "next/link";

export default function Documentation() {
  return (
    <div className="min-h-screen bg-gradient-to-t from-[#999999] to-[#ffffff] text-black relative overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-96 h-96 bg-black rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gray-700 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gray-500 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 px-8 py-6 flex justify-between items-center max-w-7xl mx-auto backdrop-blur-sm">
        <Link
          href="/"
          className="flex items-center text-3xl font-medium tracking-tighter relative"
        >
          <img
            src="/icon_transparent.svg"
            alt="compadcn logo"
            className="w-14 h-14"
          />
          compadcn
        </Link>
        <div className="hidden md:flex gap-8 text-sm font-medium">
          <Link
            href="/#features"
            className="relative group transition-all duration-300"
          >
            Features
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300"></div>
          </Link>
          <Link
            href="/documentation"
            className="relative group transition-all duration-300 text-black font-bold"
          >
            Docs
            <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-black"></div>
          </Link>
          <Link
            href="https://github.com/lirena00/compadcn"
            target="_blank"
            rel="noopener noreferrer"
            className="relative group transition-all duration-300"
          >
            GitHub
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300"></div>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 px-8 pt-20 pb-16 text-center max-w-7xl mx-auto">
        <div className="relative">
          {/* Geometric decorations */}
          <div className="absolute -top-10 -left-10 w-20 h-20 border-2 border-black/10 rotate-45 animate-pulse"></div>
          <div className="absolute -top-5 -right-5 w-10 h-10 bg-black/5 rotate-12 animate-pulse delay-500"></div>

          <div className="mb-4">
            <div className="inline-block bg-orange-600 text-white px-6 py-2 text-xs font-bold tracking-[0.2em] mb-6 relative overflow-hidden group">
              <span className="relative z-10 flex items-center gap-2">
                <Construction className="w-4 h-4" />
                UNDER CONSTRUCTION
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-700 to-orange-500 transform translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter relative">
            <span className="relative inline-block">
              Documentation
              <div className="absolute top-0 right-0 w-4 h-4 bg-orange-600 animate-ping"></div>
            </span>
            <br />
            <span className="relative inline-block bg-gradient-to-r from-black via-gray-600 to-black bg-clip-text text-transparent">
              coming soon
            </span>
          </h1>
          <p className="text-2xl md:text-3xl mb-20 text-gray-700 max-w-5xl mx-auto leading-relaxed font-light">
            We&apos;re working hard to bring you comprehensive documentation.
            <br className="hidden md:block" />
            In the meantime, check out the{" "}
            <em className="font-semibold not-italic">demo video</em> and{" "}
            <em className="font-semibold not-italic">GitHub repository</em>{" "}
            below.
          </p>
        </div>
      </section>

      {/* Demo Video Section */}
      <section className="relative px-8 py-20 bg-gradient-to-b from-transparent to-white/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tighter">
              See it in
              <br />
              <span className="text-gray-600">action</span>
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-black to-gray-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Watch how compadcn streamlines your shadcn workflow
            </p>
          </div>

          {/* YouTube Video Embed */}
          <div className="relative bg-black border-4 border-black shadow-2xl max-w-4xl mx-auto">
            <div className="aspect-video">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/uCViZ5Ch4Qs?rel=0&showinfo=0&modestbranding=1"
                title="compadcn Demo - Supercharge your shadcn workflow"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 font-medium">
              See compadcn&apos;s interactive TUI, smart linting, and preset
              management in action
            </p>
          </div>
        </div>
      </section>

      {/* Quick Start Section */}
      <section className="px-8 py-32 bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-white/50 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
              Quick Start
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-white to-gray-400 mx-auto mb-6"></div>
            <p className="text-xl text-gray-300 font-light">
              Get compadcn up and running in under 2 minutes
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h3 className="text-3xl font-bold mb-8 tracking-tight">
                1. Installation
              </h3>
              <div className="bg-gray-900 p-6 font-mono text-base border-2 border-gray-700 mb-8">
                <div className="text-gray-400 mb-2"># Install globally</div>
                <div className="text-green-400">npm install -g compadcn</div>
              </div>
              <p className="text-lg text-gray-300 font-light leading-relaxed">
                Install compadcn globally to use it in any project with
                shadcn-ui components.
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-bold mb-8 tracking-tight">
                2. First Use
              </h3>
              <div className="bg-gray-900 p-6 font-mono text-base border-2 border-gray-700 mb-8">
                <div className="text-gray-400 mb-2">
                  # Navigate to your project
                </div>
                <div className="text-blue-400 mb-4">cd my-shadcn-project</div>
                <div className="text-gray-400 mb-2">
                  # Start adding components
                </div>
                <div className="text-green-400">compadcn add</div>
              </div>
              <p className="text-lg text-gray-300 font-light leading-relaxed">
                Navigate to your project directory and start the interactive
                component selector.
              </p>
            </div>
          </div>

          <div className="mt-16 pt-16 border-t border-gray-800">
            <h3 className="text-3xl font-bold mb-12 text-center tracking-tight">
              Requirements
            </h3>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                "Node.js 18.0.0 or higher",
                "A shadcn project with components.json",
                "npm, pnpm, yarn, or bun",
              ].map((req, i) => (
                <div
                  key={i}
                  className="bg-gray-900/50 border-2 border-gray-700 p-6 text-center"
                >
                  <div className="text-green-400 text-2xl mb-4">✓</div>
                  <p className="text-gray-300 font-medium">{req}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* GitHub Reference Section */}
      <section className="px-8 py-32 bg-gradient-to-b from-white/50 to-transparent">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tighter">
              For now, visit
              <br />
              <span className="text-gray-600">the repository</span>
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-black to-gray-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Complete command reference, examples, and usage guides are
              available in the GitHub repository
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <a
              href="https://github.com/lirena00/compadcn"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-8 bg-white border-4 border-black hover:shadow-2xl transition-all duration-700 hover:-translate-y-4 transform"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-black to-gray-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              <div className="text-gray-700 mb-6 group-hover:scale-110 transition-transform duration-300 flex justify-center">
                <Github className="w-16 h-16" />
              </div>
              <h3 className="text-2xl font-bold mb-4 tracking-tight flex items-center justify-center gap-3">
                GitHub Repository
                <ExternalLink className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </h3>
              <p className="text-gray-600 leading-relaxed text-base">
                Browse the source code, read the README, and find detailed
                command usage examples
              </p>
            </a>

            <a
              href="https://github.com/lirena00/compadcn#commands"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-8 bg-white border-4 border-black hover:shadow-2xl transition-all duration-700 hover:-translate-y-4 transform"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-500 to-green-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              <div className="text-gray-700 mb-6 group-hover:scale-110 transition-transform duration-300 flex justify-center">
                <Terminal className="w-16 h-16" />
              </div>
              <h3 className="text-2xl font-bold mb-4 tracking-tight flex items-center justify-center gap-3">
                Command Reference
                <ExternalLink className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </h3>
              <p className="text-gray-600 leading-relaxed text-base">
                Jump directly to the commands section for quick reference and
                usage examples
              </p>
            </a>
          </div>

          <div className="mt-16 pt-12 border-t-2 border-black/20">
            <div className="bg-orange-100 border-2 border-orange-500 p-8 max-w-3xl mx-auto">
              <div className="flex items-center gap-4 mb-4">
                <Construction className="w-8 h-8 text-orange-600" />
                <h3 className="text-2xl font-bold text-orange-800">
                  Work in Progress
                </h3>
              </div>
              <p className="text-orange-700 leading-relaxed">
                This documentation site is actively being developed. We&apos;re
                working on comprehensive guides. Follow the repository for
                updates!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-8 py-20 border-t-4 border-black/20 bg-gradient-to-t from-gray-100 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-10">
            <div className="text-center">
              <div className="flex items-center justify-center text-3xl font-medium tracking-tighter relative">
                <img
                  src="/icon_transparent.svg"
                  alt="compadcn logo"
                  className="w-14 h-14"
                />
                compadcn
              </div>

              <p className="text-gray-600 font-medium text-base">
                Built with ❤️ by{" "}
                <Link
                  href="https://www.lirena.in/?utm_source=compadcn&utm_medium=website"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:no-underline transition-all hover:text-black font-semibold"
                >
                  @lirena00
                </Link>
              </p>
            </div>
            <div className="flex gap-10 text-base font-medium">
              <Link
                href="/"
                className="hover:text-gray-600 transition-colors relative group"
              >
                Home
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300"></div>
              </Link>
              <a
                href="https://github.com/lirena00/compadcn"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-600 transition-colors relative group"
              >
                GitHub
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300"></div>
              </a>
              <a
                href="https://github.com/lirena00/compadcn/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-600 transition-colors relative group"
              >
                Issues
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300"></div>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
