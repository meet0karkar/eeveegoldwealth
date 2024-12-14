// @ts-nocheck
"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "@/app/components/ui/Header";
import Footer from "@/app/components/ui/Footer";
import Slider from "react-slick";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  ArrowRight,
  Users,
  ThumbsUp,
  DollarSign,
  Shield,
  Clock,
  UserPlus,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { office1, office2, office3 } from "../assets/photo";
import { motion } from "framer-motion"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
interface TeamMember {
  name: string
  post: string
  src: string
}

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);
const TeamMember = ({ name, post, src }: TeamMember) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <Card className="w-[250px] mx-auto h-full">
      <CardContent className="flex flex-col items-center p-6 h-full">
        <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
          <Image
            src={src}
            alt={name}
            width={128}
            height={128}
            className="object-cover w-full h-full"
          />
        </div>
        <h3 className="text-lg font-semibold text-center">{name}</h3>
        <p className="text-sm text-muted-foreground text-center mt-2">{post}</p>
      </CardContent>
    </Card>

  </motion.div>
)

interface TeamSliderProps {
  team: TeamMember[]
  title: string
}

export function TeamSlider({ team, title }: { team: TeamMember[], title: string } ) {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()])

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-6 text-center">{title}</h2>
      <div className="relative">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 3000,
            }),
          ]}
          className="w-full max-w-5xl mx-auto "
        >
          <CarouselContent>
            {team.map((member, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4 pl-4">
                <div className="p-1">
                  <TeamMember {...member} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="absolute top-1/2    -translate-y-1/2 left-0 lg:left-[-30px] xl:left-[-50px]  flex items-center">
            <CarouselPrevious className="relative left-0 h-12 w-12 rounded-full bg-white/70 shadow-md hover:bg-white">
              <ChevronLeft className="h-6 w-6" />
            </CarouselPrevious>
          </div>
          <div className="absolute top-1/2    -translate-y-1/2 right-0 lg:right-[-30px] xl:right-[-50px] flex items-center">
            <CarouselNext className="relative right-0 h-12 w-12 rounded-full bg-white/70 shadow-md hover:bg-white">
              <ChevronRight className="h-6 w-6" />
            </CarouselNext>
          </div>
        </Carousel>
      </div>
    </div>
  )
}
const officeInfo = [
  {
    name: "EEVEE Silver Jewellery Surat",
    image: office1,
    address:
      "Bhakti Arcade, Pramukh Park Soc, 8-9, Satellite Rd, Near Mahadev Chowk, Mota Varachha, Surat, Gujarat, 394101",
    hours: "Monday - Friday: 9:00 AM - 5:00 PM",
    mapLink: "https://maps.app.goo.gl/B3WQrJXv3GeNEwMT6",
  },
  {
    name: "EEVEE Silver Jewellery Ahmedabad",
    image: office2,
    address:
      "3, Shreem heights, New India Colony Rd, beside sai gold residency, opposite kelavani dham, Ankur Chokadi, New India Colony, Nikol, Ahmedabad, Gujarat, 382350",
    hours: "Mon-Sun: 9:00am-7:30pm",
    mapLink: "https://maps.app.goo.gl/sGNZKdDnyiAUDu5y6",
  },
  {
    name: "Ved Arcade Mall Ahmedabad",
    image: office3,
    address:
      "216, Ved Arcade Mall Nr. Vastral Metro Station, Ring Road, Vastral, Ahmedabad - 382350",
    hours: "Mon-Sun: 9:00am-7:30pm",
    mapLink: "https://maps.app.goo.gl/B3WQrJXv3GeNEwMT6",
  },
];
const founders = [
  {
    name: "Gordhanbhai",
    post: "Founder",
    src: "/founder.jpg"
  },
  {
    name: "Vrajlalbhai",
    post: "Director",
    src: "/founder2.jpg"
  },
  {
    name: "Vijaybhai",
    post: "Director",
    src: "/founder3.jpg"
  },
  {
    name: "Primeshbhai",
    post: "Director",
    src: "/default-male.jpg"
  }]
const ourteam2 = [
  {
    name: "Chaturbhai",
    post: "MD",
    src: "/MD.jpg"
  },
  {
    name: "Meetbhai",
    post: 'CEO',
    src: "/CEO.jpg"
  },
  {
    name: "Vivekbhai",
    post: 'CTO',
    src: "/CTO.jpg"
  },
  {
    name: "Vinaybhai",
    post: "CFO",
    src: "/CFO.png"
  }]
const ourteam3 = [
  {
    name: "Hiralben",
    post: "Sales Executive",
    src: "/SE1.jpg"
  },
  {
    name: "Rekhaben",
    post: "Sales Executive",
    src: "/SE2.jpg"
  },
  {
    name: "Mayuriben",
    post: "Sales Executive",
    src: "/SE3.jpg"
  },
  {
    name: "Gopiben",
    post: "Sales Executive",
    src: "/default-female.png"
  },
  // {
  //   name:"Priyank",
  //   post:"Sales Executive",
  //   src:""
  // }
]
const ourteam4 = [
  {
    name: "Hit",
    post: "Senior Fronted Devloper",
    src: "/hit.jpg"
  },
  {
    name: "Jemin",
    post: "Senior Fronted Devloper",
    src: "/savan.jpg"
  },
  {
    name: "Savan",
    post: "Backend Devloper",
    src: "/default-male.jpg"
  },
  {
    name: "Ridham",
    post: "Full Stack Devloper",
    src: "/default-male.jpg"
  }
]
export default function AboutUs() {
  // const mainRef = useRef(null);
  const mainRef = useRef(null);

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    autoplay: false,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    draggable: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          dots: false,
          infinite: false,
          slidesToShow: 4,
          autoplay: false,
          cssEase: "linear",
          draggable: false
        }
      },
      {
        breakpoint: 768,
        settings: {
          dots: false,
          infinite: true,
          slidesToShow: 3,
          autoplay: true,
          cssEase: "linear",
          draggable: false
        }
      },
      {
        breakpoint: 576,
        settings: {
          dots: false,
          infinite: true,
          slidesToShow: 2,
          slidesToScroll: 1,
          autoplay: true,
          speed: 2000,
          autoplaySpeed: 2000,
          cssEase: "linear",
          draggable: false
        }
      },
      {
        breakpoint: 480,
        settings: {
          dots: false,
          infinite: true,
          slidesToShow: 2,
          slidesToScroll: 1,
          autoplay: true,
          speed: 2000,
          autoplaySpeed: 2000,
          cssEase: "linear",
          draggable: false
        }
      }
    ]
  };

  // const settings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 4,
  //   slidesToScroll: 1,
  //   responsive: [
  //     {
  //       breakpoint: 1024,
  //       settings: {
  //         slidesToShow: 3,
  //       }
  //     },
  //     {
  //       breakpoint: 768,
  //       settings: {
  //         slidesToShow: 2,
  //       }
  //     },
  //     {
  //       breakpoint: 640,
  //       settings: {
  //         slidesToShow: 1,
  //       }
  //     }
  //   ]}



  useEffect(() => {
    if (typeof window !== "undefined") {
      // jQuery initialization
      const $ = require("jquery");
      // Add any additional jQuery configuration here if needed
    }
  }, []);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("h1", {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: "h1",
          start: "top 80%",
        },
      });

      gsap.utils.toArray("section").forEach((section: any, index) => {
        gsap.from(section, {
          opacity: 0,
          y: 50,
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
          },
        });
      });

      gsap.utils.toArray(".grid > div").forEach((item: any, index) => {
        gsap.from(item, {
          opacity: 0,
          y: 20,
          duration: 0.6,
          delay: index * 0.1,
          scrollTrigger: {
            trigger: item,
            start: "top 90%",
          },
        });
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* <Script src="../js/jquery-3.7.1.min.js" strategy="beforeInteractive" />
      <Script src="../js/owl.carousel.min.js" strategy="lazyOnload" /> */}
      <div className="min-h-screen bg-amber-50 font-lora">
        <Header />
        <main ref={mainRef} className="container mx-auto px-4 py-12">
          <h1 className="mb-4 text-center text-2xl font-bold text-amber-800 md:text-6xl">
            About EEVEE GOLD
          </h1>
          <div className="mx-auto mb-12 h-2 w-24 bg-amber-500"></div>

          <section className="mb-20">
            <div className="rounded-xl bg-gradient-to-r from-amber-600 to-amber-400 p-8 text-white shadow-2xl md:p-12">
              <h2 className="mb-6 text-xl font-bold md:text-4xl">
                Welcome to the Future of Gold Ownership
              </h2>
              <p className="mb-8 text-lg">
                At EEVEE GOLD, we're redefining the way you own gold by offering
                innovative, customer-centric solutions. Our mission is simple: make
                gold ownership easy and accessible for everyone.
              </p>
              <Link
                href="/buy"
                className="inline-flex items-center rounded-full bg-white px-6 py-3 font-semibold text-amber-600 transition duration-300 hover:bg-amber-100"
              >
                Visit EEVEE Gold
                <ArrowRight className="ml-2" />
              </Link>
            </div>
          </section>

          <section className="mb-20">
            <h2 className="mb-12 text-center text-4xl font-bold text-amber-800">
              Why Choose Us
            </h2>
            <div className="grid gap-8 md:grid-cols-2">
              <div className="rounded-xl bg-white p-8 shadow-lg">
                <h3 className="mb-4 text-2xl font-semibold text-amber-700">
                  Next Generation of Gold Ownership
                </h3>
                <p className="mb-4 text-gray-600">
                  Our platform is built for the modern gold buyer. We offer a seamless
                  experience for purchasing and managing your gold holdings.
                </p>
                <p className="text-gray-600">
                  With transparent pricing and no hidden fees, we ensure that your
                  gold buying experience is straightforward and trustworthy.
                </p>
              </div>
              <div className="rounded-xl bg-white p-8 shadow-lg">
                <h3 className="mb-4 text-2xl font-semibold text-amber-700">
                  The New Way to Buy Gold
                </h3>
                <p className="text-gray-600">
                  Gold has been a trusted asset for centuries, and we make it
                  easier than ever to buy it with cutting-edge technology
                  and superior customer service. On this website, users can buy gold
                  directly with money, making the process simple and straightforward.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-20">
            <h2 className="mb-12 text-center text-4xl font-bold text-amber-800">
              Our Impact
            </h2>
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {[
                {
                  icon: Users,
                  title: "50k+ Active Members",
                  description: "Join a thriving community of gold owners",
                },
                {
                  icon: ThumbsUp,
                  title: "99% Happy Customers",
                  description:
                    "Exceptional satisfaction with transparent and secure gold purchases",
                },
                {
                  icon: DollarSign,
                  title: "1M+ in Gold Managed",
                  description:
                    "Trusted by customers with over 1 million in gold under management",
                },
                {
                  icon: Shield,
                  title: "Secure Gold Ownership",
                  description: "Own a stable and time-tested asset—gold",
                },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="mb-4 inline-block rounded-full bg-amber-100 p-4">
                    <item.icon className="h-8 w-8 text-amber-600" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-amber-800">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-20">
            <h2 className="mb-12 text-center text-4xl font-bold text-amber-800">
              Our Commitment to You
            </h2>
            <div className="rounded-xl bg-white p-8 shadow-lg">
              <p className="mb-6 text-gray-600">
                At EEVEE GOLD, we believe in transparency, reliability, and customer satisfaction.
                We strive to provide you with the best experience in buying and owning gold.
                Our innovative gold purchase options are designed to help you
                build your gold holdings effectively and securely.
              </p>
              <div className="grid gap-8 md:grid-cols-2">
                {[
                  {
                    title: "Customer-Centric",
                    description:
                      "Everything we build is designed with your needs in mind.",
                  },
                  {
                    title: "Trustworthy",
                    description:
                      "Transparency and reliability are the foundations of our business.",
                  },
                  {
                    title: "Innovative",
                    description:
                      "We continuously improve and offer solutions that fit the modern gold buyer.",
                  },
                  {
                    title: "Long-Term Focus",
                    description:
                      "Helping you build your gold holdings for the future, not just today.",
                  },
                ].map((value, index) => (
                  <div key={index} className="rounded-lg bg-amber-50 p-6">
                    <h3 className="mb-2 text-xl font-semibold text-amber-700">
                      {value.title}
                    </h3>
                    <p className="text-gray-600">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="mb-20">
            <h2 className="mb-12 text-center text-4xl font-bold text-amber-800">
              EEVEE's Features
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  icon: UserPlus,
                  title: "Easy Gold Purchases",
                  description:
                    "Simple process to buy gold online with just a few clicks.",
                },
                {
                  icon: Users,
                  title: "MGold Purchase Platform",
                  description:
                    "50k+ active members, 99% happy customers, and over 1 million in managed gold.",
                },
                {
                  icon: Clock,
                  title: "Ease of Use",
                  description:
                    "Quick account creation, real-time dashboards, and 24/7 gold tracking.",
                },
                {
                  icon: DollarSign,
                  title: "Gold Accumulation",
                  description: "Enhance your gold holdings with minimal effort.",
                },
                {
                  icon: ThumbsUp,
                  title: "Customer Satisfaction",
                  description:
                    "Dedicated support team to assist you with all your gold-related queries.",
                },
                {
                  icon: Shield,
                  title: "Transparency",
                  description:
                    "Clear terms, no hidden fees, and progress tracking tools.",
                },
              ].map((feature, index) => (
                <div key={index} className="rounded-xl bg-white p-6 shadow-lg">
                  <div className="mb-4 inline-block rounded-full bg-amber-100 p-3">
                    <feature.icon className="h-6 w-6 text-amber-600" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-amber-800">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </section>
          {/* slider */}
          <section className="py-16 container mx-auto">
            <div className="mx-auto px-4">
              <h1 className="text-4xl font-bold mb-12 text-center">Our Team</h1>
              <TeamSlider team={founders} title="Founders" />
              <TeamSlider team={ourteam2} title="Management" />
              <TeamSlider team={ourteam3} title="Sales Team" />
              <TeamSlider team={ourteam4} title="Development Team" />
            </div>
          </section>
          <section className="mb-20">
            <h2 className="mb-12 text-center text-4xl font-bold text-amber-800">
              Visit Our Office
            </h2>
            {officeInfo.map((office, index) => (
              <div
                key={index}
                className="flex flex-col items-center rounded-xl bg-white p-8 shadow-lg md:flex-row"
              >
                <div className="mb-8 md:mb-0 md:mr-8 md:w-1/2">
                  <Image
                    src={office.image}
                    alt={`${office.name} Office`}
                    width={600}
                    height={400}
                    className="rounded-lg shadow-md"
                  />
                </div>
                <div className="md:w-1/2">
                  <h3 className="mb-4 text-2xl font-semibold text-amber-700">
                    {office.name}
                  </h3>
                  <p className="mb-2 text-gray-600">
                    <MapPin className="mr-2 inline-block text-amber-600" />
                    {office.address}
                  </p>
                  <p className="mb-4 text-gray-600">
                    <Clock className="mr-2 inline-block text-amber-600" />
                    {office.hours}
                  </p>
                  <Button className="bg-amber-600 text-white hover:bg-amber-700">
                    <Link
                      href={office.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center"
                    >
                      Get Directions
                      <ArrowRight className="ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
