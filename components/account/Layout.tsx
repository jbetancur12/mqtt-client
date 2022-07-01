import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

// import { userService } from 'services';

export { Layout };

type Props = {
  children: React.ReactNode,
};

function Layout({ children }: Props) {
  const router = useRouter();

  // useEffect(() => {
  //   // redirect to home if already logged in
  //   if (userService.userValue) {
  //     router.push('/');
  //   }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <section className="hero is-primary is-fullheight">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-5-tablet is-4-desktop is-4-widescreen">
              {children}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}