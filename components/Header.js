import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import dynamic from "next/dynamic";
const HeaderItem = dynamic(() => import("./HeaderItem"));
const HomeIcon = dynamic(() =>
  import("@heroicons/react/outline").then((mod) => mod.HomeIcon)
);
const HeartIcon = dynamic(() =>
  import("@heroicons/react/outline").then((mod) => mod.HeartIcon)
);
const BeakerIcon = dynamic(() =>
  import("@heroicons/react/outline").then((mod) => mod.BeakerIcon)
);
const FireIcon = dynamic(() =>
  import("@heroicons/react/outline").then((mod) => mod.FireIcon)
);
const GlobeIcon = dynamic(() =>
  import("@heroicons/react/outline").then((mod) => mod.GlobeIcon)
);

const Header = () => {
  const router = useRouter();
  const path = router.asPath;

  return (
    <header
      className="flex flex-col md:flex-row md:my-2 mx-6 mt-6 justify-between
    items-center h-auto"
    >
      <nav className="flex flex-grow justify-evenly max-w-2xl">
        <Link href="/moghamara">
          <a>
            <HeaderItem
              title="مغامرة"
              Icon={GlobeIcon}
              selected={path === "/moghamara"}
            />
          </a>
        </Link>
        <Link href="/action">
          <a>
            <HeaderItem
              title="اكشن"
              Icon={FireIcon}
              selected={path === "/action"}
            />
          </a>
        </Link>
        <Link href="/ro3b">
          <a>
            <HeaderItem
              title="رعب"
              Icon={BeakerIcon}
              selected={path === "/ro3b"}
            />
          </a>
        </Link>
        <Link href="/drama">
          <a>
            <HeaderItem
              title="دراما"
              Icon={HeartIcon}
              selected={path === "/drama"}
            />
          </a>
        </Link>
        <Link href="/">
          <a>
            <HeaderItem title="الكل" Icon={HomeIcon} selected={path === "/"} />
          </a>
        </Link>
      </nav>
      <Link href="/">
        <a>
          <Image
            className="object-contain"
            src="/aflam9assira-logo.png"
            alt="logo"
            width="200"
            height="100"
            loading="eager"
            priority
          />
        </a>
      </Link>
    </header>
  );
};

export default Header;
