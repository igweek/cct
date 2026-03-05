/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { 
  Cloud, 
  Server, 
  Shield, 
  Globe, 
  Cpu, 
  LayoutGrid, 
  Terminal, 
  ArrowRight,
  Database,
  Network,
  Settings,
  User,
  Layers,
  Code,
  MapPin,
  Mail,
  Phone,
  Building2,
  Menu,
  X,
  Plus
} from 'lucide-react';
import { useState } from 'react';

// --- Components ---

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else if (id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const menuItems = [
    { name: '首页', id: 'hero' },
    { name: '专业定位', id: 'vision' },
    { name: '课程体系', id: 'curriculum' },
    { name: '校企合作', id: 'partnership' },
    { name: '就业前景', id: 'career' },
    { name: '帮助', id: 'faq' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white">
            <Cloud size={24} fill="currentColor" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight">Cloud Computing</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {menuItems.map((item) => (
            <button 
              key={item.name} 
              onClick={() => scrollToSection(item.id)}
              className="text-sm font-medium text-text-muted hover:text-white transition-colors"
            >
              {item.name}
            </button>
          ))}
        </div>

        <div className="hidden md:block">
          <button 
            onClick={() => scrollToSection('contact')}
            className="bg-primary hover:bg-primary-hover text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors"
          >
            联系我们
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-white p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-surface border-b border-white/5 p-6 flex flex-col gap-4 shadow-2xl animate-in slide-in-from-top-5">
          {menuItems.map((item) => (
            <button 
              key={item.name} 
              onClick={() => scrollToSection(item.id)}
              className="text-left text-base font-medium text-text-muted hover:text-white py-2 transition-colors"
            >
              {item.name}
            </button>
          ))}
          <div className="h-px bg-white/5 my-2" />
          <button 
            onClick={() => scrollToSection('contact')}
            className="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-xl text-base font-semibold transition-colors w-full"
          >
            联系我们
          </button>
        </div>
      )}
    </nav>
  );
};

const HeroVisual = () => {
  return (
    <div className="relative w-full max-w-[500px] aspect-square flex items-center justify-center">
      {/* Orbit Rings */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 rounded-full border border-primary/20 border-dashed" 
      />
      <motion.div 
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute inset-12 rounded-full border border-white/5" 
      />
      
      {/* Center Core */}
      <div className="relative z-20 w-32 h-32 bg-surface/50 backdrop-blur-xl rounded-full flex items-center justify-center border border-primary/50 shadow-[0_0_60px_rgba(37,99,235,0.3)]">
        <Cloud size={64} className="text-primary drop-shadow-[0_0_10px_rgba(37,99,235,0.8)]" />
      </div>

      {/* Floating Nodes */}
      <FloatingNode icon={Server} angle={0} distance={160} delay={0} />
      <FloatingNode icon={Database} angle={72} distance={160} delay={1} />
      <FloatingNode icon={Shield} angle={144} distance={160} delay={2} />
      <FloatingNode icon={Globe} angle={216} distance={160} delay={3} />
      <FloatingNode icon={Code} angle={288} distance={160} delay={4} />

      {/* Connecting Lines (Static for simplicity, could be SVG) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
        <circle cx="50%" cy="50%" r="160" stroke="currentColor" strokeWidth="1" fill="none" className="text-primary" />
      </svg>
    </div>
  );
};

const FloatingNode = ({ icon: Icon, angle, distance, delay }: { icon: any, angle: number, distance: number, delay: number }) => {
  const rad = (angle * Math.PI) / 180;
  const x = Math.cos(rad) * distance;
  const y = Math.sin(rad) * distance;

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 w-14 h-14 -ml-7 -mt-7 bg-surface-highlight border border-white/10 rounded-2xl flex items-center justify-center shadow-xl z-10"
      initial={{ x, y, opacity: 0, scale: 0 }}
      animate={{ 
        x, 
        y: [y - 8, y + 8, y - 8],
        opacity: 1,
        scale: 1
      }}
      transition={{
        y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay },
        opacity: { duration: 0.5, delay: delay * 0.1 },
        scale: { duration: 0.5, delay: delay * 0.1 }
      }}
    >
      <Icon size={24} className="text-text-muted" />
    </motion.div>
  );
};

const Hero = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="font-display font-bold text-4xl sm:text-6xl md:text-8xl leading-tight mb-6">
                云计算专业
              </h1>
              <h2 className="text-xl sm:text-2xl md:text-3xl text-text-muted font-light mb-2">
                构建面向未来的云原生技术体系
                数字经济时代的重要基础设施
                人工智能发展的关键技术
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-text-muted/60 tracking-[0.15em] md:tracking-[0.2em] uppercase mb-12">
                Building Future-Oriented Cloud-Native Ecosystems
              </p>
              
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => document.getElementById('curriculum')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-2 transition-all group"
                >
                  了解课程体系
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="border border-white/20 hover:border-white/40 text-white px-8 py-4 rounded-xl font-semibold transition-all backdrop-blur-sm"
                >
                  咨询报名
                </button>
              </div>
            </motion.div>
          </div>

          <div className="hidden lg:flex justify-center items-center">
            <HeroVisual />
          </div>
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ icon: Icon, title, desc, delay }: { icon: any, title: string, desc: string, delay: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className="glass-panel p-8 rounded-2xl hover:border-primary/30 transition-colors group"
  >
    <div className="w-12 h-12 bg-surface-highlight rounded-lg flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
      <Icon size={24} />
    </div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-text-muted text-sm leading-relaxed">{desc}</p>
  </motion.div>
);

const Vision = () => {
  return (
    <section id="vision" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="lg:w-1/3">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-0.5 bg-primary" />
              <span className="text-primary font-mono text-sm tracking-widest uppercase">Vision</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8">专业定位</h2>
            <p className="text-text-muted text-lg leading-relaxed border-l-2 border-white/10 pl-6">
              聚焦虚拟化、分布式架构与云原生技术体系，培养具备企业级云平台构建、自动化运维与安全治理能力的高水平技术人才。强调架构思维、系统稳定性与规模化部署能力，支撑现代数字化基础设施建设。
            </p>
          </div>
          
          <div className="lg:w-2/3 grid md:grid-cols-2 gap-6">
            <FeatureCard 
              icon={Server}
              title="云原生技术"
              desc="构建容器化与微服务驱动的现代应用架构，支撑高可扩展与高可靠的运行环境。"
              delay={0.1}
            />
            <FeatureCard 
              icon={LayoutGrid}
              title="云平台架构"
              desc="基于虚拟化与资源抽象技术，设计与部署企业级云平台基础设施。"
              delay={0.2}
            />
            <FeatureCard 
              icon={Network}
              title="分布式系统"
              desc="理解分布式架构原理与云网络模型，支撑高并发与跨区域系统运行。"
              delay={0.3}
            />
            <FeatureCard 
              icon={Shield}
              title="自动化与安全"
              desc="建立自动化运维体系与安全治理机制，保障云环境持续稳定运行。"
              delay={0.4}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const CourseCard = ({ icon: Icon, title, desc, sub }: { icon: any, title: string, desc: string, sub: string }) => (
  <div className="bg-surface border border-white/5 p-8 rounded-2xl hover:bg-surface-highlight transition-colors group">
    <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
      <Icon size={24} />
    </div>
    <h3 className="text-lg font-bold mb-2">{title}</h3>
    <p className="text-text-muted text-sm mb-4">{desc}</p>
    <div className="text-xs font-mono text-text-muted/60 uppercase tracking-wider">{sub}</div>
  </div>
);

const Curriculum = () => {
  return (
    <section id="curriculum" className="py-32 bg-surface/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-8 bg-primary rounded-full" />
            <h2 className="text-3xl font-bold">核心课程体系</h2>
          </div>
          <p className="text-text-muted max-w-2xl">
            掌握现代云架构、容器化、安全及可扩展基础设施运维所需的核心技能。
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <CourseCard 
            icon={Database}
            title="虚拟化技术"
            desc="深入研究 Hypervisor、KVM、VMware 及高级虚拟机生命周期管理。"
            sub="基础设施层"
          />
          <CourseCard 
            icon={Cloud}
            title="私有云架构"
            desc="使用 OpenStack 设计、部署并扩展高可用的私有云基础设施。"
            sub="平台层"
          />
          <CourseCard 
            icon={Network}
            title="云网络技术"
            desc="学习软件定义网络 (SDN)、网络功能虚拟化 (NFV) 及复杂的 VPC 配置。"
            sub="网络层"
          />
          <CourseCard 
            icon={Layers}
            title="容器编排"
            desc="精通 Docker、Kubernetes 架构、Helm Charts 及自动化容器部署。"
            sub="应用层"
          />
          <CourseCard 
            icon={Shield}
            title="云安全"
            desc="实施稳健的 IAM、网络安全组、加密技术及云环境合规措施。"
            sub="安全层"
          />
          <CourseCard 
            icon={Settings}
            title="云运维与监控"
            desc="使用 Prometheus、Grafana 及自动化脚本监控、管理并优化云服务。"
            sub="运维层"
          />
        </div>
      </div>
    </section>
  );
};

const Partnership = () => {
  const partners = [
    { name: "中国电子科技集团公司", type: "科研院所" },
    { name: "中国电信", type: "通信运营商" },
    { name: "中国移动", type: "通信运营商" },
    { name: "海康威视", type: "智能物联网" }
  ];

  return (
    <section id="partnership" className="py-32 border-y border-white/5 bg-surface/20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent opacity-50" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-2 h-8 bg-primary rounded-full" />
            <h2 className="text-3xl font-bold">校企合作</h2>
          </div>
          <div className="space-y-4 text-text-muted leading-relaxed text-lg border-l-2 border-white/10 pl-6 w-full">
            <p>
              依托与 <span className="text-white font-medium">中国电子科技集团公司第五十五研究所</span>、<span className="text-white font-medium">中国电信</span>、<span className="text-white font-medium">中国移动</span>、<span className="text-white font-medium">海康威视</span> 等行业单位的合作基础，构建面向真实工程场景的实践体系。
            </p>
            <p>
              通过企业项目实践、联合技术交流与工程环境引入，使学生在真实云平台与基础设施场景中提升系统架构与运维能力。
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10 rounded-2xl overflow-hidden">
          {partners.map((partner) => (
            <div key={partner.name} className="bg-surface p-10 flex flex-col items-center justify-center text-center hover:bg-surface-highlight transition-all duration-500 group cursor-default h-48">
              <div className="w-12 h-12 mb-4 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                <Building2 size={24} className="text-text-muted group-hover:text-primary transition-colors" />
              </div>
              <h3 className="text-lg font-bold text-white/90 group-hover:text-white transition-colors mb-2 whitespace-pre-line">
                {partner.name}
              </h3>
              <span className="text-xs font-mono text-text-muted/60 uppercase tracking-wider border border-white/10 px-2 py-1 rounded-full">
                {partner.type}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CareerStep = ({ icon: Icon, title, role, level, isLast }: { icon: any, title: string, role: string, level: string, isLast?: boolean }) => (
  <div className="relative flex-1">
    <div className="flex flex-col items-center text-center z-10 relative">
      <div className="w-16 h-16 rounded-full bg-surface-highlight border border-white/10 flex items-center justify-center text-primary mb-6 shadow-lg shadow-black/20">
        <Icon size={28} />
      </div>
      <h3 className="text-lg font-bold mb-1">{title}</h3>
      <div className="text-sm text-text-muted mb-3">{role}</div>
      <span className="px-3 py-1 rounded-full bg-white/5 text-xs font-mono text-text-muted border border-white/5">
        {level}
      </span>
    </div>
    {!isLast && (
      <>
        <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gradient-to-r from-white/5 to-white/10 -z-0" />
        <div className="md:hidden absolute left-1/2 -bottom-12 w-0.5 h-12 bg-gradient-to-b from-white/5 to-white/10 -translate-x-1/2" />
      </>
    )}
  </div>
);

const CareerPath = () => {
  return (
    <section id="career" className="py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-2 h-8 bg-primary rounded-full" />
            <h2 className="text-3xl font-bold">就业前景</h2>
          </div>
          <div className="space-y-4 text-text-muted leading-relaxed text-lg border-l-2 border-white/10 pl-6 w-full">
            <p>
              随着云计算、大数据与人工智能技术的快速发展，越来越多的企业将业务系统部署到云平台，对云计算技术人才的需求持续增长。云计算专业毕业生可在 <span className="text-white font-medium">互联网企业</span>、<span className="text-white font-medium">软件公司</span>、<span className="text-white font-medium">金融机构</span>、<span className="text-white font-medium">政府信息中心</span> 以及各类 <span className="text-white font-medium">企事业单位</span> 从事云平台运维、云应用开发、系统部署与自动化运维等工作，就业面广、发展空间大。
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-12 md:gap-4">
          <CareerStep 
            icon={User}
            title="云支持工程师"
            role="提供一线/二线技术支持"
            level="入门级 • 0-2 年"
          />
          <CareerStep 
            icon={Server}
            title="基础设施工程师"
            role="设计并配置云资源"
            level="中级 • 2-4 年"
          />
          <CareerStep 
            icon={Code}
            title="DevOps 工程师"
            role="实施 CI/CD 与自动化流程"
            level="高级 • 4-6 年"
          />
          <CareerStep 
            icon={Cpu}
            title="云架构师"
            role="主导企业级云战略"
            level="专家级 • 6+ 年"
            isLast
          />
        </div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "学习云计算需要会编程吗？",
      answer: "需要具备一定的编程基础，但不需要成为软件开发专家。云计算更侧重系统管理与自动化运维，常用语言包括 Python 和 Shell，用于编写自动化脚本、管理服务器和部署应用。"
    },
    {
      question: "学习云计算对数学要求高吗？",
      answer: "云计算专业对数学的要求不像人工智能或数据科学那样高。一般需要具备基础的数学能力，例如逻辑思维和简单的数据计算，更重要的是对计算机技术和网络系统的理解能力。"
    },
    {
      question: "没有计算机基础可以学习吗？",
      answer: "可以。课程通常会从基础知识开始，例如计算机网络、Linux系统以及服务器管理等。只要具备学习兴趣并愿意进行实践训练，大多数学生都可以逐步掌握相关技术。"
    },
    {
      question: "云计算和人工智能有什么关系？",
      answer: "云计算为人工智能提供计算资源和数据处理平台。许多人工智能模型的训练与部署都依赖云平台完成，因此云计算是人工智能发展的重要基础设施之一。"
    },
    {
      question: "云计算专业主要学习什么内容？",
      answer: "云计算专业主要学习计算机系统和云平台相关技术，包括 Linux 操作系统、计算机网络、虚拟化技术、容器技术（Docker / Kubernetes）、云平台部署、自动化运维以及云安全等内容。通过系统学习，学生可以掌握现代互联网基础设施的构建与运维能力。"
    },
    {
      question: "学习过程中需要做很多实验吗？",
      answer: "需要。云计算是一门实践性很强的专业，学生会通过搭建服务器、部署云平台、配置网络环境以及构建容器集群等实验来掌握技术。这些实践经验对于未来就业非常重要。"
    },
    {
      question: "云计算专业就业前景怎么样？",
      answer: "随着企业数字化转型，大量业务系统正在向云平台迁移，对云计算技术人才的需求持续增长。互联网企业、通信运营商、金融机构以及各类企事业单位都需要云计算相关技术人员，因此整体就业前景较为广阔。"
    },
    {
      question: "云计算和软件工程有什么区别？",
      answer: "软件工程主要侧重软件开发，例如应用程序设计与系统开发；而云计算更关注服务器、网络、云平台和系统运维等基础设施。简单来说，软件工程更偏向“开发软件”，而云计算更偏向“构建和管理运行平台”。"
    }
  ];

  return (
    <section id="faq" className="py-32 relative">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-16 text-center">
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-6">
              <span>常见问题</span>
           </div>
           <h2 className="text-3xl md:text-4xl font-bold mb-6">答疑解惑</h2>
           <p className="text-text-muted text-lg max-w-2xl mx-auto">
             关于专业学习、就业方向与课程设置的详细解答
           </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`group bg-surface border border-white/5 rounded-2xl overflow-hidden transition-all duration-300 ${
                openIndex === index ? 'bg-surface-highlight border-primary/20 shadow-lg' : 'hover:border-white/10'
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <div className="flex items-center gap-6">
                  <span className={`text-2xl font-display font-bold transition-colors duration-300 ${
                    openIndex === index ? 'text-primary' : 'text-white/10 group-hover:text-white/20'
                  }`}>
                    0{index + 1}
                  </span>
                  <span className={`text-lg font-medium transition-colors ${
                    openIndex === index ? 'text-white' : 'text-text-muted group-hover:text-white'
                  }`}>
                    {faq.question}
                  </span>
                </div>
                <div className={`shrink-0 ml-4 w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 ${
                  openIndex === index 
                    ? 'bg-primary border-primary text-white rotate-45' 
                    : 'border-white/10 text-text-muted bg-white/5 group-hover:border-white/20'
                }`}>
                  <Plus size={16} />
                </div>
              </button>
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  openIndex === index ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-6 pl-[4.5rem] text-text-muted leading-relaxed border-t border-white/5 pt-4">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-32 bg-surface-highlight/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">联系与咨询</h2>
            <p className="text-text-muted text-lg mb-12">
              对我们的云计算专业课程感兴趣？欢迎联系我们。
            </p>
            
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold mb-1">地址</h4>
                  <p className="text-text-muted">苏州市虎丘区塔园路68号<br />苏州高等职业技术学校</p>
                </div>
              </div>
              
              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-bold mb-1">邮箱</h4>
                  <p className="text-text-muted">soscloud@hotmail.com</p>
                </div>
              </div>
              
              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-bold mb-1">电话</h4>
                  <p className="text-text-muted">15358816757</p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-panel p-8 md:p-10 rounded-3xl">
            <form className="space-y-6" onSubmit={async (e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const formData = new FormData(form);
              const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                message: formData.get('message')
              };

              try {
                const response = await fetch('/api/contact', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(data),
                });

                if (response.ok) {
                  alert('留言发送成功！我们会尽快联系您。');
                  form.reset();
                } else {
                  const errorData = await response.json();
                  console.error('Server Error:', errorData);
                  alert(`发送失败: ${errorData.details || errorData.error || '请检查网络或配置'}`);
                }
              } catch (error) {
                console.error('Error:', error);
                alert('发送出错，请检查网络连接。');
              }
            }}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-muted">姓名</label>
                  <input name="name" type="text" required className="w-full bg-surface border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors" placeholder="您的姓名" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-muted">邮箱</label>
                  <input name="email" type="email" required className="w-full bg-surface border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors" placeholder="your@email.com" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-muted">电话</label>
                <input name="phone" type="tel" required className="w-full bg-surface border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors" placeholder="138 0000 0000" />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-muted">咨询内容</label>
                <textarea name="message" required rows={4} className="w-full bg-surface border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors resize-none" placeholder="请简要描述您的问题..."></textarea>
              </div>
              
              <button type="submit" className="w-full bg-primary hover:bg-primary-hover text-white py-4 rounded-xl font-bold transition-colors flex items-center justify-center gap-2">
                发送留言 <ArrowRight size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="border-t border-white/5 py-12 bg-surface-highlight/10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2 text-text-muted">
          <Cloud size={20} />
          <span className="text-sm">© 2024 云计算专业官网. 保留所有权利.</span>
        </div>
        
        <div className="flex gap-8">
          <a href="#" className="text-sm text-text-muted hover:text-white transition-colors">隐私政策</a>
          <a href="#" className="text-sm text-text-muted hover:text-white transition-colors">服务条款</a>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-background text-text-main selection:bg-primary/30 selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <Vision />
        <Curriculum />
        <Partnership />
        <CareerPath />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
