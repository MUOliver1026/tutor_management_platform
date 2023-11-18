'use client'

import Link from 'next/link';
import {useParams, usePathname} from 'next/navigation';
import { useEffect, useState } from 'react';
import { Atom } from 'lucide-react';
import { UserNav } from '@/components/dashboard/user-nav';
import { useContextValue } from "@/components/providers/context"

const Navbar = () => {
  const params = useParams();

  const { getters } = useContextValue();
  const [userEmail, setUserEmail] = useState(getters.userEmail);
  const [userName, setUserName] = useState(getters.userName);

  useEffect(() => {
    setUserEmail(getters.userEmail);
    setUserName(getters.userName);
  }, [getters.userEmail, getters.userName]);

  const pathname = usePathname();

  const isAdminPage = pathname?.includes('/siteadmin/') || pathname?.includes('/tutoradmin/');
  const isTutorPage = pathname?.includes('/tutor/');
  const isStudentPage = pathname?.includes('/student/');

  const renderContent = () => {
    if (isTutorPage || isStudentPage) {
      return <UserNav />;
    }
  };

  const handleLogoLink = (url: string) => {
    return <Link href={url}><Atom className="h-8 w-8 text-primary-500" /></Link>;
  };

  const handleLogo = () => {
    if (isTutorPage) return handleLogoLink(`/${params?.userID}/tutor/dashboard`);
    if (isStudentPage) return handleLogoLink(`/${params?.userID}/student/dashboard`);
    return handleLogoLink('/');
  };

  return (
      <aside className="navbar justify-between bg-base-100 fixed z-10 top-0">
        <section className="">
          <div>{handleLogo()}</div>
        </section>
        <section className="">
          <h2 className="text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-white">TutorTrackr</h2>
        </section>
        <section className="">{renderContent()}</section>
      </aside>
  );
};

export default Navbar;
