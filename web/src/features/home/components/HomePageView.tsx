import { HeroSection } from '@/features/home/components/HeroSection'
import { MainTitleSection } from '@/features/home/components/MainTitleSection'
import { BubblesSection } from '@/features/home/components/BubblesSection'
import { EditorialsNewsSection } from '@/features/home/components/EditorialsNewsSection'
import { EventsSection } from '@/features/home/components/EventsSection'
import { FeatureCardsSection } from '@/features/home/components/FeatureCardsSection'
import { HomeFooter } from '@/components/layout/HomeFooter'
import type {
  HomeEventItem,
  HomeFeaturedEditorial,
  HomeNewsItem,
} from '@/features/home/data/homeContent'

interface HomePageViewProps {
  featuredEditorial: HomeFeaturedEditorial
  newsItems: HomeNewsItem[]
  events: HomeEventItem[]
}

export function HomePageView({
  featuredEditorial,
  newsItems,
  events,
}: HomePageViewProps) {
  return (
    <>
      <HeroSection />
      <MainTitleSection />
      <BubblesSection />
      <EditorialsNewsSection
        featuredEditorial={featuredEditorial}
        newsItems={newsItems}
      />
      <EventsSection events={events} />
      <FeatureCardsSection />
      <HomeFooter />
    </>
  )
}
