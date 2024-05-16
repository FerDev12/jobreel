import Image from 'next/image';
import iphone from '../../../../public/iphone-mockup.png';
import img from '../../../../public/jobreel-hero-img.jpg';
import { LinkButton } from '@/components/ui/link-button';
import { ArrowRight } from 'lucide-react';
import { Reviews } from '../_components/reviews';
import fakeReviews from '../../../../data/fake-reviews.json';
import { Logo } from '@/components/icons/logo';
import { cn } from '@/lib/utils/cn';

export default function Home() {
  return (
    <div className='relative container space-y-16 sm:space-y-32 pb-16 sm:pb-32'>
      <section
        id='hero'
        className='relative grid sm:grid-cols-2 place-items-center'
      >
        <div className='justify-self-end flex flex-col space-y-4 sm:space-y-8 mb-8 sm:mb-0'>
          <div className='clip'>
            <h1
              className={cn(
                'text-center sm:text-start text-4xl sm:text-6xl leading-loose tracking-tighter font-bold'
              )}
            >
              Hire people, <br /> not a resume.
            </h1>
          </div>
          <div className='clip'>
            <p className=' tracking-wide font-medium text-center sm:text-start text-lg sm:text-xl max-w-[32ch] text-muted-foreground'>
              Easily collect and review video applications on Jobreel.
            </p>
          </div>

          <div className='flex justify-center sm:justify-start'>
            <LinkButton
              href='/sign-up'
              size='lg'
              variant='brand'
              className='group'
            >
              Get Started{' '}
              <ArrowRight className='w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform' />
            </LinkButton>
          </div>
        </div>

        <div className='relative h-[600px] w-full overflow-hidden'>
          <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-72 aspect-[0.460202651465257/1] overflow-hidden'>
            <Image
              src={img}
              alt='girl smiling'
              placeholder='blur'
              className='h-full w-full object-cover object-center rounded-3xl scale-x-[93%] scale-y-[93%]'
            />
          </div>
          <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-72 aspect-[0.460202651465257/1] overflow-hidden'>
            <Image
              src={iphone}
              alt='iphone mockup'
              className='h-full w-full object-cover object-center'
            />
          </div>
        </div>
      </section>

      <section id='reviews'>
        <div className='mb-8 sm:mb-16 text-center'>
          <h2 className='text-3xl sm:text-5xl font-semibold mb-2 sm:mb-6'>
            Join The Community
          </h2>
          <p className='flex items-center justify-center text-base sm:text-lg text-muted-foreground'>
            Thousands are using
            <Logo className='inline w-10 sm:w-14 mx-2' /> to hire and get hired
          </p>
        </div>
        <Reviews reviews={fakeReviews} />
      </section>
    </div>
  );
}
