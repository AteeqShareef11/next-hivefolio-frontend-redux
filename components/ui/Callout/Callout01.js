import { Link } from 'react-router-dom';

const Callout01 = ({style01, style02, subtitle, title01, title02, text01, bulletTitle01, bullet01, bulletTitle02, bullet02, bulletTitle03, bullet03, buttonText, buttonLink, image01, item01}) => {

    return (
        <div className={style01}>

            <div className="relative w-full mb-10 lg:text-left sm:text-center lg:w-1/2 xl:w-7/12 lg:mb-0 lg:items-start">
                <p className="text-sm font-semibold tracking-wide uppercase">{subtitle}</p>
                <h2 className="text-5xl font-bold sm:text-6xl mt-7">{title01}
                <br className="hidden lg:block"/> {title02}</h2>
                <p className="text-gray-600 lg:max-w-sm mt-9">{text01}</p>
                <ul className="relative max-w-md mx-auto lg:mx-0">
                    {bullet01 && (
                    <li className="flex pl-6 mt-5">
                        <svg className="absolute left-0 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                        <span className="text-sm text-gray-600"><span className="font-bold text-gray-900">{bulletTitle01}</span> {bullet01}</span>
                    </li>
                    )}

                    {bullet02 && (
                    <li className="flex pl-6 mt-5">
                        <svg className="absolute left-0 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                        <span className="text-sm text-gray-600"><span className="font-bold text-gray-900">{bulletTitle02}</span> {bullet02}</span>
                    </li>
                    )}

                    {bullet03 && (
                    <li className="flex pl-6 mt-5">
                        <svg className="absolute left-0 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                        <span className="text-sm text-gray-600"><span className="font-bold text-gray-900">{bulletTitle03}</span> {bullet03}</span>
                    </li>
                    )}
                </ul>
                {buttonLink && (
                    <div className="relative flex flex-col items-center mt-10 w-full">
                        <Link to={'/authportal'} className="relative inline-block w-64 px-5 py-3 mt-2 text-center text-white bg-gray-900 hover:text-black hover:bg-primary rounded-full">Join Hivefolio</Link>
                        <Link to={'/authportal'} className="w-64 mt-3 text-sm font-medium text-center text-black hover:text-primary">Sign in</Link>
                    </div>
                )}
            </div>

            <div className={style02}>

                {image01 && (
                    <img src={image01} className="w-full"/>
                )}
                
                {item01 && (
                    {item01}
                )}
                
            </div>

        </div>
    )
}

export default Callout01