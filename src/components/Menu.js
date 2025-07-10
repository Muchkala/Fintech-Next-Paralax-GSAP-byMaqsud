"use client"
import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

const menuLinks = [
    { id: 0, title: 'Home', href: '/' },
    { id: 1, title: 'About', href: '/about' },
    { id: 2, title: 'Work', href: '/work' },
    { id: 3, title: 'Lab', href: '/lab' },
    { id: 4, title: 'Contact', href: '/contact' }
];

export default function Menu() {
    const container = useRef(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const tl = useRef(null);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useGSAP(() => {
        gsap.set(".menu-link-item-holder", { y: 75 });

        tl.current = gsap.timeline({ paused: true })
            .to(".menu-overlay", {
                duration: 1.25,
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                ease: "power4.inOut"
            })
            .to(".menu-link-item-holder", {
                y: 0,
                duration: 1,
                stagger: 0.1,
                ease: "power4.inOut",
                delay: -0.75,
            });
    }, { scope: container });

    useEffect(() => {
        if (isMenuOpen) {
            tl.current.play();
        } else {
            tl.current.reverse();
        }
    }, [isMenuOpen]);

    return (
        <div className='menu-container' ref={container}>
            <div className='fixed top-0 left-0 w-full z-10 p-8 flex justify-between items-center'>
                <div className='text-white cursor-pointer'>
                    <Link href='/'>CodeGrid</Link>
                </div>
                <div className='text-white cursor-pointer' onClick={toggleMenu}>
                    <p>Menu</p>
                </div>
            </div>

            <div className='menu-overlay fixed top-0 left-0 w-screen h-screen p-8 bg-[#c5fb45] z-20 flex' style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)' }}>
                <div className='absolute top-0 left-0 w-full p-8 flex justify-between items-center'>
                    <div className='text-black cursor-pointer'>
                        <Link href='/'>CodeGrid</Link>
                    </div>
                    <div className='text-black cursor-pointer' onClick={toggleMenu}>
                        <p>Close</p>
                    </div>
                </div>

                <div className='hidden md:flex flex-grow-[2] justify-end items-start'>
                    <p className='text-stroke-black text-[100px] leading-[70%] text-transparent'>&#x2715;</p>
                </div>

                <div className='flex-grow-[4] flex flex-col justify-between p-8 pt-32 md:pt-8'>
                    <div>
                        {
                            menuLinks.map((link) => (
                                <div className='w-max clip-path-polygon-full' key={link.id}>
                                    <div className='menu-link-item-holder relative' onClick={toggleMenu}>
                                        <Link href={link.href} className='text-black text-6xl md:text-[80px] font-normal tracking-[-0.02em] leading-[85%]'>
                                            {link.title}
                                        </Link>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className='flex text-black'>
                        <div className='flex-1 flex flex-col justify-end space-y-2'>
                            <a href='#'>X &#8599;</a>
                            <a href='#'>Instagram &#8599;</a>
                            <a href='#'>Twitter &#8599;</a>
                            <a href='#'>LinkedIn &#8599;</a>
                            <a href='#'>Dribbble &#8599;</a>
                        </div>
                        <div className='flex-1 flex flex-col justify-end space-y-2'>
                            <p>info@codegrid.com</p>
                            <p>+1 234 567 890</p>
                        </div>
                    </div>
                </div>

                <div className='hidden md:flex flex-grow-[4] flex-col justify-end text-black'>
                    <p>View Showreel</p>
                </div>
            </div>
        </div>
    );
}
