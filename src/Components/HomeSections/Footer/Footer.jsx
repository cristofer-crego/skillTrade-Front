import React from 'react'
import './Footer.css'
import { PiLinkedinLogoLight } from 'react-icons/pi';
import { FaXTwitter } from 'react-icons/fa6';
import { GrInstagram } from 'react-icons/gr';
import { BsFacebook } from 'react-icons/bs';

const Footer = () => {
    return (
        <footer>
            <div className='footer-container'>
                <div className='footer-left'>
                    <h2 className='footer-title'>Acerca de nosotros</h2>
                    <ul>
                        <li><a className='footer-link' href='#' target='_blank'>¿Quiénes somos?</a></li>
                        <li><a className='footer-link' href='#' target='_blank'>Nuestros valores</a></li>
                        <li><a className='footer-link' href='#' target='_blank'>Política de privacidad</a></li>
                    </ul>
                </div>

                <div className='footer-center'>
                    <h2 className='footer-title'>Asistencia</h2>
                    <ul>
                        <li><a className='footer-link' href='#' target='_blank'>¿Necesitas ayuda?</a></li>
                        <li><a className='footer-link' href='#' target='_blank'>Contacto</a></li>
                    </ul>
                </div>

                <div className='footer-right'>
                    <h2 className='footer-title'>Síguenos</h2>
                    <ul>
                        <li><a className='footer-link' href='https://www.linkedin.com/' target='_blank'><PiLinkedinLogoLight className='icon-size' /></a></li>
                        <li><a className='footer-link' href='https://www.x.com/' target='_blank'><FaXTwitter className='icon-size' /></a></li>
                        <li><a className='footer-link' href='https://www.instagram.com/' target='_blank'><GrInstagram className='icon-size' /></a></li>
                        <li><a className='footer-link' href='https://web.facebook.com/' target='_blank'><BsFacebook className='icon-size' /></a></li>
                    </ul>
                </div>
            </div>

            <div className='footer-bottom'>
                <hr className='footer-line' />
                <p className='footer-text'>2024 SkillTrade</p>
            </div>
        </footer>
    );
};



export default Footer