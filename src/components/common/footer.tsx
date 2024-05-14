import { Facebook, Instagram, Linkedin } from 'lucide-react';
import { Separator } from '../ui/separator';
import { Logo } from '../icons/logo';
import { ReactNode } from 'react';
import { Link } from '../ui/link';
import { LinkButton } from '../ui/link-button';

const navigationLinks = [
  {
    id: 1,
    title: 'Company',
    links: [
      { href: '/about', label: 'About' },
      { href: '/mission', label: 'Mission' },
      { href: '/careers', label: 'Work at Jobreel' },
    ],
  },
  {
    id: 2,
    title: 'Resources',
    links: [
      { href: '/help', label: 'Help' },
      { href: '/contact', label: 'Contact' },
    ],
  },
  {
    id: 3,
    title: 'Legal',
    links: [
      { href: '/privacy-policy', label: 'Privacy Policy' },
      { href: '/terms-of-service', label: 'Terms of Service' },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className='py-8 sm:py-16 bg-primary rounded-t-3xl sm:rounded-t-[8rem] text-background'>
      <div className='flex flex-col items-center container'>
        <div className='mb-12'>
          <FooterLink href='/'>
            <Logo className='scale-110' />
          </FooterLink>
        </div>

        <div className='hidden sm:grid grid-cols-4 justify-items-center w-full'>
          {navigationLinks.map((navLink) => (
            <section key={navLink.id}>
              <h4 className='text-xl font-semibold mb-4'>{navLink.title}</h4>

              <nav>
                <ul className='space-y-2'>
                  {navLink.links.map((link) => (
                    <li key={link.href}>
                      <FooterLink href={link.href}>{link.label}</FooterLink>
                    </li>
                  ))}
                </ul>
              </nav>
            </section>
          ))}

          <section className='flex flex-col space-y-2 w-full'>
            <LinkButton href='/sign-up' variant='brand'>
              Sign Up
            </LinkButton>
            <LinkButton
              href='/log-in'
              variant='outline'
              className='bg-transparent hover:bg-transparent border-background hover:border-background text-background hover:text-background'
            >
              Log In
            </LinkButton>
          </section>
        </div>

        <Separator className='bg-muted-foreground my-8' />

        <div className='flex items-center justify-between w-full'>
          <p className='text-muted-foreground font-medium'>
            &copy; {year} Jobreel, Inc.
          </p>

          <div className='flex items-center space-x-2'>
            <FooterLink href='/'>
              <Instagram className='w-5 h-5' />
            </FooterLink>
            <FooterLink href='/'>
              <Facebook className='w-5 h-5' />
            </FooterLink>
            <FooterLink href='/'>
              <Linkedin className='w-5 h-5' />
            </FooterLink>
          </div>
        </div>
      </div>
    </footer>
  );
}

type FooterLinkProps = {
  children: ReactNode;
  href: string;
};

function FooterLink({ children, href }: FooterLinkProps) {
  return (
    <Link
      href={href}
      className='py-1 rounded-full text-lg font-medium text-muted-foreground transition-colors hover:text-brand active:text-brand/90 '
    >
      {children}
    </Link>
  );
}
