import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import StagesSection from '@/components/StagesSection';
import BlogPreviewSection from '@/components/BlogPreviewSection';
import NewsletterSection from '@/components/NewsletterSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import { getLatestArticles } from '@/lib/blog-service';

export default async function Home() {
  const articles = await getLatestArticles(3);

  return (
    <>
      <Navigation />
      <main id="main-content">
        <HeroSection />
        <StagesSection />
        <TestimonialsSection />
        <BlogPreviewSection articles={articles} />
        <AboutSection />
        <NewsletterSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
