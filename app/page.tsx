
import { AboutView } from "@/components/views/AboutView";
import { ContactView } from "@/components/views/ContactView";
import { DestinationsView } from "@/components/views/DestinationsView";
import { PackagesView } from "@/components/views/PackagesView";
import { HomeView } from "@/components/views/HomeView";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const params = await searchParams
  const view = typeof params.view === 'string' ? params.view : 'home'

  switch (view) {
    case 'about':
      return <AboutView />;
    case 'contact':
      const packageTitle = typeof params.package === 'string' ? params.package : undefined
      return <ContactView packageTitle={packageTitle} />;
    case 'destinations':
      return <DestinationsView />;
    case 'packages':
      return <PackagesView />;
    case 'home':
    default:
      return <HomeView />;
  }
}
