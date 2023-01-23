import React, { cloneElement, ForwardedRef, forwardRef, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';

import dynamic from 'next/dynamic';

import styles from '@/styles/Home.module.css';
import useForceUpdate from '@/shared/useForceUpdate';
import mergeRefs from 'merge-refs';

const Wavesurfer = dynamic(() => import(`@/shared/wavesurfer-react/dynamic`), {
  ssr: false,
});

const Form = forwardRef(
  (props: { children: JSX.Element }, ref: ForwardedRef<HTMLFormElement>) => {
    return (
      <form className="ui form" ref={ref}>
        {props.children}
      </form>
    );
  },
);

Form.displayName = `ForwardRef(Form)`;

const Suspender = ({ children }: { children: JSX.Element }) => {
  const ref$ = useRef(null);

  // const arr = Children.toArray(children);
  //
  // console.log({ ref$ });
  //
  // return cloneElement(children, {
  //   ref: mergeRefs(ref$, arr[0].ref),
  // });

  // OR
  // There should be only one child to make it working
  return cloneElement(children, {
    ref: mergeRefs(ref$, children.ref),
  });
};

export default function Home() {
  const forceUpdate = useForceUpdate();

  const form$ = useRef(null);

  console.log({ form$ });

  return (
    <div className={styles.container}>
      <Head>
        <title>TypeScript starter for Next.js</title>
        <meta
          name="description"
          content="TypeScript starter for Next.js that includes all you need to build amazing apps"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {/*<div>
          <Suspender>
            <Form ref={form$}>
              <div className="ui field">simple field</div>
            </Form>
          </Suspender>
          <button onClick={forceUpdate}>rerender</button>
        </div>*/}

        <div className={styles.wsPlayer}>
          <Wavesurfer id="superior" />
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=typescript-nextjs-starter"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{` `}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
