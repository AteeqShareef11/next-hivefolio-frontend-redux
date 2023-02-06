import { Link } from 'react-router-dom';

import hexagon_background from '../../assets/images/hexagon_background.png';

/* User */;
import { useCurrentUser } from '../../context/AuthContext';

const HeaderLanding = ({
  title,
  sub_title,
  image_background,
  button_link,
  button_link_title
}) => {

  const LoggedInUser = useCurrentUser();

  return (
    <section className="flex flex-col xs:flex-col-reverse overflow-hidden bg-white lg:flex-row mt-6 border-none rounded-3xl ">
      <div className="justify-end p-8 bg-light lg:py-8 lg:px-16 lg:pl-10 lg:w-1/2 border-none">
        <div className="flex flex-col items-start justify-center w-full">
          <div className="mb-4 leading-none">
            <h1 className="mb-2">{title}</h1>
            <p>{sub_title}</p>
          </div>

          {(button_link && LoggedInUser.isAuthenticated !== false) && (
          
          <Link
            to={button_link}
            className="inline-flex items-center justify-center h-12  
                        px-6 mr-2 mb-2 font-medium tracking-wide transition 
                        duration-200 bg-dark text-light rounded-full hover:bg-primary hover:text-dark
                        focus:shadow-outline focus:outline-none"
          >
            {button_link_title}
          </Link>
          )}
          
        </div>
      </div>
      <div className="flex sm:flex-row-reverse items-center justify-center relative lg:w-1/2 xxs:hidden xs:hidden sm:hidden md:hidden lg:block xl:block">
      { image_background ? (
          <img 
          src={image_background} 
          className="object-cover w-full lg:absolute h-40 lg:h-full md:h-60"
          />
      ) : (
          <img src={hexagon_background} className="object-cover w-full lg:absolute h-40 lg:h-full"/>
      )}
      
      </div>
    </section>
  );
};

export default HeaderLanding;
