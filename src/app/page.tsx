"use client";
import { Copy, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Discord } from "@/components/icons/discord";
import { Github } from "@/components/icons/github";
import { Buymeacoffee } from "@/components/icons/buymeacoffee";
export default function Home() {
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
        <div className="text-3xl font-black tracking-tighter relative">
          compadcn
          <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-black to-transparent"></div>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium">
          <Link
            href="#features"
            className="relative group transition-all duration-300"
          >
            Features
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300"></div>
          </Link>
          <Link
            href="/documentation"
            className="relative group transition-all duration-300"
          >
            Docs
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300"></div>
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

      {/* Hero Section - Keep as you modified */}
      <section className="relative z-10 px-8 pt-20  text-center max-w-7xl mx-auto">
        <div className="relative">
          {/* Geometric decorations */}
          <div className="absolute -top-10 -left-10 w-20 h-20 border-2 border-black/10 rotate-45 animate-pulse"></div>
          <div className="absolute -top-5 -right-5 w-10 h-10 bg-black/5 rotate-12 animate-pulse delay-500"></div>

          <div className="mb-4">
            <div className="inline-block bg-black text-white px-6 py-2 text-xs font-bold tracking-[0.2em] mb-6 relative overflow-hidden group">
              <span className="relative z-10">NEXT-GEN CLI TOOL</span>
              <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-black transform translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-8  tracking-tighter relative">
            <span className="relative inline-block">
              Speedrun the shadcn setup
              <div className="absolute top-0 right-0 w-4 h-4 bg-black animate-ping"></div>
            </span>
            <br />
            <span className="relative inline-block bg-gradient-to-r from-black via-gray-600 to-black bg-clip-text text-transparent">
              with powered-up cli
            </span>
          </h1>
          <p className="text-2xl md:text-3xl mb-20 text-gray-700 max-w-5xl mx-auto leading-relaxed font-light">
            The most <em className="font-semibold not-italic">powerful</em> CLI
            wrapper around shadcn-ui.
            <br className="hidden md:block" />
            Interactive TUI, smart linting, custom presets, and effortless
            component management.
          </p>
        </div>

        {/* Terminal mockup with enhanced design */}
        <div className="mb-20 max-w-4xl mx-auto relative group">
          <div className="absolute -inset-4 bg-gradient-to-r from-black/20 via-gray-500/20 to-black/20 blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
          <div className="relative bg-black text-white p-10 text-left font-mono text-base shadow-2xl border-2 border-gray-800">
            {/* Terminal header */}
            <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-700">
              <div className="flex gap-2">
                <div className="w-4 h-4 bg-red-500 animate-pulse"></div>
                <div className="w-4 h-4 bg-yellow-500 animate-pulse delay-200"></div>
                <div className="w-4 h-4 bg-green-500 animate-pulse delay-400"></div>
              </div>
              <span className="text-gray-400 text-sm ml-4 font-semibold">
                compadcn • Interactive CLI
              </span>
            </div>
            {/* Terminal content */}
            <div className="space-y-4">
              <div className="text-gray-400 mt-8 text-lg">
                ~/my-awesome-project
              </div>
              <div className="text-green-400 text-lg">compadcn add</div>
              <div className="text-white ml-4">
                <div className="text-cyan-400 text-lg mb-3">
                  ? Select components to add:
                </div>
                <div className="ml-4 text-gray-300 space-y-2 text-base">
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">■</span> Button
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">■</span> Card
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">□</span> Dialog
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">□</span> Input
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 justify-center items-center mb-12">
          <div className="group relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-black via-gray-800 to-black opacity-30 blur-lg group-hover:opacity-50 transition-all duration-500"></div>
            <div className="relative bg-black text-white px-8 py-4 text-lg font-mono font-bold transform   flex items-center gap-3">
              <span id="install-command">npm install -g compadcn</span>
              <div className="relative">
                <button
                  className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded"
                  onClick={() => {
                    const dropdown = document.getElementById(
                      "package-manager-dropdown"
                    );
                    dropdown?.classList.toggle("hidden");
                  }}
                >
                  <Copy className="w-5 h-5" />
                </button>
                <div
                  id="package-manager-dropdown"
                  className="hidden absolute top-full right-0 mt-2 bg-gray-900 border border-gray-700 rounded shadow-lg z-50 min-w-[200px]"
                >
                  {[
                    { name: "npm", command: "npm install -g compadcn" },
                    { name: "pnpm", command: "pnpm install -g compadcn" },
                    { name: "yarn", command: "yarn global add compadcn" },
                    { name: "bun", command: "bun install -g compadcn" },
                  ].map((pm) => (
                    <button
                      key={pm.name}
                      className="w-full text-left px-4 py-2 text-white hover:bg-gray-800 transition-colors first:rounded-t last:rounded-b"
                      onClick={() => {
                        navigator.clipboard.writeText(pm.command);
                        document.getElementById(
                          "install-command"
                        )!.textContent = pm.command;
                        document
                          .getElementById("package-manager-dropdown")
                          ?.classList.add("hidden");
                      }}
                    >
                      {pm.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <Link
            href="https://github.com/lirena00/compadcn"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative px-8 py-4 text-lg font-bold border-4 border-black hover:bg-black hover:text-white transition-all duration-500 overflow-hidden transform hover:scale-105"
          >
            <span className="relative z-10 flex items-center gap-2">
              View on GitHub
              <ExternalLink className="w-5 h-5" />
            </span>
            <div className="absolute inset-0 bg-black transform translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
          </Link>
        </div>
      </section>

      {/* Features Section - Updated typography */}
      <section
        id="features"
        className="relative px-8 py-32 bg-gradient-to-b from-transparent to-white/50"
      >
        {/* Geometric background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-32 h-32 border-4 border-black/5 rotate-45"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-black/5 rotate-12"></div>
          <div className="absolute top-1/2 left-1/2 w-40 h-40 border-2 border-black/5 rotate-12 transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tighter">
              Everything
              <br />
              <span className="text-gray-600">you need</span>
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-black to-gray-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Powerful features designed for modern component workflows
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-10">
            {[
              {
                icon: "⚡",
                title: "Interactive TUI",
                description:
                  "Blazing-fast component workflows with an intuitive terminal interface that feels like magic.",
                color: "from-blue-500 to-blue-600",
              },
              {
                icon: "🎯",
                title: "Smart Linting",
                description:
                  "Automatically discover and remove unused components from your project with surgical precision.",
                color: "from-green-500 to-green-600",
              },
              {
                icon: "📦",
                title: "Custom Presets",
                description:
                  "Create and share collections of commonly used components for instant project setup.",
                color: "from-purple-500 to-purple-600",
              },
              {
                icon: "🧹",
                title: "Import Cleanup",
                description:
                  "Automatically removes imports when components are deleted. No more dead code.",
                color: "from-orange-500 to-orange-600",
              },
              {
                icon: "🔧",
                title: "Dependency Management",
                description:
                  "Optionally remove unused dependencies when components are deleted. Keep it clean.",
                color: "from-red-500 to-red-600",
              },
              {
                icon: "🚀",
                title: "One Command Setup",
                description:
                  "Add multiple components with a single command or interactive selection. That simple.",
                color: "from-cyan-500 to-cyan-600",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="group relative p-8 bg-white border-4 border-black hover:shadow-2xl transition-all duration-700 hover:-translate-y-4 transform"
              >
                <div
                  className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${feature.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}
                ></div>
                <div className="text-4xl mb-5 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-base">
                  {feature.description}
                </p>
                <div className="absolute bottom-5 right-5 w-6 h-6 border-4 border-black/20 rotate-45 group-hover:rotate-90 transition-transform duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-8 py-32 bg-black text-white text-center relative overflow-hidden">
        {/* Dramatic background effect */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
          <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl animate-pulse delay-700"></div>
          <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight leading-tight">
              Join the community
            </h2>
            <p className="text-xl text-gray-300 font-light max-w-3xl mx-auto leading-relaxed">
              Connect with developers, get support, and help make compadcn even
              better
            </p>
          </div>

          {/* Action Buttons */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Link
              href="https://discord.gg/pdxMMNGWCU"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-6 bg-gray-900/50 backdrop-blur-sm border-2 border-gray-700 hover:border-blue-500 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex flex-col items-center text-center">
                <div className="mb-4 p-3">
                  <Discord className="w-8 h-8 " />
                </div>
                <h3 className="text-lg font-bold mb-2 text-white">
                  Join Discord
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Connect with the community, get support, and share your
                  feedback
                </p>
              </div>
            </Link>

            <Link
              href="https://github.com/lirena00/compadcn"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-6 bg-gray-900/50 backdrop-blur-sm border-2 border-gray-700 hover:border-white transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-white/25"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-gray-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex flex-col items-center text-center">
                <div className="mb-4 p-3">
                  <Github className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-white">
                  Star on GitHub
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Show your support by starring the project and exploring the
                  code
                </p>
              </div>
            </Link>

            <Link
              href="https://buymeacoffee.com/lirena00"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-6 bg-gray-900/50 backdrop-blur-sm border-2 border-gray-700 hover:border-yellow-500 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/25"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex flex-col items-center text-center">
                <div className="mb-4 p-3">
                  <Buymeacoffee className="w-8 h-8 text-yellow-400" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-white">
                  Buy me a coffee
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Support the development and help keep the project growing
                </p>
              </div>
            </Link>
          </div>

          {/* Stats or Additional Info */}
          {/* <div className="mt-16 pt-16 border-t border-gray-800">
            <div className="grid md:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">10k+</div>
                <div className="text-sm text-gray-400">Downloads</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">500+</div>
                <div className="text-sm text-gray-400">GitHub Stars</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">50+</div>
                <div className="text-sm text-gray-400">Contributors</div>
              </div>
            </div>
          </div> */}
        </div>
      </section>

      {/* Footer - Updated typography */}
      <footer className="px-8 py-20 border-t-4 border-black/20 bg-gradient-to-t from-gray-100 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-10">
            <div className="text-center lg:text-left">
              <div className="text-3xl font-black mb-3 tracking-tight">
                compadcn
              </div>
              <p className="text-gray-600 font-medium text-base">
                Built with ❤️ by{" "}
                <Link
                  href="https://github.com/lirena00"
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
                href="https://github.com/lirena00/compadcn"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-600 transition-colors relative group"
              >
                GitHub
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300"></div>
              </Link>
              <Link
                href="https://github.com/lirena00/compadcn/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-600 transition-colors relative group"
              >
                Issues
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300"></div>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
