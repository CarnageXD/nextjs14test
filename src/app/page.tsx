import { MainWrapper } from "@/components/main-wrapper";
import { ProductReel } from "@/components/product-reel";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowDownToLine, CheckCircle, LeafIcon } from "lucide-react";
import Link from "next/link";

const perks = [
  {
    name: "Instant Delivery",
    description:
      "Get your assets delivered to your email in seconds and download them right away.",
    Icon: ArrowDownToLine,
  },
  {
    name: "Guaranteed Quality",
    description:
      "Every asset on our platform is verified by our team to ensure our highest quality standards. Not happy? We offer a 30-day refund guarantee.",
    Icon: CheckCircle,
  },
  {
    name: "For the Planet",
    description:
      "We've pledged 1% of sales to the preservation and restoration of the natural environment.",
    Icon: LeafIcon,
  },
];

export default function Home() {
  return (
    <>
      <MainWrapper>
        <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
          <h1 className="text-4xl select-none font-bold tracking-tight text-gray-900 sm:text-6xl">
            Your marketplace for high-quality{" "}
            <span className="text-violet-600">digital assets</span>.
          </h1>
          <span className="mt-6 text-lg max-w-prose text-muted-foreground">
            Welcome to DigitalHippo. Every asset on our platform is verified by
            our team to ensure our highest quality standards.
          </span>
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Link href="/products" className={buttonVariants()}>
              Browse Trending
            </Link>
            <Button variant="ghost">Our quality promise &rarr;</Button>
          </div>
        </div>

        <ProductReel
          title="Brand new"
          href="/products"
          query={{ sort: "asc", limit: 4 }}
        />
      </MainWrapper>

      <section className="border-t border-gray-200 bg-gray-50">
        <MainWrapper className="py-20">
          <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-y-0 lg:gap-x-8">
            {perks.map(({ name, description, Icon }) => (
              <div
                key={name}
                className="text-center md:flex md:items-start md:text-left lg:block lg:text-center"
              >
                <div className="md:flex-shrink-0 flex justify-center">
                  <div className="w-16 h-16 flex items-center justify-center rounded-full bg-violet-100 text-violet-900">
                    <Icon className="w-1/3 h-1/3" />
                  </div>
                </div>
                <div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
                  <h3 className="text-base font-medium text-gray-900">
                    {name}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </MainWrapper>
      </section>
    </>
  );
}
